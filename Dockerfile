# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first to optimize layer caching
COPY package.json package-lock.json* ./
RUN npm ci 
# Copy source code and build
COPY . .
RUN npm run build  # Generates static files in /app/dist

# Stage 2: Serve the app with a lightweight Node-based static server
FROM node:20-alpine AS runner
WORKDIR /app

# Install "serve" globally to serve static files
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000 (or any port you prefer)
EXPOSE 5173

# Start the server to serve the built static files
CMD ["serve", "-s", "dist", "-l", "5173"]
