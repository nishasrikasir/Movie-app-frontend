# ─────────────────────────────────────────────
# Stage 1: Build the React app
# ─────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (leverages Docker layer caching)
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


# ─────────────────────────────────────────────
# Stage 2: Serve with Nginx on port 7000
# ─────────────────────────────────────────────
FROM nginx:stable-alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build output from Stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Write the nginx config directly into the image — no external nginx.conf needed
RUN printf 'server {\n\
    listen 7000;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # React Router support: fallback all routes to index.html\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Cache static assets for 1 year\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    server_tokens off;\n\
}\n' > /etc/nginx/conf.d/default.conf

# Expose port 7000
EXPOSE 7000

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]