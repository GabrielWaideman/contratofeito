# Contrato Feito - Imobiliária Digital 🏢

Este repositório contém o código fonte da Landing Page oficial da **Contrato Feito**, uma imobiliária com foco no mercado urbano e rural em Álvares Florence e região.

O projeto foi construído utilizando as melhores e mais modernas práticas de desenvolvimento web para garantir velocidade, SEO, segurança e uma estética premium (Black, Red & Gold).

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (React Framework) com App Router.
- **Tailwind CSS** para estilização rápida, flexível e responsiva.
- **Lucide React** para ícones otimizados em SVG.
- **TypeScript** para segurança de tipagem de dados.
- **Node.js** (Ambiente de Execução).

---

## 📖 Histórico de Desenvolvimento e Alterações

Abaixo está o registro cronológico das decisões de design e desenvolvimento tomadas ao longo das nossas sessões:

### 1. Estruturação Inicial do Projeto
- Configuração do Next.js + Tailwind CSS.
- Criação dos componentes estruturais: `Header`, `Hero`, `FilterBar`, `PropertySection`, `AboutSection`, `Testimonials` e `Footer`.
- Configuração de roteamento de âncoras na mesma página (One-Page Navigation).

### 2. Redesign Premium (Paleta de Cores)
- **Problema:** O layout inicial estava com tons muito "comuns" em azul.
- **Solução:** Com base em uma imagem de inspiração, redesenhamos o site inteiro substituindo a paleta por **Preto (Dark), Vermelho (Brand) e Dourado (Gold)**.
- Ajuste das variáveis diretamente no `tailwind.config.ts`.
- O Header foi mantido em fundo claro para equilibrar o visual com as seções muito escuras.

### 3. Correções de Responsividade e Mobile
- **Problema:** O layout estava quebrando/encolhendo em dispositivos móveis, gerando uma rolagem horizontal indesejada e achatando fontes.
- **Solução:** Inserimos a tag `<meta name="viewport">` corretamente no `head` (via `layout.tsx`), implementamos a classe `overflow-x-hidden` globalmente e removemos larguras fixas problemáticas, tornando tudo fluido e dinâmico.

### 4. Ajustes Finos de UI e Logos
- A caixa de buscas (`FilterBar`) estava duplicada acidentalmente devido a um erro de importação na `page.tsx`. O componente extra foi deletado.
- **Logomarca:** O tamanho da logo oficial foi ampliado de forma global.
  - No `Header` e no `Footer`, ganhando muito mais destaque na leitura.
  - Na seção "Sobre Nós", substituímos o selo provisório (que possuía apenas as letras "CF") pelo arquivo original (`logo.png`), dentro de um container flutuante maior (`w-40 h-40`).

### 5. Personalização Regional
- Trocamos uma imagem estática genérica de uma casa na seção "Sobre Nós" por uma foto real e oficial da praça matriz de **Álvares Florence** (`alvares.jpeg`), trazendo autoridade e identificação imediata para o público-alvo regional.

### 6. Botão Flutuante do WhatsApp
- Adição de um botão de ação rápida (CTA) de WhatsApp em toda a aplicação (injetado no `layout.tsx`).
- O botão conta com o ícone oficial em SVG, cor hexadecimal oficial (`#25D366`), animações de *hover* na proporção (`scale`) e sombra projetada em verde.

### 7. Modernização do Hero (Vídeo Background)
- Substituição da imagem de fundo estática na primeira dobra (topo do site) por um **vídeo em loop** (`videobackground.mp4`).
- Refinamento do **Gradient Overlay**: Ajustamos a opacidade do fundo escurecido de `70%` para `30%`, deixando o vídeo vibrante e perfeitamente visível sem atrapalhar a legibilidade das chamadas em texto branco e vermelho.

### 8. Correção de Layout (Faixa Azul/Escura)
- **Problema:** Um vão escuro ("faixa azul/chumbo") aparecia entre o banner de vídeo e a vitrine de imóveis.
- **Solução:** Ao utilizar margens negativas (`-mt-16`) para subir a caixa de buscas (`FilterBar`) e sobrepor o vídeo, um "buraco" foi deixado na árvore de elementos. Corrigimos aplicando um correspondente `-mb-16` para "puxar" a próxima seção (`PropertySection`) para cima, unindo a página de forma fluida.

### 9. Criação de Página Dedicada por Imóvel (`/imoveis/[id]`)
- Implementação de roteamento dinâmico no Next.js para carregar informações específicas de cada propriedade.
- Layout construído com duas colunas: galeria de fotos (com thumbnails interativas) na esquerda, e barra lateral de resumo, preços e CTAs de contato na direita.
- Integração do Header e Footer globais já existentes.
- Adição de um **Carrossel Automático de Imóveis Sugeridos** na parte inferior da página.

### 10. Refatoração da Página Geral de Imóveis (`/imoveis`) e Sistema de Filtros
- O filtro lateral foi transformado de reativo (atualiza sozinho a cada clique) para **explícito**: o usuário configura os filtros e clica no botão "Aplicar", otimizando a experiência.
- Design da barra lateral limpo, removendo barras de rolagem nativas feias.
- O botão de "Aplicar" foi redesenhado para ter um aspecto *Premium* (removendo bordas ou efeitos "grosseiros").
- Adição dos filtros **Finalidade** (Residencial, Comercial, Rural) e **Código do Imóvel**, completando o painel de buscas.

### 11. Padronização e Enriquecimento dos Cards de Imóveis
- Os cards foram unificados para que a aparência seja a mesma em qualquer página (Página Inicial, Grid de todos os imóveis, Lista horizontal e Sugestões).
- Inclusão dos dados completos solicitados em todos os cards: **Bairro acompanhado da Cidade**, ícones e valores para **Quartos, Suítes, Banheiros, Vagas de Garagem** e **Área** (com suporte à unidade correta, como m² ou alqueires).
- Ocultamos a "etiqueta visual" informando se o imóvel é RURAL ou URBANO da visão dos clientes para deixar o layout mais limpo, mantendo a informação apenas no banco de dados para os algoritmos de busca.
- Padronização monetária: os preços agora exibem as casas decimais corretamente (Ex: `R$ 450.000,00`).

### 12. Aprimoramento da Barra de Filtros da Página Inicial (`FilterBar`)
- A barra de busca no topo do site (abaixo do vídeo) foi significativamente expandida.
- O layout foi transformado em um Grid de duas linhas organizadas para acomodar as novas opções: **Finalidade, Bairro, Quartos, Banheiros e Código do Imóvel**, além das pré-existentes.

### 13. Ajustes na Seção de Depoimentos e Footer
- **Carrossel de Depoimentos:** Resolvido o problema de alinhamento em que as setas de transição ficavam "cortadas" devido à restrição de altura das caixas de mensagem.
- Inclusão de um botão funcional para "Adicionar um depoimento", acionando um Modal (Pop-up) para captura de tela.
- **Rodapé (Footer):** Corrigido o bug que tornava a logomarca do rodapé totalmente branca (removidos os filtros CSS de contraste/inversão de cor que anulavam a imagem original).
- Inclusão dos ícones do **TikTok** e **YouTube** nas redes sociais do rodapé.

### 14. Painel Administrativo (CMS) e Banco de Dados (MySQL)
- Implementação de um sistema de controle (Admin Panel) para gerenciamento completo dos imóveis do catálogo.
- **Banco de Dados:** Substituímos os dados fixos estáticos (mockados) pelo mapeamento real de dados utilizando o **Prisma ORM** conectado a um banco de dados **MySQL**.
- Criação e execução de Migrations para espelhar as tabelas e tipagens no banco de dados com total segurança (proteção contra SQL Injection).
- Refatoração dos componentes React para *Server Components*, buscando dados vivos do banco de dados na inicialização das rotas.

### 15. Autenticação Segura (Login JWT)
- O acesso ao Painel Admin é protegido por senha criptografada (**Bcrypt**).
- Sistema baseado em **JSON Web Tokens (JWT)** armazenados unicamente em *Cookies HttpOnly*, bloqueando interceptações via Javascript (XSS).
- Criação de um *Seed* para injetar o usuário mestre (`adm` / `123`) na inicialização do sistema.

### 16. Sistema Profissional de Upload de Imagens
- **Problema:** A interface anterior exigia que o administrador colasse links (URLs) genéricos da internet para as fotos dos imóveis.
- **Solução:** Implementação nativa de `<input type="file">` e construção de uma API dedicada para receber e salvar as mídias.
- Agora, as fotos de Capa e as dezenas de fotos de Galeria podem ser escolhidas diretamente do computador do usuário, sendo enviadas e armazenadas de forma segura e organizada na pasta física `public/uploads` do próprio servidor da imobiliária.

---

## 🚀 Como Executar o Projeto Localmente

1. Abra o terminal na raiz do projeto (`C:\Users\Gabriel Silva\.gemini\antigravity-ide\scratch\contratofeito`).
2. Instale as dependências (caso não tenha feito recentemente):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse pelo navegador na porta padrão: [http://localhost:3000](http://localhost:3000) ou a que foi configurada (ex: 3333).
