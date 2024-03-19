#!/bin/bash

set -ex


REPO_URL="https://raw.githubusercontent.com/AndrChr0/Web-Prosjekt-Gruppe-2/main"
WD="/home/team2/team2-project"

# checking if another url has been given
if [[ -z "$1" ]]; then
	echo "a REPO_URL hasn't been supplied - using the defaul one: ${REPO_URL}"
else
	REPO_URL="$1"
fi

# silent defaults
COMPOSE_FNAME="${2:-docker-compose.yml}"

# get the rest of params as an array of env files
if [[  $# -lt 3  ]]; then
	ENV_FNAME=(".env")
else
	echo "shifting"
	shift
	shift
	ENV_FNAME=("$@")
fi

curl -sS "${REPO_URL}/${COMPOSE_FNAME}" |
    sed '/build: ./d' |
    sed 's|image: sustainability-diary-g2-front-end|image: andrchr0/sustainability-diary-g2-front-end:latest|' |
    sed 's|image: sustainability-diary-g2|image: andrchr0/sustainability-diary-g2:latest|' > "${WD}/docker-compose.yml"
for envF in "${ENV_FNAME[@]}"; do
	# echo "$envF"
	curl -sS "${REPO_URL}/${envF}" > "${WD}/${envF}"
done

echo "Donwloaded docker-compose.yml"

set +ex

# NOTE: don't forget to chmod u+x this file  