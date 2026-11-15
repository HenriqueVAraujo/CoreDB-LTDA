import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL(path, import.meta.url), "utf8");

test("issue #14: limite de mensagem do formulario comercial acompanha o backend (4000)", () => {
  const form = read("../src/components/ContactForm.tsx");
  const route = read("../src/app/api/contact/route.ts");
  const backend = Number(route.match(/message:\s*z\.string\(\)\.trim\(\)\.max\((\d+)\)/)?.[1]);
  const client = Number(form.match(/const CONTACT_MESSAGE_MAX = (\d+);/)?.[1]);
  assert.equal(backend, 4000);
  assert.equal(client, backend);
});

test("issue #14: 4001 caracteres bloqueia envio com erro especifico, preserva o texto e nao usa maxLength", () => {
  const form = read("../src/components/ContactForm.tsx");
  assert.match(form, /messageLength > CONTACT_MESSAGE_MAX/);                  // 4000 passa; 4001 falha
  assert.match(form, /if \(messageTooLong\) \{[^}]*return;/s);                // sem fetch
  assert.doesNotMatch(form, /<textarea[^>]*maxLength/s);                      // nao trunca nem impede de colar
  assert.match(form, /aria-invalid=\{messageTooLong\}/);
  assert.match(form, /role="alert"[^>]*>A mensagem tem \{messageLength\} caracteres; o limite é \{CONTACT_MESSAGE_MAX\}/);
  // o texto so e limpo no sucesso (setFormData vazio aparece apenas dentro do ramo de sucesso)
  assert.equal((form.match(/message: ""/g) ?? []).length, 2);                 // estado inicial + sucesso
});