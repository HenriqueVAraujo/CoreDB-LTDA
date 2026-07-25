import Image from 'next/image'

interface LogoProps {
  variant?: 'header' | 'footer' | 'full'
  className?: string
}

const LOGO_WIDTH = 1513
const LOGO_HEIGHT = 501
const LOGO_ALT = 'CoreDB'

export default function Logo({ variant = 'header', className = '' }: LogoProps) {
  switch (variant) {
    case 'header':
      return (
        <div className={`flex items-center gap-2 group ${className}`}>
          <Image
            src="/brand/header-logo-light.svg"
            alt={LOGO_ALT}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-auto w-full object-contain transition-all duration-300 group-hover:opacity-80"
            priority
          />
        </div>
      )

    case 'footer':
      return (
        <Image
          src="/brand/footer-logo-dark.svg"
          alt={LOGO_ALT}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className={`h-auto object-contain transition-all duration-300 hover:opacity-90 ${className}`}
        />
      )

    case 'full':
      return (
        <div className={`flex items-center gap-4 group ${className}`}>
          <Image
            src="/brand/header-logo-dark.svg"
            alt={LOGO_ALT}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-auto w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </div>
      )

    default:
      return null
  }
}
