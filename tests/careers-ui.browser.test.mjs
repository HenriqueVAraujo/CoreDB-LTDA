import test from "node:test";
import assert from "node:assert/strict";

// Run ONLY through pesado.py run navegador. No live API is called: every POST
// to the careers endpoint is intercepted. Start the local Next server separately.
const { chromium } = await import(process.env.CAREERS_PLAYWRIGHT_MODULE || "playwright");
const base = process.env.CAREERS_BASE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local test server required");

test("careers form: responsive layout, accessibility and all API outcomes via stub", async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    const page = await browser.newPage();
    let calls = 0;
    let payload;
    let reply = { status: 200, body: { ok: true, modo: "simulado", recebido: false, referencia: "TC-20261114-ABC123", mensagem: "SIMULADO: nada foi enviado ao RH" } };
    await page.route("**/api/trabalhe-conosco", async route => {
      calls++;
      assert.equal(route.request().method(), "POST");
      assert.match(route.request().headers()["content-type"], /application\/json/);
      payload = route.request().postDataJSON();
      if (reply.abort) return route.abort("failed");
      await new Promise(resolve => setTimeout(resolve, 150));
      await route.fulfill({ status: reply.status, contentType: "application/json", body: JSON.stringify(reply.body) });
    });
    await page.goto(`${base}/trabalhe-conosco`);
    const form = page.locator("form").filter({ has: page.locator("#careers-nome") });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await form.scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.ok(await form.evaluate(el => [...el.querySelectorAll("input:not([name=website]),select,textarea,button,a")].every(input => {
        const rect = (input.type === "checkbox" ? input.closest("label") : input).getBoundingClientRect();
        return rect.height >= 44 && rect.left >= 0 && rect.right <= innerWidth;
      })));
      assert.ok(await form.evaluate(el => [...el.querySelectorAll("input:not([name=website]),select,textarea")].every(input => el.querySelector(`label[for="${input.id}"]`))));
    }
    const submit = form.getByRole("button", { name: "Enviar candidatura", exact: true });
    await submit.click();
    await page.waitForFunction(() => document.activeElement?.id === "careers-nome");
    assert.equal(calls, 0);
    for (const [key, value] of Object.entries({ nome: "Pessoa Teste", email: "pessoa@example.com", cidade: "São Paulo", resumo: "Perfil fictício para teste local." })) await form.locator(`[name=${key}]`).fill(value);
    for (const [key, value] of Object.entries({ estado: "SP", experiencia: "pleno", modalidade: "remoto", disponibilidade: "imediata" })) await form.locator(`[name=${key}]`).selectOption(value);
    const checks = form.locator('[name="areas"]');
    for (let index = 0; index < 6; index++) await checks.nth(index).check();
    assert.equal(await checks.nth(6).isDisabled(), true);
    for (let index = 1; index < 6; index++) await checks.nth(index).uncheck();
    await form.locator('[name="consentimentoAnalise"]').check();
    assert.equal(await form.locator('[name="consentimentoBanco"]').isChecked(), false);
    await submit.click();
    await form.getByRole("button", { name: "Enviando candidatura…", exact: true }).waitFor();
    assert.equal(await form.getByRole("button", { name: "Enviando candidatura…", exact: true }).isDisabled(), true);
    await page.getByText("SIMULADO — nada foi enviado ao RH", { exact: true }).waitFor();
    assert.equal(payload.consentimentoBanco, false);
    assert.equal(payload.consentimentoAnalise, true);
    assert.equal(payload.website, "");
    assert.deepEqual(payload.areas, ["protheus_advpl_tlpp"]);
    assert.match(await form.getByRole("link", { name: "Enviar por e-mail", exact: true }).getAttribute("href"), /^mailto:vagas@coredb.com.br\?/);
    assert.equal(calls, 1);
    reply = { status: 400, body: { ok: false, erros: { email: "E-mail rejeitado pelo stub." } } };
    await submit.click();
    await page.getByText("E-mail rejeitado pelo stub.", { exact: true }).waitFor();
    await page.waitForFunction(() => document.activeElement?.id === "careers-email");
    for (const status of [429, 503]) {
      reply = { status, body: { ok: false } };
      await submit.click();
      await form.getByText(/O recebimento não foi confirmado/).waitFor();
      assert.equal(await form.getByText("Candidatura recebida.", { exact: false }).count(), 0);
    }
    reply = { abort: true };
    await submit.click();
    await form.getByText(/Falha de conexão/).waitFor();
    assert.equal(await form.locator('[name="nome"]').inputValue(), "Pessoa Teste");
    reply = { status: 200, body: { ok: true, modo: "real", recebido: true, referencia: "TC-20261114-ABC123", mensagem: "Aceito pelo stub" } };
    await form.locator('[name="consentimentoBanco"]').check();
    await submit.click();
    await form.getByText("TC-20261114-ABC123", { exact: true }).waitFor();
    assert.equal(payload.consentimentoBanco, true);
    assert.equal(calls, 6);
  } finally { await browser.close(); }
});
