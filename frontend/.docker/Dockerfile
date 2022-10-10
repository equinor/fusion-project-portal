# Web environment
FROM node:18.10.0 as build

#Copy
WORKDIR /app
COPY . /app

# Build 
RUN npm install
RUN npx nx build portal


   

# # Production environment
FROM nginx:1.20.2-alpine

## Add permissions for nginx user
COPY --from=build /app/dist/packages/portal /usr/share/nginx/html

## Cooy Nginx
COPY .docker/nginx/ /etc/nginx/conf.d/

## Copy Scripts
COPY  .docker/scripts/ /etc/scripts/


## Server setup
EXPOSE 80


CMD ["sh","/etc/scripts/run-nginx.sh"]