# Stage 1: Dependencies
FROM node:23-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

# Stage 2: Builder
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package.json first
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Copy only necessary files for building
COPY next.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY .env ./

# Build the Next.js app with standalone output
RUN npm run build

# Stage 3: Runner
FROM node:23-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output and static files
COPY --from=builder /app/.next/standalone/. ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./

USER nextjs

EXPOSE 3000

ENV NODE_ENV=development \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]