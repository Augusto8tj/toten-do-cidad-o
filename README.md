# Civitas Link - Totem do Cidadão

O **Civitas Link** é uma plataforma interativa de autoatendimento para prefeituras modernas, projetada para ser exibida em totens e quiosques públicos em pontos estratégicos da cidade.

## 🚀 Funcionalidades Principais

- **Portal de Serviços**: Acesso simplificado a serviços municipais essenciais (IPTU, Certidões, Ouvidoria, Saúde).
- **Assistente AI**: Chat inteligente integrado via Genkit (Gemini) para responder dúvidas dos cidadãos sobre serviços públicos.
- **Feed de Notícias**: Central de notícias da prefeitura com gerador de resumos via IA para facilitar a leitura rápida.
- **Sistema de Emergência**: Banner de alerta global para avisos críticos da Defesa Civil em tempo real.
- **Acessibilidade Total**:
  - **Modo Cadeirante**: Reorganização da UI para facilitar o alcance em telas sensíveis ao toque.
  - **Alto Contraste**: Tema visual otimizado para cidadãos com deficiência visual.
- **Painel Administrativo**: Área restrita para gestão de conteúdo, monitoramento de status da unidade e ativação de alertas.

## 🛠️ Tecnologias Utilizadas

- **Core**: Next.js 15, React 19, TypeScript.
- **Estilização**: Tailwind CSS, ShadCN UI.
- **Inteligência Artificial**: Google Genkit, Google Generative AI (Gemini 2.5 Flash).
- **Ícones**: Lucide React.
- **Carrossel**: Embla Carousel.

## 📂 Repositório de Registros e Auditoria

Os logs de operação, versões de sistema e registros de desenvolvimento são mantidos oficialmente em:
👉 [https://github.com/Augusto8tj/toten-do-cidad-o.git](https://github.com/Augusto8tj/toten-do-cidad-o.git)

## 🏁 Instalação e Desenvolvimento

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure sua chave de API do Gemini no arquivo `.env`:
   ```env
   GOOGLE_GENAI_API_KEY=sua_chave_aqui
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---
Desenvolvido para modernizar a interação entre o cidadão e a gestão pública.