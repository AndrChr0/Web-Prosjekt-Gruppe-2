#!/bin/bash

set -e

DEFAULT_WD="/home/team2/team2-project"
COMPOSE_FILE="docker-compose.yml"

wd="${WD:-$DEFAULT_WD}"

cd "$wd"

docker compose -f "${wd}/${COMPOSE_FILE}" down
docker compose -f "${wd}/${COMPOSE_FILE}" up -d

set +e