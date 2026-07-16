FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies (required for turbo/workspaces)
COPY package*.json ./
COPY apps/workers/render/package.json ./apps/workers/render/
COPY packages/ ./packages/
RUN npm ci

# Build packages and worker
COPY . .
RUN npm run build --workspace=@thronova/worker-render

FROM node:20-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

# Copy built artifacts and install production dependencies only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/apps/workers/render/package.json ./apps/workers/render/
COPY --from=builder /app/apps/workers/render/dist ./apps/workers/render/dist/

# Install production dependencies
RUN npm ci --omit=dev

CMD ["npm", "run", "start", "--workspace=@thronova/worker-render"]
