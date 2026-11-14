import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";

// Exercise the production helpers without React, a server, SMTP or personal data.
// The UI is exercised separately in careers-ui.browser.test.mjs.
const source = await readFile(new URL("../src/components/CareersForm.tsx", import.meta.url), "utf8");
const helpers = source.slice(0, source.indexOf("const FIELD ="))
  .replace(/^import .* from "react";\r?\n/m, "");
const { validateCareers, careersOutcome, careersMailto, CAREERS_AREAS } = await import(
  `data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(helpers)).toString("base64")}`
);
const valid = () => ({
  nome: "Pessoa de Teste", email: "pessoa@example.com", telefone: "+55 (11) 99999-0000",
  cidade: "São Paulo", estado: "SP", areas: ["totvs_rm"], experiencia: "pleno",
  modalidade: "remoto", disponibilidade: "a_combinar", perfilUrl: "https://example.com/perfil",
  resumo: "Perfil fictício para teste local.", consentimentoAnalise: true,
  consentimentoBanco: false, website: "",
});

test("accepts contract payload with independently optional bank consent", () => {
  assert.deepEqual(validateCareers(valid()), {});
  assert.deepEqual(validateCareers({ ...valid(), consentimentoBanco: true, telefone: "", perfilUrl: "" }), {});
  assert.ok(validateCareers({ ...valid(), consentimentoAnalise: false }).consentimentoAnalise);
});
test("requires every mandatory field and contract enum", () => {
  for (const key of ["nome", "email", "cidade", "estado", "resumo", "experiencia", "modalidade", "disponibilidade"]) {
    assert.ok(validateCareers({ ...valid(), [key]: "" })[key], key);
  }
  for (const key of ["experiencia", "modalidade", "disponibilidade", "estado"]) {
    assert.ok(validateCareers({ ...valid(), [key]: "inventado" })[key], key);
  }
});
test("accepts exact length boundaries and rejects overflow", () => {
  for (const [key, max] of Object.entries({ nome: 120, cidade: 80, resumo: 1500 })) {
    assert.equal(validateCareers({ ...valid(), [key]: "a".repeat(max) })[key], undefined);
    assert.ok(validateCareers({ ...valid(), [key]: "a".repeat(max + 1) })[key]);
  }
  assert.ok(validateCareers({ ...valid(), telefone: "1".repeat(33) }).telefone);
  assert.ok(validateCareers({ ...valid(), email: "a".repeat(250) + "@example.com" }).email);
  assert.ok(validateCareers({ ...valid(), perfilUrl: "https://example.com/" + "a".repeat(300) }).perfilUrl);
});
test("rejects CR, LF, NUL, DEL and C1 controls in every text field", () => {
  for (const key of ["nome", "email", "telefone", "cidade", "estado", "perfilUrl", "resumo", "website", "experiencia", "modalidade", "disponibilidade"]) {
    for (const control of ["\r", "\n", "\0", "\x7f", "\x85"]) {
      assert.ok(validateCareers({ ...valid(), [key]: valid()[key] + control })[key], `${key}: ${JSON.stringify(control)}`);
    }
  }
});
test("enforces the exact 16 area values and 1..6 unique selections", () => {
  assert.equal(CAREERS_AREAS.length, 16);
  for (const [area] of CAREERS_AREAS) assert.equal(validateCareers({ ...valid(), areas: [area] }).areas, undefined);
  for (const areas of [[], ["inventada"], ["totvs_rm", "totvs_rm"], CAREERS_AREAS.slice(0, 7).map(([value]) => value)]) {
    assert.ok(validateCareers({ ...valid(), areas }).areas);
  }
  assert.equal(validateCareers({ ...valid(), areas: CAREERS_AREAS.slice(0, 6).map(([value]) => value) }).areas, undefined);
});
test("rejects invalid phone, e-mail and non HTTP(S) professional link", () => {
  assert.ok(validateCareers({ ...valid(), telefone: "abc123" }).telefone);
  assert.ok(validateCareers({ ...valid(), email: "sem-arroba" }).email);
  for (const perfilUrl of ["javascript:alert(1)", "file:///tmp/cv", "linkedin.com/teste"]) assert.ok(validateCareers({ ...valid(), perfilUrl }).perfilUrl);
});
test("simulation always wins over an inconsistent recebido=true", () => {
  const result = careersOutcome(200, { ok: true, modo: "simulado", recebido: true });
  assert.equal(result.kind, "simulado");
  assert.equal(result.message, "SIMULADO — nada foi enviado ao RH");
});
test("confirms only real acceptance with a valid reference", () => {
  const payload = { ok: true, modo: "real", recebido: true, referencia: "TC-20261114-ABC123" };
  assert.equal(careersOutcome(200, payload).kind, "recebido");
  for (const patch of [{ recebido: false }, { referencia: "" }, { modo: "unknown" }, { ok: false }]) assert.equal(careersOutcome(200, { ...payload, ...patch }).kind, "erro");
});
test("400/429/503 and malformed replies never confirm acceptance", () => {
  for (const status of [400, 429, 503, 500, 404]) assert.equal(careersOutcome(status, { ok: true, recebido: true, modo: "real", referencia: "TC-20261114-ABC123" }).kind, "erro");
  assert.equal(careersOutcome(200, {}).kind, "erro");
});
test("fallback encodes all submitted data and both consent choices", () => {
  const data = { ...valid(), nome: "Pessoa & Teste", resumo: "Resumo com & e ?" };
  const url = new URL(careersMailto(data));
  assert.equal(url.pathname, "vagas@coredb.com.br");
  const body = url.searchParams.get("body");
  for (const value of [data.nome, data.email, data.resumo, "TOTVS RM", "Autorizo análise: Sim", "Autorizo permanência no banco: Não"]) assert.ok(body.includes(value), value);
});
