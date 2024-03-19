#!/bin/bash

set -e

wd="$(cd "$(dirname "$0")" && pwd)"

bash "${wd}/compose.sh"
bash "${wd}/docker-run.sh"

set +e