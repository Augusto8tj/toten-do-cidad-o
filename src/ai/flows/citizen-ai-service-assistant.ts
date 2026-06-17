'use server';
/**
 * @fileOverview A Genkit flow for an AI service assistant that answers citizen questions about city services.
 *
 * - citizenAIServiceAssistant - A function that handles natural language questions about city services.
 * - CitizenAIServiceAssistantInput - The input type for the citizenAIServiceAssistant function.
 * - CitizenAIServiceAssistantOutput - The return type for the citizenAIServiceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CitizenAIServiceAssistantInputSchema = z.object({
  question: z.string().describe('The natural language question about city services.'),
});
export type CitizenAIServiceAssistantInput = z.infer<typeof CitizenAIServiceAssistantInputSchema>;

const CitizenAIServiceAssistantOutputSchema = z.object({
  answer: z.string().describe('A concise and accurate answer to the citizen\'s question about city services.'),
});
export type CitizenAIServiceAssistantOutput = z.infer<typeof CitizenAIServiceAssistantOutputSchema>;

const citizenServicePrompt = ai.definePrompt({
  name: 'citizenServicePrompt',
  input: {schema: CitizenAIServiceAssistantInputSchema},
  output: {schema: CitizenAIServiceAssistantOutputSchema},
  prompt: `You are an AI assistant for a City Hall interactive kiosk, designed to help citizens quickly find information about city services.\nYour goal is to provide concise, accurate, and helpful answers to natural language questions.\nFocus on providing direct information related to official city services like IPTU, certificates, ombudsman, etc.\nIf the question is outside the scope of city services, politely state that you can only assist with city-related inquiries.\n\nQuestion: {{{question}}}\n\nPlease provide a concise answer.`
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
