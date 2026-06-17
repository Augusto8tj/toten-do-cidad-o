'use server';
/**
 * @fileOverview This file implements a Genkit flow for administrators to generate a summary and headline
 * for a news article based on its content, optimized for public kiosk display.
 *
 * - generateNewsContent - A function that handles the news content generation process.
 * - AdminNewsContentGeneratorInput - The input type for the generateNewsContent function.
 * - AdminNewsContentGeneratorOutput - The return type for the generateNewsContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminNewsContentGeneratorInputSchema = z.object({
  articleContent: z.string().describe('The full content of the news article.'),
});
export type AdminNewsContentGeneratorInput = z.infer<typeof AdminNewsContentGeneratorInputSchema>;

const AdminNewsContentGeneratorOutputSchema = z.object({
  headline: z.string().describe('A compelling and concise headline for the news article, optimized for public display.'),
  summary: z.string().describe('A short, engaging summary of the news article (around 2-3 sentences), suitable for a kiosk display.'),
});
export type AdminNewsContentGeneratorOutput = z.infer<typeof AdminNewsContentGeneratorOutputSchema>;

export async function generateNewsContent(input: AdminNewsContentGeneratorInput): Promise<AdminNewsContentGeneratorOutput> {
  return adminNewsContentGeneratorFlow(input);
}

const generateNewsContentPrompt = ai.definePrompt({
  name: 'generateNewsContentPrompt',
  input: { schema: AdminNewsContentGeneratorInputSchema },
  output: { schema: AdminNewsContentGeneratorOutputSchema },
  prompt: `You are an AI assistant tasked with generating a compelling headline and a concise summary for a news article.
The output should be optimized for display on a public interactive kiosk, meaning it should be engaging and easy to read.

Please generate:
1. A compelling and concise headline.
2. A short, engaging summary (around 2-3 sentences).

Here is the news article content:
{{{articleContent}}}`,
});

const adminNewsContentGeneratorFlow = ai.defineFlow(
  {
    name: 'adminNewsContentGeneratorFlow',
    inputSchema: AdminNewsContentGeneratorInputSchema,
    outputSchema: AdminNewsContentGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await generateNewsContentPrompt(input);
    return output!;
  }
);
