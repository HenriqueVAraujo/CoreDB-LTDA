export function careersSmtpEnabled(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' &&
    (process.env.CAREERS_SMTP_ENABLED || '').toLowerCase() === 'true' &&
    Boolean(process.env.CAREERS_RECEIVER_EMAIL?.trim())
  )
}
