export const authConfig = (() => {
  // process.loadEnvFile(".env");
  return {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "your-refresh-secret",
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    bcryptSaltRounds: 12,
  };
})();
