FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies (required for turbo/workspaces)
COPY package*.json ./
COPY apps/workers/notification/package.json ./apps/workers/notification/
COPY packages/ ./packages/
RUN npm ci

# Build packages and worker
COPY . .
RUN npm run build --workspace=@thronova/worker-notification

FROM node:20-slim AS runner
WORKDIR /app


ENV NODE_ENV=production

# Copy built artifacts and install production dependencies only
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/apps/workers/notification/package.json ./apps/workers/notification/
COPY --from=builder /app/apps/workers/notification/dist ./apps/workers/notification/dist/

# Install production dependencies
RUN npm ci --omit=dev

CMD ["npm", "run", "start", "--workspace=@thronova/worker-notification"]
