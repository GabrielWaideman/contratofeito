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
- [ ] **Ajustes de SEO e Redes Sociais (OpenGraph):** Adicionar imagens de prévia e meta-tags descritivas para que, quando o link do site for compartilhado no WhatsApp/Facebook, exiba um banner bonito da imobiliária.
- [ ] **Configuração do Domínio Personalizado:** Comprar/apontar o domínio (ex: `contratofeito.com.br`) lá nas configurações "Domains" da Vercel, retirando o `.vercel.app`.
- [ ] **Finalizar Depoimentos Dinâmicos:** Conectar o frontend do grid de Depoimentos ao Banco de Dados MySQL (Prisma), da mesma forma que fizemos com os Imóveis.
- [ ] **Página "Sobre" (Detalhes da Empresa):** Validar se os textos sobre a história da empresa na landing page estão adequados ou se exigem reescrita e edição de *copywriting*.

*(Atualizado na última sessão iterativa com Inteligência Artificial).*
