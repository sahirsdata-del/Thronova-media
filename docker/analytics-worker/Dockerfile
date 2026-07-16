FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies (required for turbo/workspaces)
COPY package*.json ./
COPY apps/workers/analytics/package.json ./apps/workers/analytics/
COPY packages/ ./packages/
RUN npm ci

# Build packages and worker
COPY . .
RUN npm run build --workspace=@thronova/worker-analytics

FROM node:20-slim AS runner
WORKDIR /app


ENV NODE_ENV=production

# Copy built artifacts and install production dependencies only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/apps/workers/analytics/package.json ./apps/workers/analytics/
COPY --from=builder /app/apps/workers/analytics/dist ./apps/workers/analytics/dist/

# Install production dependencies
RUN npm ci --omit=dev

CMD ["npm", "run", "start", "--workspace=@thronova/worker-analytics"]
