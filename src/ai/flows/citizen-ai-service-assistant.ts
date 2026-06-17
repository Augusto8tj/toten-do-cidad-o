
'use server';
/**
 * @fileOverview A Genkit flow for an AI service assistant that answers citizen questions about city services in Rio Claro - RJ.
 *
 * - citizenAIServiceAssistant - A function that handles natural language questions about city services.
 * - CitizenAIServiceAssistantInput - The input type for the citizenAIServiceAssistant function.
 * - CitizenAIServiceAssistantOutput - The return type for the citizenAIServiceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CitizenAIServiceAssistantInputSchema = z.object({
  question: z.string().describe('The natural language question about city services in Rio Claro - RJ.'),
});
export type CitizenAIServiceAssistantInput = z.infer<typeof CitizenAIServiceAssistantInputSchema>;

const CitizenAIServiceAssistantOutputSchema = z.object({
  answer: z.string().describe('A concise and accurate answer to the citizen\'s question about city services in Rio Claro - RJ.'),
});
export type CitizenAIServiceAssistantOutput = z.infer<typeof CitizenAIServiceAssistantOutputSchema>;

const citizenServicePrompt = ai.definePrompt({
  name: 'citizenServicePrompt',
  input: {schema: CitizenAIServiceAssistantInputSchema},
  output: {schema: CitizenAIServiceAssistantOutputSchema},
  prompt: `You are an AI assistant for the City Hall of Rio Claro - RJ, designed for a public interactive kiosk.
Your goal is to help citizens quickly find information about municipal services in Rio Claro.

Context:
- Location: Rio Claro, State of Rio de Janeiro (RJ).
- Focus: Provide concise, accurate, and helpful answers to natural language questions.
- Scope: Direct information related to official city services like IPTU, certificates, ombudsman, health scheduling, etc.

Instructions:
- Always be polite and helpful.
- If the question is outside the scope of Rio Claro city services, politely state that you can only assist with local municipal inquiries.
- Keep answers concise as they will be read on a touch screen kiosk.

Question: {{{question}}}

Please provide a concise answer in Portuguese.`
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
