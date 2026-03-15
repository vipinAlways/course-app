# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.18.0
ARG PNPM_VERSION=10.12.4

# FROM node:${NODE_VERSION}-alpine
# ENV buildTag=1.0

# # ARG AUTH_SECRET
# ARG DATABASE_URL
# ARG GOOGLE_CLIENT_ID
# ARG GOOGLE_CLIENT_SECRET
# ARG RESEND_API_KEY

# ENV AUTH_SECRET=$AUTH_SECRET
# ENV DATABASE_URL=$DATABASE_URL
# ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
# ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
# ENV RESEND_API_KEY=$RESEND_API_KEY

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /src
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=secret,id=auth_secret,env=AUTH_SECRET \
    --mount=type=secret,id=google_client_secret,env=GOOGLE_CLIENT_SECRET \
    --mount=type=secret,id=resend_api_key,env=RESEND_API_KEY \
    npm install -g pnpm@${PNPM_VERSION}


################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate

# RUN pnpm db:generate

RUN --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

################################################################################
# Create a stage for building the application.
FROM deps as build

# COPY .env .env
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID

ENV DATABASE_URL=$DATABASE_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

RUN pnpm install --frozen-lockfile
# RUN pnpm prune --prod

# Copy the rest of the source files into the image.
COPY . .


ENV NEXT_PHASE=phase-production-build
ENV NODE_ENV=production

# Run the build script.

COPY .env .env
RUN pnpm build 

# Copy the built application into the image.
# COPY --from=build ./src/app/dist /usr/src/app

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as runner

# Use production node environment by default.
# ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /src/node_modules ./node_modules
COPY --from=build /src .


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD pnpm start
