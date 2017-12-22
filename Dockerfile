FROM node:8-alpine
MAINTAINER gr4per

RUN apk add --no-cache curl

WORKDIR /home/node/bnp

COPY . .

RUN chown -R node:node .
ENV NODE_ENV=production

USER node

RUN NODE_ENV=development yarn

RUN yarn run build:client

EXPOSE 3000

CMD [ "npm", "start" ]

HEALTHCHECK --interval=15s --timeout=3s --retries=12 \
  CMD curl --silent --fail http://localhost:3000/api/health/check || exit 1
