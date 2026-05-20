import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <p className="text-[var(--coredb-cyan)] font-semibold tracking-widest uppercase text-xs mb-4">
          Erro 404
        </p>
        <h1 className="text-6xl font-bold text-[var(--coredb-dark)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--coredb-dark)] mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-500 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-[var(--coredb-dark)] text-white font-semibold rounded-lg hover:bg-[var(--coredb-cyan)] hover:text-[var(--coredb-dark)] transition-all"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  )
}
