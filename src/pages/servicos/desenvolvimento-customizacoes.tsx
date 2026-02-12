
import Header from '../../components/Header';
import ServicePage from '../../components/ServicePage';

export default function DesenvolvimentoCustomizacoes() {
  return (
    <>
      <Header />
      <ServicePage
        serviceKey="desenvolvimento-customizacoes"
        title="Desenvolvimento e Customizações"
        subtitle="Soluções sob medida para ampliar a capacidade do seu ERP TOTVS. Integrações, automações e customizações com foco em estabilidade e escalabilidade."
        overview="Desenvolvemos integrações, automações e customizações que potencializam o ERP sem comprometer a estabilidade. Garantimos código limpo, documentado e aderente às melhores práticas do mercado."
        problems={["Dificuldade de integração com sistemas externos", "Processos manuais e retrabalho", "Customizações que geram instabilidade", "Falta de automação em rotinas críticas"]}
        methodology={["Mapeamento de necessidades e oportunidades", "Desenvolvimento sob medida e homologação", "Implantação assistida", "Monitoramento e evolução"]}
        benefits={["Automação de processos", "Redução de erros e retrabalho", "Integração fluida entre sistemas", "Escalabilidade e flexibilidade"]}
        idealClients={["Empresas que buscam diferenciação tecnológica", "Ambientes com múltiplos sistemas", "Operações que exigem agilidade e integração"]}
        whatsappMessage="Olá, gostaria de agendar um diagnóstico técnico para Desenvolvimento e Customizações TOTVS."
      />
    </>
  );
}
