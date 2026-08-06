export const isAuthConfigured = Boolean(
  process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET
);
