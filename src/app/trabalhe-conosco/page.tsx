import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Database,
  Layers3,
  Mail,
  Network,
  Workflow,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CAREERS_EMAIL, CAREERS_EMAIL_URL, ROUTES } from "@/routes";

const PAGE_URL = "https://www.coredb.com.br/trabalhe-conosco";
const DESCRIPTION =
  "Apresente sua experiência à CoreDB. Banco de talentos para ambientes TOTVS, bancos de dados, desenvolvimento, integrações e infraestrutura.";

export const metadata: Metadata = {
  title: "Trabalhe Conosco — Banco de Talentos",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Trabalhe Conosco | CoreDB",
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: "/social/open-graph-logo-card-1200x630.png",
        width: 1200,
        height: 630,
        alt: "CoreDB — O núcleo da continuidade.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trabalhe Conosco | CoreDB",
    description: DESCRIPTION,
    images: ["/social/social-share-logo-card-1200x630.png"],
  },
};

const areas = [
  {
    icon: Layers3,
    title: "Ambientes TOTVS",
    description:
      "Protheus, ADVPL e TLPP, RM e Fluig. Conte quais produtos, módulos e rotinas fazem parte da sua experiência.",
  },
  {
    icon: Database,
    title: "Bancos de dados",
    description:
      "SQL Server, Oracle, PostgreSQL e MySQL. Descreva sua atuação em administração, desempenho, segurança ou recuperação.",
  },
  {
    icon: Workflow,
    title: "Desenvolvimento e integrações",
    description:
      "APIs, customizações e automação de processos. Apresente as tecnologias que utiliza e sua participação nas entregas.",
  },
  {
    icon: Network,
    title: "Infraestrutura e monitoramento",
    description:
      "Ambientes, observabilidade e continuidade operacional. Explique sua experiência com operação, documentação e acompanhamento.",
  },
];

const steps = [
  {
    number: "01",
    title: "Apresente sua experiência",
    description:
      "Envie um resumo do seu perfil, área de interesse e currículo ou link profissional.",
  },
  {
    number: "02",
    title: "Avaliamos a aderência",
    description:
      "As informações ajudam a relacionar sua experiência às necessidades de projetos e futuras oportunidades.",
  },
  {
    number: "03",
    title: "Conversamos quando houver uma oportunidade",
    description:
      "Havendo aderência, a CoreDB entra em contato para alinhar escopo, disponibilidade e condições.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://www.coredb.com.br",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Trabalhe Conosco",
      item: PAGE_URL,
    },
  ],
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 text-[var(--coredb-dark)] focus:not-sr-only"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-white pt-20 outline-none"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />

        <section
          className="bg-[var(--coredb-dark)] py-14 text-white md:py-20"
          aria-labelledby="careers-title"
        >
          <div className="container mx-auto grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <nav
                aria-label="Caminho da página"
                className="mb-8 text-sm text-white/75"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="underline-offset-4 hover:underline"
                    >
                      Início
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Trabalhe Conosco</li>
                </ol>
              </nav>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--coredb-cyan)]">
                Banco de talentos
              </p>
              <h1
                id="careers-title"
                className="mb-6 text-4xl font-bold text-white md:text-5xl"
              >
                Trabalhe conosco
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/85">
                A CoreDB atua com engenharia e execução de tecnologia crítica em
                ambientes TOTVS e bancos de dados. Queremos conhecer
                profissionais que combinem conhecimento técnico, comunicação
                clara e responsabilidade na entrega.
              </p>
              <a
                href="#candidatura"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--coredb-cyan)] px-6 py-3 font-semibold text-[var(--coredb-dark)] transition-colors hover:bg-white"
              >
                Apresentar meu perfil{" "}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <aside
              className="rounded-2xl border border-white/20 bg-white/5 p-6 md:p-8"
              aria-labelledby="talent-bank-title"
            >
              <h2
                id="talent-bank-title"
                className="mb-4 text-xl font-bold text-white"
              >
                Uma apresentação para futuras oportunidades
              </h2>
              <p className="text-sm leading-relaxed text-white/80">
                Este é um canal de candidatura espontânea. As áreas abaixo
                descrevem nosso interesse técnico e não representam vagas
                abertas.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-white/85">
                {[
                  "Experiência explicada com contexto",
                  "Cuidado com dados e ambientes",
                  "Documentação e colaboração",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coredb-cyan)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="areas-title">
          <div className="container mx-auto">
            <div className="mb-8 max-w-3xl">
              <h2
                id="areas-title"
                className="mb-4 text-3xl font-bold text-[var(--coredb-dark)]"
              >
                Onde sua experiência pode contribuir
              </h2>
              <p className="text-[var(--coredb-gray-dark)]">
                Indique as especialidades em que você atua e seu nível de
                experiência em cada uma.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {areas.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--coredb-gray-light)] text-[var(--coredb-dark)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[var(--coredb-dark)]">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="bg-[var(--coredb-gray-light)] py-14 md:py-20"
          aria-labelledby="process-title"
        >
          <div className="container mx-auto">
            <h2
              id="process-title"
              className="mb-8 text-3xl font-bold text-[var(--coredb-dark)]"
            >
              Como funciona
            </h2>
            <ol className="grid gap-8 md:grid-cols-3">
              {steps.map(step => (
                <li
                  key={step.number}
                  className="border-t-2 border-[var(--coredb-cyan)] pt-6"
                >
                  <span
                    className="mb-4 inline-block text-sm font-semibold text-[var(--coredb-gray-dark)]"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-[var(--coredb-dark)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-[var(--coredb-gray-dark)]">
              O envio do perfil não garante contratação ou retorno em prazo
              específico. Modalidade de atuação e condições são alinhadas em
              cada oportunidade.
            </p>
          </div>
        </section>

        <section
          id="candidatura"
          className="scroll-mt-24 py-14 md:py-20"
          aria-labelledby="apply-title"
        >
          <div className="container mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="apply-title"
                className="mb-5 text-3xl font-bold text-[var(--coredb-dark)]"
              >
                Apresente seu perfil
              </h2>
              <p className="mb-6 text-[var(--coredb-gray-dark)]">
                Envie sua candidatura por e-mail. Para facilitar a avaliação,
                inclua:
              </p>
              <ul className="space-y-3 text-sm text-[var(--coredb-gray-dark)]">
                {[
                  "Seu nome e a área de interesse.",
                  "Um resumo da sua experiência e das tecnologias que domina.",
                  "Cidade/UF, disponibilidade e modalidade de atuação de interesse.",
                  "Currículo em PDF ou link do LinkedIn/portfólio, se desejar.",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--coredb-dark)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                Apresente projetos sem expor nomes, dados, credenciais ou
                documentos confidenciais de clientes. CPF, RG, dados bancários e
                outros documentos pessoais não são necessários nesta etapa.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-[var(--coredb-gray-light)] p-6 md:p-8">
              <Mail
                className="mb-5 h-7 w-7 text-[var(--coredb-dark)]"
                aria-hidden="true"
              />
              <h3 className="mb-4 text-xl font-bold text-[var(--coredb-dark)]">
                Candidatura por e-mail
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                O botão abre seu aplicativo de e-mail com uma mensagem inicial.
                Revise o conteúdo, anexe o currículo se desejar e conclua o
                envio no seu e-mail.
              </p>
              <a
                href={CAREERS_EMAIL_URL}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--coredb-dark)] px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)]"
              >
                Enviar meu perfil por e-mail{" "}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
              <p className="mt-5 text-sm text-[var(--coredb-gray-dark)]">
                Você também pode copiar o endereço:
              </p>
              <a
                href={`mailto:${CAREERS_EMAIL}`}
                className="mt-1 inline-block break-all font-semibold text-[var(--coredb-dark)] underline underline-offset-4"
              >
                {CAREERS_EMAIL}
              </a>
              <p className="mt-6 border-t border-gray-200 pt-5 text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                Usamos as informações enviadas para avaliar seu perfil e
                conversar sobre oportunidades. Você pode pedir atualização ou
                exclusão pelo mesmo e-mail. Consulte a{" "}
                <Link
                  href={ROUTES.PRIVACY}
                  className="font-medium underline underline-offset-4"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="border-t border-gray-200 pb-16 pt-12"
          aria-labelledby="faq-title"
        >
          <div className="container mx-auto max-w-4xl">
            <h2
              id="faq-title"
              className="mb-6 text-3xl font-bold text-[var(--coredb-dark)]"
            >
              Dúvidas sobre a candidatura
            </h2>
            <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 px-5 md:px-7">
              {[
                [
                  "Há vagas abertas?",
                  "Esta página recebe apresentações para o banco de talentos. Uma seleção específica, quando existir, terá escopo e condições próprios.",
                ],
                [
                  "Preciso ter experiência em todas as tecnologias?",
                  "Não. Apresente as áreas em que você atua, seu nível de experiência e exemplos do trabalho que realizou.",
                ],
                [
                  "Como atualizo ou retiro meu perfil?",
                  `Escreva para ${CAREERS_EMAIL}, preferencialmente pelo mesmo endereço usado na candidatura, informando sua solicitação.`,
                ],
              ].map(([question, answer]) => (
                <details key={question} className="py-1">
                  <summary className="min-h-12 cursor-pointer py-4 font-semibold text-[var(--coredb-dark)]">
                    {question}
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-[var(--coredb-gray-dark)]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
