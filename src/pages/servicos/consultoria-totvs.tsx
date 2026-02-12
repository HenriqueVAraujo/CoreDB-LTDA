
import Header from '../../components/Header';
import ServicePage from '../../components/ServicePage';

export default function ConsultoriaTOTVS() {
  return (
    <>
      <Header />
      <ServicePage
        serviceKey="consultoria-totvs"
        title="Consultoria Especializada TOTVS"
        subtitle="Transforme seu ERP em vantagem competitiva. Diagnóstico, otimização e sustentação de ambientes TOTVS Protheus, RM e Fluig com foco em performance, segurança e aderência aos processos do negócio."
        overview="Nossa consultoria entrega estabilidade, performance e governança para ambientes TOTVS críticos. Atuamos de ponta a ponta, desde o diagnóstico até a sustentação, garantindo que o ERP seja um ativo estratégico para o negócio."
        problems={["Lentidão e travamentos em rotinas críticas", "Falta de governança e controle", "Riscos de indisponibilidade operacional", "Dificuldade de integração entre sistemas", "Falta de visibilidade sobre performance e gargalos"]}
        methodology={["Diagnóstico profundo do ambiente", "Análise de causa raiz dos problemas", "Intervenção estruturada e customizada", "Monitoramento contínuo e evolução"]}
        benefits={["Redução de riscos operacionais", "Aumento de performance e estabilidade", "Governança e previsibilidade", "Time interno liberado para inovação"]}
        idealClients={["Empresas com ERP TOTVS crítico", "Ambientes complexos e integrados", "Operações que não podem parar"]}
        whatsappMessage="Olá, gostaria de agendar um diagnóstico técnico para Consultoria TOTVS."
      />
    </>
  );
}
