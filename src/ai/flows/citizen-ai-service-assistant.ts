
'use server';
/**
 * @fileOverview Assistente de IA para o cidadão de Rio Claro - RJ.
 * Migrado para o Padrão SGov FluxoSaúde (OpenRouter/Nemotron).
 */

import { aiService } from '@/ai/openrouter-service';
import { z } from 'zod';

const CitizenAIServiceAssistantInputSchema = z.object({
  question: z.string(),
  language: z.enum(['pt', 'en', 'es']).default('pt'),
});
export type CitizenAIServiceAssistantInput = z.infer<typeof CitizenAIServiceAssistantInputSchema>;

const CitizenAIServiceAssistantOutputSchema = z.object({
  answer: z.string(),
});
export type CitizenAIServiceAssistantOutput = z.infer<typeof CitizenAIServiceAssistantOutputSchema>;

export async function citizenAIServiceAssistant(
  input: CitizenAIServiceAssistantInput
): Promise<CitizenAIServiceAssistantOutput> {
  const prompt = `Você é o assistente virtual oficial da Prefeitura de Rio Claro - RJ para o totem "Link do Cidadão".
Responda dúvidas sobre serviços municipais (IPTU, Saúde, Ouvidoria, etc) de forma concisa e útil.

Localização: Rio Claro, Estado do Rio de Janeiro (RJ), Brasil.
Idioma da resposta: ${input.language === 'pt' ? 'Português Brasil' : input.language === 'en' ? 'Inglês' : 'Espanhol'}.

Pergunta do Cidadão: ${input.question}`;

  const schemaDesc = "{ \"answer\": \"string\" }";

  try {
    return await aiService.generate<CitizenAIServiceAssistantOutput>(prompt, schemaDesc);
  } catch (error) {
    console.error("Falha no assistente do cidadão:", error);
    return {
      answer: input.language === 'pt' 
        ? "Desculpe, não consegui processar sua dúvida agora. Por favor, tente novamente em instantes." 
        : "Sorry, I couldn't process your question right now. Please try again in a moment."
    };
  }
}
