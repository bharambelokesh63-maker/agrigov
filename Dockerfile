# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code (includes .env for build-time VITE_ vars)
COPY . .

# Increase Node.js memory for the build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only the built output and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/package.json ./package.json

# No production dependencies needed — server.js uses only built-in Node.js modules

# Expose port
EXPOSE 8080

# Start the server directly (faster startup than npm start)
CMD ["node", "server.js"]