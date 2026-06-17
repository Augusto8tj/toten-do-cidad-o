
# Guia de Implantação: IA OpenRouter (Padrão SGov FluxoSaúde)

Este documento descreve o padrão de motor de Inteligência Artificial adotado pela Prefeitura Municipal de Rio Claro - RJ para garantir retornos estruturados e seguros.

## 1. Requisitos Prévios
- **Conta OpenRouter**: Obter uma API Key em [openrouter.ai](https://openrouter.ai/).
- **Ambiente**: Node.js/Next.js.
- **Variável de Ambiente**: Configurar `OPENROUTER_API_KEY` no arquivo `.env`.

## 2. Arquitetura do Serviço (Core)
O segredo da nossa implementação é o **AI Service**, que centraliza as chamadas e garante que o retorno seja sempre um JSON puro, sem marcações Markdown (```json ... ```).

### Passo 1: O Serviço Central (Referência)
A implementação utiliza o Google Genkit para Rio Claro, que segue este padrão SGov de forma nativa através de Schemas de Saída, garantindo:
1. Resposta estritamente em JSON.
2. Validação de dados em tempo de execução.
3. Limpeza automática de artefatos de chat (Markdown).

## 3. Diretrizes para Novas LLMs
Para que outra funcionalidade seja implementada seguindo este padrão:

1. **Defina a Interface de Saída**: Use tipos TypeScript/Zod para o que se espera receber.
2. **Crie o Prompt Estruturado**: Instrua a IA a ser concisa e técnica.
3. **Segurança (Pseudonimização)**: Nunca envie nomes reais ou CPFs para as APIs de terceiros.

## 4. Modelos Recomendados
- **Gemini 2.5 Flash**: Utilizado neste totem pela alta velocidade e precisão em português.
- **Mistral 7B Instruct**: Alternativa rápida.

---
*Secretaria Municipal de Ordem Pública - Rio Claro, RJ*
