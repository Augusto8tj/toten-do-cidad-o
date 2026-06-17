
# Escopo do Projeto: Link do Cidadão (Rio Claro - RJ)

Este documento define as diretrizes, funcionalidades e o roteiro de desenvolvimento do totem interativo **Link do Cidadão**, projetado para a Prefeitura Municipal de Rio Claro - RJ.

## 1. Objetivo do Projeto
Transformar a interação entre o cidadão e a gestão pública através de um ponto de autoatendimento inteligente, inclusivo e multilíngue, reduzindo filas e democratizando o acesso à informação oficial.

## 2. Funcionalidades Atuais (V1.2)
- **Interface Multilíngue**: Suporte completo para Português (Brasil), Inglês e Espanhol.
- **Acessibilidade Inclusiva**:
    - **Modo Cadeirante**: Reposicionamento de elementos da interface para fácil alcance.
    - **Alto Contraste**: Tema visual otimizado para pessoas com baixa visão.
    - **Voz da IA (TTS)**: Conversão de texto em fala para as respostas do assistente municipal.
- **Assistente AI Rio Claro (Chat Ativo)**: Interface de chat em tempo real integrada com Google Gemini para dúvidas sobre serviços municipais.
- **Portal de Serviços**: Atalhos rápidos para IPTU, Certidões, Ouvidoria, Agendamento de Saúde, Transparência e Site Oficial.
- **Widget de Clima**: Exibição da temperatura atual em Rio Claro para utilidade pública.
- **Gestão de Emergência**: Sistema de alertas críticos (Defesa Civil) gerenciado via painel administrativo.
- **Plantão Rio Claro**: Feed de notícias locais com ticker dinâmico e resumos via IA.
- **Painel Administrativo**: Área restrita para moderadores controlarem notícias, slides do screensaver e alertas municipais.

## 3. Público-Alvo
- Cidadãos de Rio Claro - RJ.
- Turistas e visitantes nacionais e internacionais.
- Pessoas com mobilidade reduzida ou deficiências visuais/analfabetismo.

## 4. Pilares Tecnológicos
- **Frontend**: Next.js 15, Tailwind CSS, ShadCN UI.
- **Inteligência Artificial**: Google Genkit (Gemini 2.5 Flash), Gemini TTS.
- **Auditabilidade**: Registro de operações e logs via repositório GitHub.

## 5. Roadmap - Futuras Implementações
### Curto Prazo
- [x] **Interface de Chat AI**: Implementação de diálogo interativo para o cidadão.
- [x] **Voz da IA (TTS)**: Assistência por áudio nas respostas.
- [ ] **Mapa Interativo**: Guia visual de pontos turísticos e repartições públicas de Rio Claro.

### Médio Prazo
- [ ] **Pesquisa de Satisfação**: Módulo para o cidadão avaliar o atendimento do totem.
- [ ] **Integração de Vídeos (Veo)**: Geração de vídeos informativos curtos sobre campanhas de saúde.

### Longo Prazo
- [ ] **Suporte a Libras**: Assistente virtual ou vídeos com tradução em Língua Brasileira de Sinais.
- [ ] **Integração Biométrica**: Acesso seguro para serviços específicos.

## 6. Governança e Registros
O acompanhamento técnico e os logs de auditoria são mantidos no repositório oficial:
👉 [https://github.com/Augusto8tj/toten-do-cidad-o.git](https://github.com/Augusto8tj/toten-do-cidad-o.git)

---
*Última atualização: Março de 2024*
