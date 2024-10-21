export function validateEnv() {
  if ([
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',
    'SMTP_USER_DISPLAY_NAME',
    'FRONTEND_URL',
    'BACKEND_CLIENT_SECRET',
    'APP_ADMIN_NAME',
    'APP_ADMIN_LAST_NAME',
    'APP_ADMIN_EMAIL',
    'APP_ADMIN_PASSWORD',
  ].some((key) => !process.env[key])) {
    throw new Error('Missing environment variables');
  }
}