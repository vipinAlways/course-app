# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=10.12.4

# -------------------------
# Base
# -------------------------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
# -------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# -------------------------
# Build
# -------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# If using Prisma
RUN pnpm prisma generate

RUN pnpm build

# -------------------------
# Production
# -------------------------
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# Copy only required files (Next.js standalone)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]