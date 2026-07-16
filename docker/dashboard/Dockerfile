FROM node:20-alpine AS builder

WORKDIR /app

# Copy root configurations and package locks
COPY package*.json ./

# Copy all packages for workspace dependency resolution
COPY packages/ ./packages/

# Copy the dashboard package definition
COPY apps/dashboard/package.json ./apps/dashboard/

# Install all dependencies (including dev) to allow building
RUN npm ci

# Generate Prisma Client (Required for types and database interaction)
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# Copy the actual application source code
COPY apps/dashboard/ ./apps/dashboard/

# Build all copied workspaces (packages and dashboard)
# We do not copy workers/ so they are safely ignored
RUN npm run build --workspaces --if-present

# ---------------------------------------------------------

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy root configs
COPY package*.json ./

# Copy the dashboard package definition
COPY apps/dashboard/package.json ./apps/dashboard/

# Copy compiled packages from builder (includes dist folders)
COPY --from=builder /app/packages ./packages

# Install ONLY production dependencies across the workspace
# This will wipe node_modules and re-create it without devDependencies
RUN npm ci --omit=dev

# Copy the previously generated Prisma Client into the production node_modules
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy every file required for a normal Next.js runtime
COPY --from=builder /app/apps/dashboard/.next ./apps/dashboard/.next
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public
COPY --from=builder /app/apps/dashboard/next.config.ts ./apps/dashboard/

EXPOSE 3000

# Start the dashboard using the workspace start script
CMD ["npm", "run", "start", "--workspace=thronova-dashboard"]
