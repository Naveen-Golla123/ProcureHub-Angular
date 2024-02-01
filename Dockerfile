FROM node:18.10-alpine as angular
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=angular /app/dist/* /usr/share/nginx/html
EXPOSE 80




