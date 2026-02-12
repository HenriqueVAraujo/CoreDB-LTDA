interface LogoProps {
  variant?: 'header' | 'footer' | 'full';
  className?: string;
}

export default function Logo({ variant = 'header', className = '' }: LogoProps) {
  switch (variant) {
    case 'header':
      // Header: Logo com texto "CoreDB" - fundo branco
      return (
        <div className={`flex items-center gap-2 group ${className}`}>
          {/* Logo completa - apenas o ícone do cubo visível */}
          <img 
            src="/images/coredb-logoescura.png" 
            alt="CoreDB" 
            className="h-40 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
          />
        </div>
      );

    case 'footer':
      // Footer: Logo apenas - fundo escuro
      return (
        <img 
          src="/images/coredb-logo.png" 
          alt="CoreDB" 
          className={`h-42 w-auto object-contain transition-all duration-300 hover:opacity-90 ${className}`}
        />
      );

    case 'full':
      // Full: Logo completa com texto (para hero ou seções especiais)
      return (
        <div className={`flex items-center gap-4 group ${className}`}>
          <img 
            src="/images/coredb-logo.png" 
            alt="CoreDB" 
            className="h-24 w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </div>
      );

    default:
      return null;
  }
}
