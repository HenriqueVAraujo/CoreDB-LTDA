import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { ROUTES } from "./routes";
import ConsultoriaTOTVS from "./pages/servicos/consultoria-totvs";
import DesenvolvimentoCustomizacoes from "./pages/servicos/desenvolvimento-customizacoes";
import DBA from "./pages/servicos/dba";

function Router() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SERVICE_TOTVS} component={ConsultoriaTOTVS} />
      <Route path={ROUTES.SERVICE_CUSTOM} component={DesenvolvimentoCustomizacoes} />
      <Route path={ROUTES.SERVICE_DBA} component={DBA} />
      <Route path={ROUTES.PRIVACY} component={PrivacyPolicy} />
      <Route path={ROUTES.TERMS} component={TermsOfUse} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
