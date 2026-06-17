
'use server';
/**
 * @fileOverview A Genkit flow for an AI service assistant that answers citizen questions about city services in Rio Claro - RJ.
 * Follows SGov FluxoSaúde standard for structured output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CitizenAIServiceAssistantInputSchema = z.object({
  question: z.string().describe('The natural language question about city services in Rio Claro - RJ.'),
  language: z.enum(['pt', 'en', 'es']).default('pt').describe('The language in which the answer should be provided.'),
});
export type CitizenAIServiceAssistantInput = z.infer<typeof CitizenAIServiceAssistantInputSchema>;

const CitizenAIServiceAssistantOutputSchema = z.object({
  answer: z.string().describe('A concise and accurate answer to the citizen\'s question.'),
});
export type CitizenAIServiceAssistantOutput = z.infer<typeof CitizenAIServiceAssistantOutputSchema>;

const citizenServicePrompt = ai.definePrompt({
  name: 'citizenServicePrompt',
  input: {schema: CitizenAIServiceAssistantInputSchema},
  output: {schema: CitizenAIServiceAssistantOutputSchema},
  prompt: `You are an AI assistant for the City Hall of Rio Claro - RJ, designed for a public interactive kiosk named "Link do Cidadão".
Your goal is to help citizens quickly find information about municipal services.

Context:
- Location: Rio Claro, State of Rio de Janeiro (RJ), Brazil.
- Focus: Provide concise, accurate, and helpful answers.
- Scope: Official city services like IPTU, certificates, ombudsman, health scheduling.

Instructions:
- Always be polite and helpful.
- If the question is outside the scope of Rio Claro city services, politely state that you can only assist with local municipal inquiries.
- Keep answers concise for touch screens.
- YOU MUST RESPOND IN THE REQUESTED LANGUAGE: {{{language}}}.

IMPORTANTE: Responda APENAS um objeto JSON válido seguindo o schema definido. Não utilize marcações markdown ou texto introdutório.

Question: {{{question}}}`
});

const citizenAIServiceAssistantFlow = ai.defineFlow(
  {
    name: 'citizenAIServiceAssistantFlow',
    inputSchema: CitizenAIServiceAssistantInputSchema,
    outputSchema: CitizenAIServiceAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await citizenServicePrompt(input);
    return output!;
  }
);

export async function citizenAIServiceAssistant(
  input: CitizenAIServiceAssistantInput
): Promise<CitizenAIServiceAssistantOutput> {
  return citizenAIServiceAssistantFlow(input);
}
