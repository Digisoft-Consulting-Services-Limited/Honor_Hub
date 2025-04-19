// src/utils/env.config.ts
import { z } from "zod";

// Define environment variable schema using Zod
const envSchema = z.object({
  API_KEY: z.string().min(1, "❌ API_KEY is required"),
  APP_SECRET: z.string().min(1, "❌ APP_SECRET is required"),
  BASE_URL: z.string().url("❌ BASE_URL must be a valid URL"),
  BASE_URL_VERSION: z.string().regex(/^v\d+$/, "❌ BASE_URL_VERSION must be in the format 'v1', 'v2', etc."),
});

let rawEnv: Record<string, string | undefined> = {};

// Prioritize process.env for Netlify Functions and local dev with Netlify CLI
if (typeof process !== 'undefined' && process.env) {
  rawEnv = {
    API_KEY: process.env.API_KEY || process.env.VITE_API_KEY, // Check both
    APP_SECRET: process.env.APP_SECRET || process.env.VITE_APP_SECRET, // Check both
    BASE_URL: process.env.BASE_URL || process.env.VITE_BASE_URL, // Check both
    BASE_URL_VERSION: process.env.BASE_URL_VERSION || process.env.VITE_BASE_URL_VERSION, // Check both
  };
} else if (typeof window !== 'undefined' && import.meta.env) {
  // Fallback to import.meta.env for pure browser environments (though less likely for functions)
  rawEnv = {
    API_KEY: import.meta.env.VITE_API_KEY,
    APP_SECRET: import.meta.env.VITE_APP_SECRET,
    BASE_URL: import.meta.env.VITE_BASE_URL,
    BASE_URL_VERSION: import.meta.env.VITE_BASE_URL_VERSION,
  };
}

// Validate the environment variables
const parsed = envSchema.safeParse(rawEnv);

// Handle validation errors
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  throw new Error("Invalid environment configuration");
}

// Export validated environment variables
export const env = parsed.data;