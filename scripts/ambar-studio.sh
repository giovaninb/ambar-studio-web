#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"
ENV_EXAMPLE="${ROOT_DIR}/.env.example"

usage() {
  cat <<'EOF'
Uso:
  ./scripts/ambar-studio.sh install      # cria .env (se faltar), builda e sobe
  ./scripts/ambar-studio.sh up           # sobe/rebuilda em background
  ./scripts/ambar-studio.sh down         # para e remove containers
  ./scripts/ambar-studio.sh logs         # logs do serviço web
  ./scripts/ambar-studio.sh status       # status dos containers
  ./scripts/ambar-studio.sh smoke        # valida endpoint HTTP local
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Comando obrigatório não encontrado: $1"
    exit 1
  fi
}

ensure_docker() {
  require_cmd docker
  if ! docker compose version >/dev/null 2>&1; then
    echo "docker compose plugin não encontrado."
    exit 1
  fi
}

ensure_env() {
  if [[ ! -f "${ENV_FILE}" ]]; then
    cp "${ENV_EXAMPLE}" "${ENV_FILE}"
    echo "Arquivo .env criado a partir de .env.example"
    echo "Revise WEB_PORT no arquivo .env se precisar."
  fi
}

docker_compose() {
  (cd "${ROOT_DIR}" && docker compose "$@")
}

read_web_port() {
  local port
  port="$(grep -E '^WEB_PORT=' "${ENV_FILE}" | cut -d '=' -f2 || true)"
  echo "${port:-4173}"
}

smoke_check() {
  require_cmd curl
  local port
  port="$(read_web_port)"
  curl -fsS "http://localhost:${port}/health" && echo
}

wait_for_health() {
  local max_attempts=30
  local attempt=1
  local port
  port="$(read_web_port)"

  echo "Aguardando frontend ficar saudável em http://localhost:${port}/health ..."
  until curl -fsS "http://localhost:${port}/health" >/dev/null 2>&1; do
    if (( attempt >= max_attempts )); then
      echo "Timeout aguardando health do frontend."
      echo
      echo "Status dos containers:"
      docker_compose ps || true
      echo
      echo "Últimos logs do serviço web:"
      docker_compose logs --tail=120 web || true
      exit 1
    fi
    attempt=$((attempt + 1))
    sleep 2
  done

  echo "Frontend pronto: http://localhost:${port}"
}

cmd="${1:-}"
case "${cmd}" in
  install)
    ensure_docker
    ensure_env
    docker_compose up -d --build
    wait_for_health
    smoke_check
    ;;
  up)
    ensure_docker
    ensure_env
    docker_compose up -d --build
    ;;
  down)
    ensure_docker
    docker_compose down
    ;;
  logs)
    ensure_docker
    docker_compose logs -f web
    ;;
  status)
    ensure_docker
    docker_compose ps
    ;;
  smoke)
    ensure_env
    smoke_check
    ;;
  *)
    usage
    exit 1
    ;;
esac
