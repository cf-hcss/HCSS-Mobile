import { GoogleGenAI } from '@google/genai';

// This is the central point for initializing the Gemini API client.

// Check if the API key is provided in the environment variables.
const apiKey = process.env.API_KEY;

// The 'isAiConfigured' flag is true only if the apiKey exists and is a non-trivial string.
// This allows UI components to gracefully disable themselves if the AI is not configured.
export const isAiConfigured = !!apiKey && apiKey.length > 10 && !apiKey.startsWith('Add');

let ai: GoogleGenAI | null = null;

if (isAiConfigured) {
  try {
    // Initialize the client only if the key is properly configured.
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Fatal Error: Failed to initialize GoogleGenAI. Check API key.", e);
    // This case is unlikely to be hit if the key is just a string, but it's good practice.
  }
} else {
    console.warn("Gemini API key is not configured. AI features will be disabled.");
}

// Export the initialized client. It will be `null` if the key is missing.
export const gemini = ai;
