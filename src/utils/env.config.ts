import { z } from "zod";

// Define environment variable schema using Zod
const envSchema = z.object({
  API_KEY: z.string().min(1, "❌ API_KEY is required"),
  APP_SECRET: z.string().min(1, "❌ APP_SECRET is required"),
  BASE_URL: z.string().url("❌ BASE_URL must be a valid URL"),
  BASE_URL_VERSION: z.string().regex(/^v\d+$/, "❌ BASE_URL_VERSION must be in the format 'v1', 'v2', etc."),
});


// console.log("Environment Variables (Raw):");
// console.log("API_KEY present:", Boolean(import.meta.env.VITE_API_KEY));
// console.log("APP_SECRET present:", Boolean(import.meta.env.VITE_APP_SECRET));
// console.log("BASE_URL present:", Boolean(import.meta.env.VITE_BASE_URL));
// console.log("BASE_URL_VERSION present:", Boolean(import.meta.env.VITE_BASE_URL_VERSION));


// Load environment variables from Vite's `import.meta.env`
const parsed = envSchema.safeParse({
  API_KEY: import.meta.env.VITE_API_KEY,
  APP_SECRET: import.meta.env.VITE_APP_SECRET,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  BASE_URL_VERSION: import.meta.env.VITE_BASE_URL_VERSION,
});

// Handle validation errors
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  throw new Error("Invalid environment configuration");
}

// Export validated environment variables
export const env = parsed.data;
