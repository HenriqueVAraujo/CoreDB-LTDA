
import Header from '../../components/Header';
import ServicePage from '../../components/ServicePage';

export default function DBA() {
  return (
    <>
      <Header />
      <ServicePage
        serviceKey="dba"
        title="Administração de Bancos de Dados (DBA)"
        subtitle="Performance, segurança e disponibilidade máxima para seu banco de dados. Governança, monitoramento e planos de contingência para ambientes críticos."
        overview="Oferecemos administração completa de bancos de dados, com foco em performance, segurança e continuidade operacional. Monitoramento 24/7, planos de backup e recuperação, e otimização contínua."
        problems={["Riscos de perda de dados", "Indisponibilidade do banco de dados", "Baixa performance em consultas e rotinas", "Falta de governança e compliance"]}
        methodology={["Diagnóstico do ambiente de dados", "Análise de causa raiz de falhas e lentidão", "Ajustes estruturais e tuning", "Monitoramento e evolução contínua"]}
        benefits={["Disponibilidade máxima", "Redução de riscos de perda de dados", "Performance otimizada", "Governança e conformidade"]}
        idealClients={["Empresas com bases críticas", "Ambientes que exigem alta disponibilidade", "Operações que não podem parar"]}
        whatsappMessage="Olá, gostaria de agendar um diagnóstico técnico para Administração de Bancos de Dados (DBA)."
      />
    </>
  );
}
