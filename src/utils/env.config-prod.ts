// src/utils/env.config-prod.ts
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
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  rawEnv = {
    API_KEY: process.env.API_KEY , // Check both
    APP_SECRET: process.env.APP_SECRET , // Check both
    BASE_URL: process.env.BASE_URL , // Check both
    BASE_URL_VERSION: process.env.BASE_URL_VERSION , // Check both
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
export const envProd = parsed.data;