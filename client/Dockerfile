FROM node:current-alpine as build

WORKDIR /app
COPY . /app

RUN yarn install --frozen-lockfile
RUN npx yarn run build

FROM nginx:1.25.2-alpine

COPY --from=build /app/dist/portal-client /usr/share/nginx/html

COPY ./docker/nginx/ /etc/nginx/

COPY  ./docker/scripts/ /etc/scripts/

EXPOSE 80

CMD ["sh","/etc/scripts/run-nginx.sh"]
