
'use server';
/**
 * @fileOverview Gerador de manchetes e resumos para administradores.
 * Migrado para o Padrão SGov FluxoSaúde (OpenRouter/Nemotron).
 */

import { aiService } from '@/ai/openrouter-service';
import { z } from 'zod';

const AdminNewsContentGeneratorInputSchema = z.object({
  articleContent: z.string(),
});
export type AdminNewsContentGeneratorInput = z.infer<typeof AdminNewsContentGeneratorInputSchema>;

const AdminNewsContentGeneratorOutputSchema = z.object({
  headline: z.string(),
  summary: z.string(),
});
export type AdminNewsContentGeneratorOutput = z.infer<typeof AdminNewsContentGeneratorOutputSchema>;

export async function generateNewsContent(input: AdminNewsContentGeneratorInput): Promise<AdminNewsContentGeneratorOutput> {
  const prompt = `Como editor do portal da Prefeitura de Rio Claro - RJ, analise o texto abaixo e gere uma manchete curta e um resumo de 2 frases otimizado para exibição em totens públicos.

Conteúdo original:
${input.articleContent}`;

  const schemaDesc = "{ \"headline\": \"string\", \"summary\": \"string\" }";

  try {
    return await aiService.generate<AdminNewsContentGeneratorOutput>(prompt, schemaDesc);
  } catch (error) {
    console.error("Falha na geração de conteúdo de notícia:", error);
    return {
      headline: "Erro na geração automática",
      summary: "Não foi possível gerar o resumo via IA. Por favor, edite manualmente."
    };
  }
}
