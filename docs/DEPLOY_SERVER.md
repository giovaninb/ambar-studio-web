# Deploy no Ubuntu Server (Docker Compose)

Este guia cobre o deploy do frontend `ambar-studio-web` em servidor pessoal Ubuntu, usando Docker Compose, sem interferir em outros serviços.

## Pré-requisitos

- Ubuntu com Docker instalado
- Docker Compose plugin (`docker compose`)
- Repositório clonado em um diretório fixo (ex.: `/opt/ambar-studio-web`)

## Primeiro deploy

```bash
cd /opt/ambar-studio-web
cp .env.example .env
# opcional: ajuste WEB_PORT para evitar conflito com outros serviços
./scripts/ambar-studio.sh install
./scripts/ambar-studio.sh status
```

Por padrão, a aplicação sobe em `http://SERVER_IP:4173`.

## Atualização diária

```bash
cd /opt/ambar-studio-web
./scripts/ambar-studio.sh deploy
./scripts/ambar-studio.sh status
```

`deploy` já executa `git fetch` + `git pull --ff-only` na branch atual antes de rebuildar.

## Comandos operacionais

```bash
./scripts/ambar-studio.sh status
./scripts/ambar-studio.sh logs
./scripts/ambar-studio.sh smoke
./scripts/ambar-studio.sh down
```

## Evitar quebra de ambiente

- Defina `WEB_PORT` no `.env` para uma porta livre (ex.: `4173`, `5173`, `8081`).
- O serviço usa `restart: unless-stopped`.
- O container expõe health endpoint em `/health`.
- O deploy usa `up -d --build`, mantendo o processo em background.

## Troubleshooting rápido

### Porta ocupada

```bash
sudo lsof -i :4173
```

Se estiver ocupada, altere `WEB_PORT` no `.env` e rode:

```bash
./scripts/ambar-studio.sh up
```

### Ver logs

```bash
./scripts/ambar-studio.sh logs
```

### Health check

```bash
curl -fsS http://localhost:4173/health && echo
```
