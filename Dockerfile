FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run compile

FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install pm2 -g && \
  npm ci --production --ignore-scripts

COPY --from=build /app/dist ./dist

CMD ["pm2-runtime", "./dist/index.js"]

HEALTHCHECK --interval=10s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1
