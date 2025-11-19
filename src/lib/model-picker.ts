import { env } from "@/env";
import { createOpenAI } from "@ai-sdk/openai";
import { type LanguageModelV1 } from "ai";
import { createOllama } from "ollama-ai-provider";

/**
 * Centralized model picker function for all presentation generation routes
 * Supports OpenAI, Ollama, and LM Studio models
 * Base URLs can be configured via environment variables:
 * - OLLAMA_BASE_URL (default: http://localhost:11434)
 * - LMSTUDIO_BASE_URL (default: http://localhost:1234/v1)
 * - OPENAI_BASE_URL (optional, defaults to official API)
 */
export function modelPicker(
  modelProvider: string,
  modelId?: string,
): LanguageModelV1 {
  if (modelProvider === "ollama" && modelId) {
    // Use Ollama AI provider with configurable base URL
    const ollamaBaseURL = env.OLLAMA_BASE_URL || "http://localhost:11434";
    const ollama = createOllama({
      baseURL: ollamaBaseURL,
    });
    return ollama(modelId) as unknown as LanguageModelV1;
  }

  if (modelProvider === "lmstudio" && modelId) {
    // Use LM Studio with OpenAI compatible provider and configurable base URL
    const lmstudioBaseURL = env.LMSTUDIO_BASE_URL || "http://localhost:1234/v1";
    const lmstudio = createOpenAI({
      name: "lmstudio",
      baseURL: lmstudioBaseURL,
      apiKey: "lmstudio",
    });
    return lmstudio(modelId) as unknown as LanguageModelV1;
  }

  // Default to OpenAI with optional custom base URL
  const openaiConfig: {
    baseURL?: string;
    apiKey?: string;
  } = {};

  if (env.OPENAI_BASE_URL) {
    openaiConfig.baseURL = env.OPENAI_BASE_URL;
    console.log("Using custom OpenAI base URL:", env.OPENAI_BASE_URL);
  }

  if (env.OPENAI_API_KEY) {
    openaiConfig.apiKey = env.OPENAI_API_KEY;
  }

  const openai = createOpenAI(openaiConfig);

  // Determine the model ID to use
  // If modelId is provided and doesn't look like an Ollama model name, use it
  // Otherwise, use a default OpenAI-compatible model name
  let finalModelId = modelId || "openai/gpt-4o-mini";

  // If modelId looks like an Ollama model (contains colon or starts with llama/mistral/etc),
  // and we're using OpenAI provider, we used to force default GPT model.
  // But now we allow it to support OneAPI/custom providers that might use these names.
  /* 
  if (
    modelId &&
    (modelId.includes(":") ||
      modelId.startsWith("llama") ||
      modelId.startsWith("mistral") ||
      modelId.startsWith("qwen") ||
      modelId.startsWith("phi") ||
      modelId.startsWith("gemma") ||
      modelId.startsWith("neural-chat") ||
      modelId.startsWith("codellama"))
  ) {
    console.warn(
      `Model ID "${modelId}" looks like an Ollama model but provider is "${modelProvider}". Using default GPT model instead.`,
    );
    finalModelId = "openai/gpt-4o-mini";
  }
  */

  if (env.OPENAI_BASE_URL) {
    console.log("Creating OpenAI model with custom base URL:", {
      baseURL: env.OPENAI_BASE_URL,
      modelId: finalModelId,
      originalModelId: modelId,
      provider: modelProvider,
    });
  }

  return openai(finalModelId) as unknown as LanguageModelV1;
}
