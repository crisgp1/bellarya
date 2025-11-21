/**
 * Environment variable validation
 * Validates required environment variables at build/runtime
 */

const requiredEnvVars = ['MONGODB_URI'] as const;

type EnvVar = (typeof requiredEnvVars)[number];

function validateEnv(): Record<EnvVar, string> {
  const missing: string[] = [];
  const validated: Partial<Record<EnvVar, string>> = {};

  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];

    if (!value || value.trim() === '') {
      missing.push(envVar);
    } else {
      validated[envVar] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\n` +
      'Please copy .env.example to .env.local and fill in the values.'
    );
  }

  return validated as Record<EnvVar, string>;
}

// Validate on import
export const env = validateEnv();
