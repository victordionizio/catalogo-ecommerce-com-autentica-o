# Catálogo E-commerce — API & SPA

Implementação full stack de referência para um catálogo de produtos com autenticação. O backend entrega uma API REST em Laravel (com Sanctum + padrão de respostas), e o frontend é uma SPA em React que consome essa API com uma UX consistente.

---

## Funcionalidades entregues

- Backend (Laravel 12)
  - API REST para `products` e `categories`
  - Paginação, busca e filtro por categoria
  - Autenticação com Laravel Sanctum (token Bearer)
  - Rotas de escrita protegidas (`auth:sanctum`) para produtos e categorias (criar/editar/remover)
  - Respostas padronizadas via `BaseApiResponse` e recursos/collections (`ProductResource`, `ProductCollection`, `CategoryResource`, `CategoryCollection`)
  - Padrão em camadas: **Controller (HTTP) → Service (negócio) → Repository (persistência)**
- Frontend (React 19 + Vite + Tailwind)
  - Listagem de produtos com grid, filtro (sidebar + chips no mobile) e ordenação visual
  - Pesquisa com debounce integrada ao catálogo
  - Página de detalhes do produto (PDP) consumindo `/api/products/{id}`
  - Login e registo consumindo `/api/login` e `/api/register`
  - Token persistido no `localStorage` e enviado automaticamente via interceptor do Axios
- Docker
  - `docker-compose.yml` com containers separados para MySQL, backend e frontend
  - Dockerfiles com build (frontend) e serve final (backend com assets buildados)

---

## Objetivo do design

O foco do projeto é demonstrar organização e separação de responsabilidades, evitando “controllers gordos” e queries espalhadas pelo código.

- **Repository Pattern**: queries e interações com o banco ficam concentradas nas classes de repositório.
- **Service Layer**: orquestração de regras de negócio e composição de chamadas de repositórios.
- **Responses padronizadas**: o frontend consome sempre o mesmo envelope, simplificando UI e tratamento de erro.

---

## Arquitetura do Backend

### Organização por domínio

```
app/
  Domains/
    Auth/
    Product/
    Category/
  Shared/
    Http/       # BaseController e respostas padronizadas
    Services/   # BaseService (comum)
    Infrastructure/Repositories/ # interfaces base
```

### Rotas por domínio

As rotas ficam em `routes/domains/*` e são incluídas por `routes/api.php`.

---

## Arquitetura do Frontend

```
src/
  app/                         # Layout principal (header/footer)
  features/
    auth/
    products/
  shared/
    components/                # UI reutilizável
    services/                  # axios + cache + utils
    hooks/                     # hooks compartilhados
```

`src/main.jsx` define as rotas:

- `/` → catálogo
- `/products/:id` → PDP
- `/login` e `/register` → autenticação

---

## Design System: Indigo Archive (Tailwind)

O projeto usa um design system próprio inspirado no spec “Indigo Archive”.

- Fonte única: **Manrope**
- Container: **1440px**
- Raio padrão: **8px** (`rounded-lg`)
- Cores e tipografia centralizadas:
  - `tailwind.config.js`: `fontFamily.sans` e `maxWidth.container`
  - `resources/css/app.css`: classes `ds-*` (botões, inputs, títulos e labels)

Componentes base:

- `src/shared/components/Button.jsx`: `ds-btn-primary`, `ds-btn-secondary`, `ds-btn-ghost`
- `src/shared/components/AlertBanner.jsx`: mensagens com variações `error/warning/info`

---

## Contrato da API (envelope de resposta)

Todas as respostas seguem o envelope do `BaseApiResponse`.

- Sucesso:
  - `success: true`
  - `data`: payload
  - `message`: string opcional
  - `meta.pagination`: quando existe paginação
- Erro:
  - `success: false`
  - `message`: string

---

## Endpoints da API

URL base: `/api` (ex.: `http://localhost:8080/api` no Docker).

### Autenticação

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| `POST` | `/register` | — | Cadastro; retorna `user` + `token` em `data` |
| `POST` | `/login` | — | Login; retorna `user` + `token` |
| `GET`  | `/user` | `Authorization: Bearer {token}` | Usuário atual |

### Catálogo

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| `GET` | `/categories` | — | Categorias paginadas (query `per_page`) |
| `GET` | `/products` | — | Produtos paginados; opcionais `search`, `category`, `per_page` |
| `GET` | `/products/{id}` | — | Detalhe do produto (com categoria quando carregada) |

Rotas de escrita (protegidas por `auth:sanctum`):

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| `POST` | `/categories` | Bearer | Criar categoria (`name`) |
| `PUT` / `PATCH` | `/categories/{id}` | Bearer | Atualizar categoria |
| `DELETE` | `/categories/{id}` | Bearer | Remover categoria |
| `POST` | `/products` | Bearer | Criar produto (`name`, `price`, `description?`, `category_id?`, `image_url?`) |
| `PUT` / `PATCH` | `/products/{id}` | Bearer | Atualizar produto |
| `DELETE` | `/products/{id}` | Bearer | Remover produto |

---

## Validação e segurança

- Laravel Sanctum para autenticação token-based (Bearer).
- Validação com `FormRequest`:
  - `LoginRequest`, `RegisterRequest`
  - `StoreProductRequest`, `UpdateProductRequest`
  - `StoreCategoryRequest`, `UpdateCategoryRequest`
- Senhas com hash:
  - Hash em `AuthService` e verificação no login.
- Rotas de escrita sob `Route::middleware('auth:sanctum')`.
- Mensagens de erro legíveis para o cliente via `extractApiErrorMessage`.

---

## Performance (o que foi otimizado após Lighthouse)

- Dedupe de requests:
  - `fetchProductsApi`: partilha `Promise` para pedidos com os mesmos parâmetros
  - `fetchProductByIdApi`: cache + dedupe de requests simultâneas
- Cache de categorias:
  - `fetchCategoriesApi` memoriza em memória (reduz chamadas repetidas)
- Imagens:
  - `loading="lazy"`, `decoding="async"`
  - `fetchPriority="high"` na imagem principal da PDP
- Índice no banco:
  - índice em `products.name` para apoiar `orderBy('name')` do catálogo

Observação: em modo dev (`yarn start`) o Lighthouse pode exibir critical path “inflado” pelo carregamento do Vite. Para uma medição mais realista, audite após `npm run build`.

---

## Data model (MySQL)

- `categories`: `id`, `name`, `created_at`, `updated_at`
- `products`: `id`, `name`, `description?`, `price`, `category_id?`, `image_url?`, `created_at`, `updated_at`

---

## Docker (execução)

Pré-requisitos: Docker Engine + Docker Compose v2.

1. Build e inicialização:

   ```bash
   docker compose build
   docker compose up -d
   ```

2. URLs:
   - Aplicação (Laravel + SPA buildada): `http://localhost:8080`
   - MySQL: `localhost:3306`

O entrypoint do backend garante `APP_KEY` quando vazio e executa migrations.

---

## Desenvolvimento local (sem Docker)

- Pré-requisitos: PHP 8.3+, Composer, Node 20+, MySQL
- Passos:
  - `composer install`
  - `cp .env.example .env`
  - `php artisan key:generate`
  - `php artisan migrate`
  - `npm install` (ou `yarn`)
  - `yarn start`
    - Laravel em `http://localhost:8000`
    - Vite em `http://localhost:5173`

Para Lighthouse “mais fiel”:

- `npm run build` e servir com Laravel (assets buildados) em vez de depender do dev server do Vite.

---

## Como executar testes

- `composer test`

---

## Publicação no Git (requisito do desafio)

O enunciado pede envio para repositório público (GitHub/Bitbucket/GitLab).

Exemplo:

```bash
git init
git add .
git commit -m "Entrega: catálogo e autenticação com Sanctum"
git branch -M main
git remote add origin <URL_DO_SEU_REPO>
git push -u origin main
```

Cuidados:
- Não comitar `.env`.
- Manter chaves/segredos fora do repositório.

---

## Licença

MIT (ver `composer.json` / licença do projeto).
