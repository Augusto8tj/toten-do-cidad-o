
# Changelog: Link do Cidadão (Rio Claro - RJ)

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [1.2.4] - 2024-03-15
### Adicionado
- **Feed de Notícias Completo**: Ativação do botão "Ver Todas as Notícias" com um novo componente `NewsDialog` que permite ao cidadão navegar por todo o histórico de atualizações do município.
- **UX de Notícias**: Layout de grade aprimorado para o histórico de notícias, com imagens maiores e visualização clara de datas.

## [1.2.3] - 2024-03-14
### Melhorado
- **Acessibilidade Visual**: Refinamento do Modo Alto Contraste, substituindo o amarelo vibrante por um Ciano de alta visibilidade, resultando em uma interface mais profissional e menos cansativa.
- **Identidade de Marca**: Ajuste das variáveis de CSS para garantir consistência visual em todos os estados de acessibilidade.

## [1.2.2] - 2024-03-13
### Melhorado
- **Responsividade do Totem**: Layout otimizado para diferentes formatos de tela (horizontal e vertical).
- **UX Tátil**: Áreas de clique ampliadas e sombras aprimoradas para melhor feedback visual em telas touch.
- **Acessibilidade**: Refinamento do Modo Cadeirante com transições mais suaves e melhor aproveitamento de espaço.
- **Diálogos de UI**: Otimização do Chat de IA para ocupar melhor a tela e oferecer botões de controle mais robustos.

## [1.2.1] - 2024-03-12
### Adicionado
- **Expansão de Dados Mock**: Inclusão de 4 novas notícias detalhadas sobre segurança pública (Câmeras de Monitoramento), infraestrutura viária (RJ-155), agricultura em Getulândia e educação (Escolas Conectadas).
- **Conteúdo Territorial**: Foco maior nos distritos de Rio Claro para uma demonstração mais inclusiva geograficamente.

## [1.2.0] - 2024-03-11
### Adicionado
- **Assistência por Voz (TTS)**: Implementação de síntese de fala (Gemini TTS) no chat da IA, permitindo que o cidadão ouça as respostas do assistente municipal.
- **Clima em Tempo Real**: Adição de um widget de clima no cabeçalho da visão do cidadão, exibindo a temperatura atual em Rio Claro.
- **Acessibilidade Auditiva**: Novo controle de áudio dentro do chat para reproduzir/pausar a voz da IA.
- **Roadmap Atualizado**: Inclusão de novas metas no `EscopoDoProjeto.md`.

## [1.1.4] - 2024-03-10
### Adicionado
- **Conteúdo Institucional**: Expansão do feed de notícias locais com 6 novas entradas cobrindo saúde, infraestrutura em Lídice e Passa Três, turismo na Cachoeira do Salto e educação técnica.
- **Enriquecimento de Demonstração**: Dados realistas preparados especificamente para a apresentação oficial à Prefeitura de Rio Claro.

## [1.1.3] - 2024-03-09
### Adicionado
- **Plantão Rio Claro**: Implementação de um ticker de notícias dinâmico na parte inferior da tela que rotaciona as novidades do município a cada 3 segundos.
- **Animações de Transição**: Adição de efeitos de "slide-up" suave para as notícias do ticker, aumentando o dinamismo visual do totem.

## [1.1.2] - 2024-03-08
### Adicionado
- **Eventos Municipais**: Inclusão de propagandas e informações sobre a Festa da União, Festa da Paz e Festão do Peão Boiadeiro na tela de descanso (screensaver).
- **Notícias de Eventos**: Mock data updated with the 2024 events calendar for institutional demonstration.
- **Novos Ativos Visuais**: Configuração de placeholders específicos para os festivais locais no arquivo de recursos de imagem.

## [1.1.1] - 2024-03-07
### Adicionado
- **Links Institucionais**: Integração de acesso rápido ao Portal da Transparência e ao Site Oficial da Prefeitura de Rio Claro.
- **Ativos de Serviço**: Implementação de cards informativos com QR Code para os novos links institucionais.

## [1.1.0] - 2024-03-06
### Adicionado
- **Chat de IA Interativo**: Nova interface de diálogo para o cidadão conversar com o assistente municipal movido a Gemini.
- **Integração Funcional**: Conexão entre a UI e o fluxo `citizenAIServiceAssistant` do Genkit.
- **Sugestões Rápidas**: Atalhos de perguntas frequentes dentro do chat de IA para facilitar o uso no totem.
- **Feedback de Busca**: A barra de busca agora abre automaticamente o assistente de IA para uma experiência mais fluida.

### Melhorado
- **Acessibilidade**: Ajuste nos botões de controle para melhor visibilidade em telas sensíveis ao toque.

## [1.0.0] - 2024-03-05
### Adicionado
- **Estrutura Base**: Inicialização do projeto com Next.js 15, Tailwind CSS e ShadCN UI.
- **Identidade Visual**: Personalização completa para a Prefeitura Municipal de Rio Claro - RJ.
- **Renomeação**: Transição de "Civitas Link" para "Link do Cidadão".
- **Multilinguismo**: Suporte para Português (Brasil), Inglês e Espanhol.
- **Acessibilidade**: Implementação do Modo Cadeirante e Modo Alto Contraste.
- **Assistente AI**: Integração com Google Gemini (Genkit).
- **Painel Administrativo**: Gestão de notícias, alertas de emergência e screensaver.
- **Auditabilidade**: Registro do repositório GitHub para logs e transparência.
