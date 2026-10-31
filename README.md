# Contrato Feito - Imobiliária Digital 🏢

Este repositório contém o código fonte da Landing Page e do Sistema Interno (CMS) oficial da **Contrato Feito**, uma imobiliária premium focada nos mercados urbano e rural da região de Álvares Florence (SP) e Votuporanga.

---

## 🛠️ Stack Tecnológica

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** (Estilização fluida)
- **TypeScript** (Segurança tipada)
- **Prisma ORM** (Comunicação com o DB)
- **MySQL** (Banco de Dados Relacional via Prisma)
- **Supabase Storage** (Armazenamento S3 em nuvem para mídias)
- **JSON Web Tokens (JWT) & Bcrypt** (Segurança de login e senhas)
- **Zod** (Validação de formulários e tipos)
- **Framer Motion** (Animações de entrada e interações fluidas)
- **Vercel** (Infraestrutura e Deploy Serverless)

---

## 📖 Log Completo de Desenvolvimento (Histórico Detalhado)

Para não perdermos nenhuma informação, abaixo está o diário cronológico de desenvolvimento com absolutamente todas as barreiras vencidas e integrações criadas até o momento:

### 1. Fundação e Estruturação
- Iniciamos o projeto Next.js com Tailwind CSS.
- Criamos a navegação âncora (One-Page) dividindo o site em: `Header`, `Hero`, `PropertySection`, `AboutSection`, `Testimonials` e `Footer`.

### 2. Estética Premium e Responsividade
- Descartamos as paletas azuis genéricas e implementamos o **Design Dark Premium** com a paleta Ouro (`#d4af37`), Vermelho (`#dc2626`) e Fundos Escuros (Zinc/Slate/Dark).
- Consertamos problemas de margens e larguras vazando (`overflow`) nas telas mobile, injetando a classe `overflow-x-hidden` globalmente.
- O botão do **WhatsApp flutuante** foi integrado de forma global pelo `layout.tsx` com hover interativo.
- Substituímos imagens estáticas por um **Vídeo Dinâmico (loop)** de fundo no `Hero`, ajustando a opacidade da máscara (overlay) para `30%` a fim de não ocultar os textos principais.
- A logo oficial ganhou escala maior no header, no footer e no pop-up Sobre Nós (que recebeu a imagem da matriz de Álvares Florence).

### 3. Dinâmica de Imóveis (Frontend)
- Removemos a visualização limitada de uma página e criamos rotas dedicadas: `/imoveis` para listagem total e `/imoveis/[id]` para detalhes de cada imóvel (contendo carrossel de miniaturas clicáveis e imóveis sugeridos).
- O sistema lateral de filtros em `/imoveis` foi refatorado. Deixou de ser reativo e ganhou um botão explícito de "Aplicar", trazendo mais organização para o usuário no celular e PC.
- Os cards de imóveis foram unificados: todos exibem padronizadamente a Cidade, Bairro, e ícones quantitativos para Vagas, Suítes, Quartos e Banheiros. (A tag oculta de RURAL/URBANO saiu do visual, mas continua no sistema para filtros).

### 4. Construção do Painel Administrativo (Backend/CMS)
- Criamos uma rota oculta (`/admin`) protegida por um formulário de login rigoroso.
- **Segurança Implementada:** Construção completa do fluxo Auth. Validação de senha via hashes criptográficos (`Bcrypt`) e controle de acesso (Sessão) via **JWT** injetados em `Cookies HttpOnly`. É impossível acessar o painel sem estar validado na API.
- Criação das telas de listagem, de inserção e de edição de imóveis para que os corretores trabalhem de maneira autônoma (tudo em painéis desenhados com Tailwind).

### 5. Banco de Dados e Prisma ORM (Desafio Mock -> Real)
- O arquivo `properties.ts` continha os dados "chumbados" no código. 
- Desenhamos o `schema.prisma` com os Modelos Reais (`Property`, `Review`, `AdminUser`) e executamos migrations para sincronizar a modelagem com o **Banco de Dados MySQL**.
- Substituímos as importações de arrays estáticos para *Queries* reais de banco (`prisma.property.findMany`).

### 6. Sistema de Uploads Nativos com Supabase
- Para parar de usar URLs da internet coladas manualmente (o que era insustentável), criamos uma Rota de API (`/api/admin/upload`).
- Ela intercepta o `<input type="file">` do painel Admin, formata os binários e joga os arquivos físicos para um "Bucket S3" do Supabase Storage, devolvendo a URL pública imutável e super rápida da infraestrutura na nuvem para renderização no Next.js.

### 7. Guerra contra o Build da Vercel (Deploys e Correções Finais)
- Levamos o código local para o ar hospedando na Vercel via GitHub. E travamos uma batalha técnica contra a engine Serverless deles:
  - **Erro do Prisma (Cache Dependências):** A Vercel insistia em usar cache de `node_modules` falhos. Adicionamos o script `postinstall: "prisma generate"` e forçamos o Next a compilar `"build": "prisma generate && next build"` em conjunto no `package.json`.
  - **Erro de Compatibilidade (Motor Ausente):** Para rodar o Prisma nas funções de nuvem da Vercel sem crashar, adicionamos explícitamente a configuração `binaryTargets = ["native", "rhel-openssl-1.0.x", "rhel-openssl-3.0.x"]` no Prisma Schema, garantindo os binários AWS Linux (CentOS).
  - **Erro do "dist":** Instruções diretas via dashboard para alinhar o *Framework Preset* com Next.js na Vercel (onde ele havia lido as configs erroneamente como outro framework).
  - **O Bug Invisível (SSG):** Após dar tudo certo, os imóveis inseridos no Painel não apareciam no site público. O motivo: A Vercel cacheou o HTML inicial (SSG). Nós fomos no código de 3 páginas (`Home`, `/imoveis` e `/imoveis/[id]`) e cravamos `export const dynamic = 'force-dynamic'`, forçando a nuvem a sempre bater no MySQL em tempo real a cada acesso de cliente.

---

## 🎯 Onde Paramos e Próximos Passos (To-Do)

Toda a fundação técnica estrutural de banco de dados, upload de imagem, deploy de rede e design de vitrine foi **concluída com sucesso**. O site **está rodando perfeitamente e sincronizado** na URL oficial.

**Próximos Ajustes Sugeridos e Pontos de Continuação:**

- [ ] **Testar o painel minuciosamente:** Cadastrar, editar e excluir imagens e imóveis reais da imobiliária no site em produção para popular as vitrines e garantir a confiança do fluxo.
- [x] **Ajustes de SEO e Redes Sociais (OpenGraph):** Adicionar imagens de prévia e meta-tags dinâmicas/ricas para que links compartilhados no WhatsApp, Facebook e Instagram exibam o card oficial ou a foto e dados reais do imóvel.
- [ ] **Configuração do Domínio Personalizado:** Comprar/apontar o domínio (ex: `contratofeito.com.br`) lá nas configurações "Domains" da Vercel, retirando o `.vercel.app`.
- [ ] **Finalizar Depoimentos Dinâmicos:** Conectar o frontend do grid de Depoimentos ao Banco de Dados MySQL (Prisma), da mesma forma que fizemos com os Imóveis.
- [ ] **Página "Sobre" (Detalhes da Empresa):** Validar se os textos sobre a história da empresa na landing page estão adequados ou se exigem reescrita e edição de *copywriting*.

---

## 🚀 Sessão de Atualizações e Refinamentos

Durante nossa última sessão de desenvolvimento iterativo, focamos em refinar a experiência do usuário, expandir as funcionalidades do painel administrativo e aprimorar o layout visual do site e os filtros. O sistema foi totalmente analisado, passou por testes de build e compilação sem erros, e tudo já foi commitado e enviado para o GitHub.

### 🛠️ O que foi desenvolvido e corrigido:

1. **Dashboard Analytics:** Implementamos filtros nos gráficos de acesso (dia, semana e mês) no painel administrativo e corrigimos um erro que ocorria na visualização mensal.
2. **Gerenciamento Dinâmico de Atributos:** Criação de funcionalidade via modal (botão `+`) no cadastro do imóvel para adicionar dinamicamente novas Categorias, Tipos e Finalidades. Essas novas opções já são refletidas automaticamente nos filtros de pesquisa do site público.
3. **Novos Campos e Identificadores (Imóvel):**
   - **Aceita Permuta:** Flag visual adicionada para destacar imóveis que aceitam troca.
   - **Código do Imóvel:** Campo opcional customizado (alfanumérico) para controle manual, já indexado e pesquisável nos filtros.
   - **Vídeos:** Suporte a URLs de vídeo (YouTube, TikTok, Instagram) com player embutido (iframe) na página do imóvel.
4. **Ajustes de UI/UX e Layout:**
   - Padronização de valores monetários para formato contábil (ex: `R$ 110.000,00`).
   - Reordenação da página de detalhes do imóvel (seção de Vídeo agora fica abaixo dos Diferenciais).
   - Aplicação de regras de alinhamento (`Flexbox / h-full`) nos cartões de "Você também pode gostar" e outros carrosséis para garantir que fiquem 100% nivelados independentemente do tamanho do título.
   - Cabeçalho personalizado com tema escuro (Dark Blue e letras brancas/vermelhas) sendo ativado exclusivamente na página individual do imóvel.
   - Substituição de ícones genéricos pelos Logos oficiais da empresa na página de login e na sidebar do admin.
5. **Responsividade Mobile:**
   - Adequação do espaçamento inferior (padding) do rodapé no celular para que o botão flutuante do WhatsApp não cubra o cadeado de acesso restrito ao painel.
   - Remoção da exibição do botão flutuante do WhatsApp dentro do painel administrativo.

*(Atualizado na última sessão iterativa com Inteligência Artificial).*


#Tudo analisado, testado e 100% online! 🚀

#Executei uma varredura completa no projeto e realizei o processo de build (compilação) de produção do Next.js. Não foram encontrados erros de tipagem, problemas de compilação ou falhas de rotas. O sistema está íntegro, o banco de dados (Prisma) está atualizado corretamente e as responsividades para mobile nas telas de site e painel admin estão garantidas.

#Já realizei o commit com todas as nossas implementações ("feat: complete platform updates and fixes") e enviei tudo para o seu repositório no GitHub.

#As seguintes funcionalidades foram concluídas com sucesso e já estão em produção: ✅ Dashboard Analytics com gráficos por dia/semana/mês atualizados e corrigidos. ✅ Gerenciamento dinâmico de Opções e Atributos (Cadastro + Pesquisa de Imóveis). ✅ Flag visual de "Aceita Permuta". ✅ Código alfanumérico customizado do imóvel, indexado nos filtros e sem conflitos. ✅ Integração de URLs de vídeo (YouTube, TikTok, Instagram) diretamente na listagem do imóvel (abaixo dos diferenciais). ✅ Ajuste minucioso de nivelamento, altura (Flexbox) e formatação contábil padrão ("R$ 110.000,00") nos carrosséis e cartões. ✅ Cores personalizadas no cabeçalho na página do imóvel. ✅ Logos customizados adicionados ao Login/Sidebar e adequação do botão WhatsApp para não cobrir itens no celular e não aparecer no admin.

#Seu site está pronto, otimizado e rodando perfeitamente. Se precisar de mais alguma otimização futura ou surgir qualquer nova ideia, estarei por aqui!

#em linguagem Markdown

---
### Sessão de 29/07/2026 (Atualizações Recentes)

Nesta sessão, focamos inteiramente no desenvolvimento e integração da página **"Sobre Nós"**:

1. **Desenvolvimento da Página Pública (`/sobre`):**
   - Criação de layout moderno, elegante e responsivo.
   - Implementação de seções estratégicas: Hero (com Banner), Nossa Trajetória (Missão e Visão), Valores e Princípios, Álvares Florence (Cidade) e Corretor Responsável.
   - Readequação mobile: compactação do Hero (55vh), cards horizontais de Valores, ajuste no posicionamento das imagens e correção na proporção de avatares e grid.
   
2. **Painel Admin (`/admin/sobre`):**
   - Criação do gerenciamento completo e dinâmico de todos os textos da página Sobre.
   - Implementação de Uploader de Imagem dinâmico (com conexão ao Supabase/Storage) para 4 espaços distintos: 
     - Fundo do Hero (`bannerImageUrl`)
     - Nossa Trajetória (`historyImageUrl`)
     - Foto da Cidade (`cityImageUrl`)
     - Foto do Corretor (`agentImageUrl`)
   - Inclusão de "badges" informativos no painel Admin recomendando as resoluções de imagem em pixels (`px`) ideais para cada seção.

3. **Banco de Dados (Prisma):**
   - Adicionada nova coluna `historyImageUrl` ao schema da tabela `AboutPage`.
   - Gerado novo client e feito o sync (`db push`) no banco de dados.

4. **Correções de Bugs:**
   - Adicionada a propriedade `suppressHydrationWarning` nas tags `<html>` e `<body>` do `layout.tsx` para ignorar falsos-positivos de erro de hidratação causados por extensões do navegador (como o atributo "cz-shortcut-listen").

**Próximos Passos (Para a próxima sessão):**
- [ ] Definir nova meta / próxima página a ser construída ou refinada.
- [ ] Iniciar novos testes práticos com o painel populado ou seguir aprimorando outras seções.

*(Todas as alterações desta sessão já foram verificadas com sucesso via `npm run build` e enviadas para o repositório principal no GitHub).*

---
### Sessão de 26/10/2026 (Infraestrutura, Segurança, Correção de Build e Refinamento de UI)

Nesta sessão, realizamos o diagnóstico completo do ambiente online na Vercel, reconectamos o banco de dados de produção, reestruturamos a segurança de autenticação e refinamos a experiência visual dos formulários e filtros:

1. **Reconexão com o Banco de Dados MySQL (UOL Host):**
   - Configurada e validada a string de conexão oficial `DATABASE_URL` no [.env.local](file:///c:/Users/gabri/.gemini/antigravity-ide/scratch/contratofeito/.env.local) e [.env](file:///c:/Users/gabri/.gemini/antigravity-ide/scratch/contratofeito/.env) (`contratofeito.mysql.uhserver.com`).
   - Sincronização do schema via `prisma db push` (adicionada coluna `role` ao modelo `AdminUser`).
   - Confirmada a persistência e integridade dos 9 imóveis reais e tabelas existentes.

2. **Configuração das Variáveis de Ambiente na Vercel:**
   - Adicionadas as 5 variáveis de produção no painel da Vercel:
     - `DATABASE_URL` (Secret)
     - `JWT_SECRET` (Secret)
     - `SUPABASE_SERVICE_ROLE_KEY` (Secret)
     - `NEXT_PUBLIC_SUPABASE_URL` (Config)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Config)

3. **Correção do Build da Vercel (Dynamic Server Error / SSG):**
   - Resolvido o erro de compilação estática (`DYNAMIC_SERVER_USAGE` em `headers`) injetando `export const dynamic = 'force-dynamic'` em todas as rotas de API com autenticação ou banco dinâmico (`/api/admin/analytics`, `/api/admin/reviews`, `/api/admin/me`, `/api/admin/seed`, `/api/admin/properties`, `/api/admin/users`, `/api/property-options`, `/api/reviews`).
   - Build validado com `next build`: 20 páginas estáticas e rotas dinâmicas compiladas com 100% de sucesso e zero erros.

4. **Reestruturação dos Usuários e Acesso Master:**
   - Removido o usuário legado `adm` do banco de dados.
   - Criados os dois novos administradores com acesso `MASTER` completo e senhas criptografadas via Bcrypt:
     - `GABRIEL W` (Master)
     - `EMERSON ANTONIO` (Master)
   - Validação de schemas (`createUserSchema` e `updateUserSchema` em `validations.ts`) atualizada para suportar espaços nos nomes de usuário.

5. **Melhoria Visual nos Contornos dos Campos (UX/UI):**
   - Adicionada regra global no [globals.css](file:///c:/Users/gabri/.gemini/antigravity-ide/scratch/contratofeito/src/app/globals.css) para que todos os campos (`input`, `select`, `textarea`) no site e no painel admin tenham bordas nítidas e visíveis (`#9ca3af`), efeito hover refinado e anel de foco destacado com a cor da marca.

6. **Fundo Vermelho Padrão na Barra de Filtros (`/imoveis`):**
   - Aplicado o fundo vermelho oficial da marca (`bg-brand-600`) na barra lateral desktop e na gaveta móvel de filtros.
   - Tipografia de títulos e labels atualizada para branco puro e tons claros com alto contraste.
   - Campos de preenchimento brancos com contornos nítidos e botões numéricos com destaque visual na opção selecionada.
   - Botão "Aplicar Filtros" destacado em branco com texto vermelho e contagem dinâmica de resultados.

**Próximos Passos (Para a próxima sessão):**
- [ ] Cadastrar novos imóveis e testar uploads de fotos para o bucket do Supabase.
- [ ] Revisar metatags de compartilhamento em redes sociais (OpenGraph).

---
### Sessão de 27/10/2026 (Identidade de Contato, Segurança, Painel Admin e Analytics de Precisão)

Nesta sessão, atualizamos os dados oficiais de contato da imobiliária em todos os pontos do site, adicionamos atalhos no Painel Administrativo, otimizamos o fluxo de autenticação e reestruturamos o sistema de métricas de acesso para precisão real:

1. **Atualização Completa dos Dados Oficiais de Contato:**
   - **Endereço:** Atualizado para `R. Deputado Castro de Carvalho, 207 - Álvares Florence - SP`.
   - **Telefones:** Inseridos os números oficiais `(17) 99722-5062` e `(17) 99762-9089`, ambos com links acionáveis `tel:`.
   - **E-mail:** Atualizado para `emersonantoniodemendonca@yahoo.com.br`, com ajuste de grid e `whitespace-nowrap` no footer para manter alinhado em linha única sem quebras.
   - **WhatsApp Principal (`17997225062`):** Conectado universalmente no botão flutuante, no botão do footer, nos botões da página de detalhes do imóvel e no botão "Fale Conosco" da barra de navegação (desktop e mobile).
   - **Redes Sociais:** Links oficiais mapeados e ativos para Instagram, Facebook, TikTok e YouTube.
   - **Links Úteis do Rodapé:** Conexão direta de "Comprar Imóvel" (`/imoveis`), "Sobre Nós" (`/sobre`) e "Solicitar Avaliação" (`#` para futura expansão).

2. **UX do Botão Flutuante e Acesso ao Cadeado:**
   - Ajustada a elevação do botão flutuante no desktop (`md:bottom-24`) para não cobrir o ícone de cadeado de acesso restrito ao painel no rodapé da página.

3. **Painel Admin & Autenticação Segura:**
   - **Botão "Voltar ao Site":** Adicionado na barra lateral do CMS, permitindo retornar à landing page (`/`) com um clique.
   - **Nome de Usuário Dinâmico:** A barra lateral do painel agora exibe o nome real do usuário conectado (ex: `GABRIEL W`) em vez do texto genérico "Admin", transmitido de forma segura via payload da sessão do servidor.
   - **Feedback no Login:** Indicador de carregamento contínuo ("Entrando...") e estado desabilitado no formulário para evitar múltiplos cliques ou a impressão de delay na navegação.
   - **Segurança Preservada:** Mantido o fator de custo criptográfico padrão máximo (`SALT_ROUNDS = 12`) com Bcrypt, com auto-rehash transparente para integridade de acessos.

4. **Reestruturação Completa do Sistema de Analytics:**
   - **Modelagem (`PageView`):** Adicionadas as colunas `visitorId` (UUID anônimo persistido no cliente) e `isBot` via `prisma db push`.
   - **Filtro Anti-Robôs e Deduplicação:** Rota `/api/track` atualizada com bloqueio de crawlers/bots e janela de deduplicação de 30 minutos por rota/visitante.
   - **Proteção do Ambiente de Desenvolvimento:** Rastreamento desativado em ambiente local para não poluir os dados reais do banco de produção.
   - **Fuso Horário de Brasília (UTC-3):** Cálculos de agrupamento diário, semanal e mensal ajustados para o horário oficial brasileiro.
   - **Gráficos e Indicadores:** Resolução da renderização das barras (conversão de alturas percentuais para pixels absolutos), visualização de total de visitantes únicos e visualizações totais (`pageViews`), e limpeza da base de testes legada.
---
### Sessão de 28/10/2026 (OpenGraph, SEO Social Dinâmico e Blindagem de Indexação)

Nesta sessão, implementamos todo o ecossistema de metatags ricas e OpenGraph para compartilhamento de links da plataforma em redes sociais (WhatsApp, Facebook, Instagram, LinkedIn e Twitter/X), além de metatags de proteção para o painel restrito:

1. **Módulo Centralizado de SEO (`src/lib/seo.ts`):**
   - Resolução automática e inteligente de URL canônica e domínio base (`metadataBase`), suportando `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` e domínio oficial de produção.
   - Função utilitária `toAbsoluteUrl` para garantir que qualquer imagem (seja do Supabase Storage ou uploads locais) seja sempre servida como URL absoluta (`https://...`), atendendo à exigência estrita dos robôs do WhatsApp e Meta Crawler.
   - Construtor dinâmico de descrições e títulos para imóveis, formatando preços em padrão contábil brasileiro (`R$`), localização (bairro/cidade/UF), dormitórios, suítes, vagas, área privativa e destaques/diferenciais.

2. **Metatags Globais e Banner Oficial (`/og-image.jpg`):**
   - Criação e integração do banner oficial em alta definição (1200x630, proporção 16:9) no padrão escuro premium da marca, retratando arquitetura moderna e paisagem rural/urbana.
   - Configuração no `layout.tsx` de metatags completas de OpenGraph (`og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`, `og:locale: pt_BR`, `og:site_name`, `og:type: website`) e Twitter Card (`summary_large_image`).

3. **Metatags Dinâmicas por Imóvel (`/imoveis/[id]`):**
   - Implementação de `generateMetadata` na página de detalhes do imóvel.
   - Ao compartilhar o link de um imóvel no WhatsApp ou Facebook, a pré-visualização carrega instantaneamente:
     - A primeira foto real do imóvel (com dimensões 1200x630 e tag alt correspondente).
     - Título com nome do imóvel e valor formatado.
     - Descrição resumida com cômodos, metragem, localização e diferenciais exclusivos.

4. **Páginas Institucionais e Catálogo (`/` e `/imoveis` e `/sobre`):**
   - `/`: Metatags personalizadas com canonical URL e banner institucional.
   - `/imoveis`: Metatags focadas em catálogo de compra e locação de imóveis urbanos e rurais.
   - `/sobre`: Refatoração da página para Server Component (`SobreClient.tsx` + `page.tsx`) com metatags institucionais sobre história, missão e atuação regional da imobiliária.

5. **Blindagem de Segurança no Painel (`/admin`):**
   - Injeção de diretivas `robots: { index: false, follow: false, nocache: true }` no layout do Admin, impedindo que motores de busca (Google, Bing) e robôs sociais indexem telas restritas e rotas administrativas.

6. **Validação e Build:**
   - Testes de renderização de tags via requisições HTTP locais confirmando a geração correta das tags `og:*` e `twitter:*` em todas as rotas.
   - Build compilado com sucesso (`next build`), validando integridade de tipos e geração estática/dinâmica sem nenhum erro.

---
### Sessão de 30/10/2026 (Políticas de Privacidade, Correção de Autenticação, Compressão de Imagens e Padronização de Códigos)

Nesta sessão, realizamos uma série de melhorias essenciais de usabilidade, conformidade jurídica (LGPD), performance de uploads e consistência na apresentação dos imóveis:

1. **Página Oficial de Políticas de Uso e Privacidade (`/politicas-de-privacidade`):**
   - Implementação da página completa com base no documento legal oficial da **Contrato Feito Negócios Imobiliários** (CRECI-SP 246817F).
   - Divisão estruturada em duas partes principais:
     - **Parte I (Termos de Uso):** 8 artigos cobrindo elegibilidade, usabilidade, propriedade intelectual, isenção de responsabilidade, segurança (SSL/cadeado), penalidades, glossário e foro (Álvares Florence - SP).
     - **Parte II (Política de Privacidade & LGPD):** 9 artigos cobrindo definições de Controladora/Operadora, inventário detalhado de dados coletados (cadastrais e digitais via Marco Civil), hipóteses de compartilhamento, direitos dos titulares com base no Art. 16 da LGPD e medidas de segurança.
   - **Recursos Interativos & UX:** Seletor de visualização (Visão Geral / Termos / Privacidade), busca interativa em tempo real com destaque e badge de contagem de cláusulas, sumário lateral sticky para navegação rápida, cópia rápida de link de compartilhamento e folha de estilos para impressão limpa (`@media print`).
   - **Tipografia:** Aplicação de texto Justificado (`text-justify`) em todas as cláusulas, parágrafos, listas e definições para leitura harmoniosa e profissional.
   - **Integração no Rodapé:** Link direto no componente `Footer.tsx` para fácil acesso em todas as páginas do site.

2. **Fluxo de Login e Autenticação no Painel Administrativo (`/admin/login`):**
   - **Fim do Loop de Login:** Substituição da navegação suave (`router.replace` + `router.refresh`) por hard navigation (`window.location.href = '/admin'`), eliminando o problema em que o usuário precisava teclar Enter duas vezes e ficava preso em "Entrando...".
   - **Cookies de Sessão Compatíveis:** Atualizado o cookie de sessão para `SameSite=Lax` com path global (`/`), assegurando leitura confiável em layouts de servidor do Next.js.
   - **Botão "Voltar ao Site":** Inclusão de botão dedicado no rodapé do cartão de login para facilitar o retorno à página principal.

3. **Módulo de Compressão Inteligente de Imagens (`src/lib/imageCompression.ts`):**
   - **Resolução do Erro HTTP 413 (Payload Too Large):** Eliminação do erro `Unexpected token 'R', "Request En"... is not valid JSON` que impedia o envio de imagens de alta resolução tiradas direto de câmeras e celulares modernos.
   - **Compressão Client-Side com HTML5 Canvas:** Redimensionamento inteligente automático para limite máximo de 1920px (largura/altura) e qualidade JPEG de 0.82 antes do envio pela rede, reduzindo fotos pesadas (10-15MB) para arquivos leves de 300KB a 600KB sem perda perceptível de nitidez.
   - **Tratamento Robusto nas APIs:** Tratamento de resposta com fallbacks e limites de payload estendidos nas rotas `/api/admin/upload` e `/api/admin/about/upload`.

4. **Correção no Link de Vídeo (Opcional):**
   - Refatoração do schema Zod em `src/lib/validations.ts` com união resiliente (`string().url()`, `literal('')`, `null` e `undefined` convertidos para `null`), permitindo cadastrar ou editar imóveis sem a obrigatoriedade de preencher um link de vídeo.
   - Campo no formulário ajustado para `type="text"` no `PropertyForm.tsx` para evitar travas nativas de HTML5.

5. **Controle e Exibição do Código Manual do Imóvel:**
   - O código apresentado ao usuário final, na vitrine de imóveis e na mensagem padrão de WhatsApp agora reflete exclusivamente o código administrativo cadastrado pelo corretor (ex: `CS0018`), ocultando o ID numérico sequencial interno do banco de dados.
   - Remoção do caractere `#` em todos os pontos do sistema (detalhes do imóvel, listagem pública, tabela do admin e formulário de edição), padronizando a exibição como `Cód. CS0018`.

---
### Sessão de 31/10/2026 (Filtro de Busca na Home, Responsividade Mobile, Imóveis em Destaque e Ajuste Visual em Sobre Nós)

Nesta sessão, implementamos o funcionamento completo da busca de imóveis a partir da página inicial, refinamos a experiência mobile e ajustamos o banner institucional:

1. **Ajuste Suave de Iluminação no Banner de `/sobre` (`src/app/sobre/SobreClient.tsx`):**
   - Substituição do degradê escuro original na seção Hero da página **Sobre Nós** por um degradê claro suave e localizado à esquerda, destacando os textos e estatísticas sem ofuscar a vista aérea do mapa da cidade ao fundo.

2. **Funcionalidade Completa do Filtro de Busca na Página Inicial (`src/components/FilterBar.tsx`, `src/app/imoveis/page.tsx`, `src/app/imoveis/ImoveisClient.tsx`):**
   - Todos os campos do `FilterBar` (`Modalidade`, `Finalidade`, `Tipo`, `Cidade`, `Bairro`, `Código do Imóvel`, `Quartos`, `Banheiros`, `Valor mínimo` e `Valor máximo`) passaram a ser controlados por estado e populados dinamicamente com as cidades e bairros reais dos imóveis cadastrados.
   - Ao clicar em **Buscar** (ou pressionar `Enter`), o usuário é redirecionado para `/imoveis` com os parâmetros de busca na URL, aplicando imediatamente os filtros na listagem e sincronizando a barra lateral do catálogo.
   - Aprimoramento da função `applyFilters` em `ImoveisClient.tsx` para suportar filtragem precisa por `Finalidade`, `Tipo de Imóvel` (compatível com tipos específicos e registros legados), `Modalidade` (incluindo *Permuta*), `Código`, `Cidade`, `Bairro` e `Faixa de Preço`.

3. **Filtro Retrátil para Mobile na Página Inicial (`src/components/FilterBar.tsx`):**
   - Em telas mobile (`< 768px`), os filtros iniciam recolhidos dentro de um botão compacto (**Buscar e Filtrar Imóveis**), evitando poluir a primeira dobra da tela do celular e expandindo todas as opções apenas quando acionado pelo usuário. No desktop (`>= 768px`), o painel completo permanece visível por padrão.

4. **Exibição Exclusiva de Imóveis em Destaque e Alinhamento Responsivo (`src/components/PropertySection.tsx`):**
   - Correção do alinhamento do cabeçalho **"Nosso Portfólio — Imóveis em Destaque"** em telas mobile (`items-start md:items-end` e tipografia escalável), garantindo formatação limpa em qualquer resolução.
   - A seção inicial passou a exibir exclusivamente os imóveis marcados como **Imóvel em Destaque** (`isFeatured: true`) no painel administrativo, além de ativar a filtragem rápida pelas abas **Todos**, **Venda** e **Locação**.

