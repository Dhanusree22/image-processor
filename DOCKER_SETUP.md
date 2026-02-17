# Docker Deployment Guide

## Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))

## Build Docker Image

\`\`\`bash
docker build -t textsegment:latest .
\`\`\`

## Run Container Locally

\`\`\`bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_api_key_here \
  textsegment:latest
\`\`\`

## Using Docker Compose

\`\`\`bash
# Create .env file with your API key
echo "OPENAI_API_KEY=your_api_key_here" > .env

# Start container
docker-compose up

# Stop container
docker-compose down
\`\`\`

## Access Application
Open: http://localhost:3000

## Docker Hub Upload

\`\`\`bash
docker tag textsegment:latest yourusername/textsegment:latest
docker push yourusername/textsegment:latest
\`\`\`

## Common Commands

\`\`\`bash
docker build -t textsegment .          # Build image
docker run -p 3000:3000 textsegment   # Run container
docker ps                               # List running containers
docker logs <container_id>              # View logs
docker stop <container_id>              # Stop container
docker rm <container_id>                # Remove container
