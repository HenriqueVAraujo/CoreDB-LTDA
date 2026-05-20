import Image from 'next/image'

interface LogoProps {
  variant?: 'header' | 'footer' | 'full'
  className?: string
}

// Dimensões intrínsecas das imagens (obtidas com sharp):
// coredb-logoescura.png → 1418×498
// coredb-logo.png       → 1137×419

export default function Logo({ variant = 'header', className = '' }: LogoProps) {
  switch (variant) {
    case 'header':
      return (
        <div className={`flex items-center gap-2 group ${className}`}>
          <Image
            src="/images/coredb-logoescura.png"
            alt="CoreDB — Consultoria TOTVS e DBA"
            width={1418}
            height={498}
            className="h-auto w-full object-contain transition-all duration-300 group-hover:opacity-80"
            priority
          />
        </div>
      )

    case 'footer':
      return (
        <Image
          src="/images/coredb-logo.png"
          alt="CoreDB — Consultoria TOTVS e DBA"
          width={1137}
          height={419}
          className={`h-auto object-contain transition-all duration-300 hover:opacity-90 ${className}`}
        />
      )

    case 'full':
      return (
        <div className={`flex items-center gap-4 group ${className}`}>
          <Image
            src="/images/coredb-logo.png"
            alt="CoreDB — Consultoria TOTVS e DBA"
            width={1137}
            height={419}
            className="h-auto w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </div>
      )

    default:
      return null
  }
}
