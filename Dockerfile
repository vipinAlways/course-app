# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0
ARG PNPM_VERSION=10.12.4

# -------------------------
# Base
# -------------------------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

RUN npm install -g pnpm@${PNPM_VERSION}
# -------------------------
# Dependencies
# -------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml  ./
RUN pnpm install --frozen-lockfile

# -------------------------
# Build
# -------------------------
FROM base AS builder
ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN pnpm prisma generate
RUN SKIP_ENV_VALIDATION=true pnpm build
# -------------------------
# Production
# -------------------------
FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Prisma fix
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000


CMD ["node", "server.js"]