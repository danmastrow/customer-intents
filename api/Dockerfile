# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the NestJS app source code
COPY ./ ./

# Build the app
RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the NestJS API port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
