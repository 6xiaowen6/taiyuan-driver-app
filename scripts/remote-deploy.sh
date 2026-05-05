#!/bin/sh
set -e

IMAGE_TAG="$1"
CONTAINER_NAME="taiyuan-app"

# Ensure docker is available
if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found on target host"
  exit 1
fi

# Stop and remove old container
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  docker rm -f ${CONTAINER_NAME} || true
fi

# Run new container
docker run -d --name ${CONTAINER_NAME} -p 80:80 --restart unless-stopped ${IMAGE_TAG}

echo "Deployed ${IMAGE_TAG}"