# Stage 1: build
FROM node:20 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build-time variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build React/Vite app
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
