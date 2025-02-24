# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first to optimize layer caching
COPY package.json package-lock.json* ./
RUN npm ci 

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with a lightweight static server
FROM node:20-alpine AS runner
WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose the correct port (Cloud Run uses 8080)
EXPOSE 8080

# Serve the static files
CMD serve -s dist -l tcp://0.0.0.0:$PORT
