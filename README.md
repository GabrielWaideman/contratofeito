# Contrato Feito - Imobiliária Digital 🏢

Este repositório contém o código fonte da Landing Page oficial da **Contrato Feito**, uma imobiliária com foco no mercado urbano e rural em Álvares Florence e região.

O projeto foi construído utilizando as melhores e mais modernas práticas de desenvolvimento web para garantir velocidade, SEO, segurança e uma estética premium (Black, Red & Gold).

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** (React Framework) com App Router.
- **Tailwind CSS** para estilização rápida, flexível e responsiva.
- **Lucide React** para ícones otimizados em SVG.
- **TypeScript** para segurança de tipagem de dados.
- **Prisma ORM** para abstração e comunicação segura com o Banco de Dados.
- **MySQL** (Banco de dados relacional para armazenamento de imóveis, depoimentos e usuários).
- **Supabase Storage** para armazenamento em nuvem de imagens e arquivos (Buckets tipo S3).
- **Vercel** para hospedagem e deploy contínuo em arquitetura Serverless.

---

## 📖 Histórico de Desenvolvimento e Arquitetura

Abaixo está o registro cronológico das decisões de design, desenvolvimento e infraestrutura tomadas ao longo do projeto:

### 1. Estruturação Inicial do Projeto
- Configuração do Next.js + Tailwind CSS.
- Criação dos componentes estruturais: `Header`, `Hero`, `FilterBar`, `PropertySection`, `AboutSection`, `Testimonials` e `Footer`.
- Configuração de roteamento de âncoras na mesma página (One-Page Navigation).

### 2. Redesign Premium (Paleta de Cores)
- **Problema:** O layout inicial estava com tons muito "comuns" em azul.
- **Solução:** Redesenhamos o site inteiro substituindo a paleta por **Preto (Dark), Vermelho (Brand) e Dourado (Gold)**.
- O Header foi mantido em fundo claro para equilibrar o visual com as seções muito escuras.

### 3. Responsividade Móvel
- Implementação da classe `overflow-x-hidden` globalmente e remoção de larguras fixas problemáticas, tornando tudo fluido e dinâmico no mobile.

### 4. Ajustes Finos de UI e Logos
- A logomarca oficial ganhou muito mais destaque no `Header` e no `Footer`.
- Na seção "Sobre Nós", incluímos a foto real e oficial da praça matriz de **Álvares Florence**, gerando identificação regional.

### 5. Botão Flutuante do WhatsApp e Vídeo Hero
- Adição de botão flutuante de WhatsApp injetado no `layout.tsx` (visível em todo o site).
- Inclusão de um **vídeo em loop** no topo do site com *Gradient Overlay* otimizado para não prejudicar a leitura do texto em branco/vermelho.

### 6. Sistema de Rotas de Imóveis (`/imoveis` e `/imoveis/[id]`)
- Roteamento dinâmico no Next.js para carregar informações específicas de cada propriedade.
- Transformação do sistema de filtros lateral de "reativo" para **explícito** (clique no botão "Aplicar"), otimizando o desempenho e experiência.
- Todos os cards (da home à lista completa) padronizados com ícones e valores exatos para áreas, quartos, suítes, vagas de garagem e formatação monetária (BRL).

### 7. Painel Administrativo (CMS) Seguro
- Implementação de um painel de controle restrito (`/admin`) para gerenciamento do catálogo de imóveis e depoimentos.
- O acesso é protegido por senha criptografada (**Bcrypt**) e sessão mantida por **JSON Web Tokens (JWT)** via *Cookies HttpOnly*, bloqueando ataques XSS e injecções maliciosas.
- O administrador agora tem uma interface amigável para inserir, editar, ocultar (rascunho) ou deletar imóveis sem precisar tocar no código.

### 8. Banco de Dados Real (Prisma + MySQL)
- Transição dos dados estáticos (mockados) para um modelo robusto utilizando o **Prisma ORM** conectado a um banco de dados **MySQL** hospedado profissionalmente.
- O Prisma garante total segurança tipada, prevenindo vulnerabilidades clássicas como *SQL Injection*.
- O frontend (Server Components) busca os dados do banco de dados para apresentar as listagens ao usuário final.

### 9. Armazenamento em Nuvem com Supabase (Bucket S3)
- Substuímos a necessidade de links externos colados manualmente e métodos de salvamento local em disco (que não funcionam em produção na Vercel).
- Integração nativa de upload de arquivos `<input type="file">` ligada diretamente a um "Bucket" no **Supabase**.
- As fotos enviadas pelo painel administrativo vão com segurança para o servidor em nuvem, que devolve um link público ultrarrápido para exibição nas galerias de imóveis.

### 10. Hospedagem Profissional na Vercel (Produção)
- O site foi migrado do ambiente de desenvolvimento local e versionado através do Git (GitHub) para ir pro ar na Vercel.
- **Desafios e Soluções (Vercel Build):**
  - Lidamos com a agressividade do sistema de "Cache" da Vercel que impedia a inicialização do Prisma no Serverless. Resolvemos isso amarrando a geração do banco no ciclo de `build` (`prisma generate && next build`) e forçando compatibilidade binária de sistemas operacionais.
  - Para evitar que o site mantivesse "uma foto congelada" (SSG Cache) do site antigo e nunca mostrasse imóveis novos, forçamos as páginas a se manterem ativas e em constante consulta de rede (`export const dynamic = 'force-dynamic'`), garantindo que o catálogo fique atualizado em tempo real na tela do cliente.

---

## 🚀 Como Acessar o Projeto

- **Acesso Público (Versão no Ar):** [https://contratofeito.vercel.app](https://contratofeito.vercel.app)
- **Painel Administrativo:** Acesse `/admin` na mesma URL (Restrito a login gerado no banco de dados).

*(A aplicação continua ativa e documentada, pronta para manutenções, melhorias de SEO ou novas escalabilidades).*
