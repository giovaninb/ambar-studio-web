# Ambar Scenario Studio Web

Frontend do **Ambar Scenario Studio**, focado em criação e visualização de cenários clínicos sintéticos com timeline, templates, coortes e exportação técnica.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query

## Como rodar

```bash
npm install
npm run dev
```

Servidor padrão: `http://localhost:5173`.

## Rotas implementadas

- `/`
- `/scenarios`
- `/scenarios/new`
- `/scenarios/:id`
- `/templates`
- `/cohorts`
- `/exports`
- `/settings`

## Estrutura principal

```text
src/
  app/
  pages/
  components/
  features/
  lib/
  types/
  mocks/
```

## Estado atual

- Layout base com sidebar fixa, header e área de conteúdo
- Páginas iniciais com dados mockados
- Componentes reutilizáveis (cards, timeline, code viewer)
- Camada de API mock preparada em `src/lib/api.ts`
- Sem integração com backend nesta etapa

## Docker (produção)

### Arquivos criados

- `Dockerfile` (build da aplicação + runtime com Nginx)
- `docker-compose.yml`
- `.env.example`
- `nginx/default.conf` (fallback SPA + health endpoint)
- `scripts/ambar-studio.sh` (comandos de operação)
- `docs/DEPLOY_SERVER.md` (guia completo para Ubuntu)

### Comandos rápidos

```bash
cp .env.example .env
./scripts/ambar-studio.sh install
./scripts/ambar-studio.sh status
```

Deploy/update:

```bash
./scripts/ambar-studio.sh up
./scripts/ambar-studio.sh smoke
```
