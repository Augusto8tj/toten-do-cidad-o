
/**
 * @fileOverview AI Service centralizado seguindo o Padrão SGov FluxoSaúde.
 * Garante retornos em JSON puro e limpeza de artefatos de chat.
 */

export const aiService = {
  async generate<T>(prompt: string, schemaDescription: string): Promise<T> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY não configurada no ambiente.");
    }

    // Forçamos o modelo a responder apenas JSON no sistema de prompt
    const fullPrompt = `${prompt}\n\nIMPORTANTE: Responda APENAS um objeto JSON válido seguindo este formato: ${schemaDescription}. Não utilize marcações markdown (como \`\`\`json) ou texto introdutório. O retorno deve ser exclusivamente o JSON bruto.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://rioclaro.rj.gov.br", // Identificação opcional para OpenRouter
          "X-Title": "Link do Cidadão - Rio Claro RJ"
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-nano-9b-v2:free",
          messages: [{ role: "user", content: fullPrompt }],
          temperature: 0.1,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro OpenRouter:", errorData);
        throw new Error(`Falha na API: ${response.statusText}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;

      // LIMPEZA CRÍTICA: Padrão SGov para remover blocos de código
      content = content.replace(/```json/g, "").replace(/```/g, "").trim();

      // Fallback para garantir que é um objeto válido antes do parse
      return JSON.parse(content) as T;
    } catch (error) {
      console.error("Erro no AI Service:", error);
      throw error;
    }
  }
};
