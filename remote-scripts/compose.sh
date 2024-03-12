#!/bin/bash

set -ex


REPO_URL="https://raw.githubusercontent.com/aliakseix/IDG2671-Docker/master"
WD="/home/tst/test-project"

# checking if another url has been given
if [[ -z "$1" ]]; then
	echo "a REPO_URL hasn't been supplied - using the defaul one: ${REPO_URL}"
else
	REPO_URL="$1"
fi

# silent defaults
COMPOSE_FNAME="${2:-remote.compose.yaml}"

# get the rest of params as an array of env files
if [[  $# -lt 3  ]]; then
	ENV_FNAME=(".env" ".mongo.env")
else
	echo "shifting"
	shift
	shift
	ENV_FNAME=("$@")
fi

curl -sS "${REPO_URL}/${COMPOSE_FNAME}" |
	sed '/build: ./d' |
	sed 's|image: yt-app-comp:0.2|image: aliakseix/idg2671:latest|' > "${WD}/compose.yaml"
for envF in "${ENV_FNAME[@]}"; do
	# echo "$envF"
	curl -sS "${REPO_URL}/${envF}" > "${WD}/${envF}"
done

echo "Donwloaded compose.yaml"

set +ex

# NOTE: don't forget to chmod u+x this file  