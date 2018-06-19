FROM node:8-alpine
MAINTAINER gr4per

RUN apk add --no-cache curl

WORKDIR /home/node/bnp
RUN chown -R node:node .

COPY --chown=node:node . .

ENV NODE_ENV=development

USER node

RUN npm install && npm cache clean --force
RUN npm run build:client

EXPOSE 3000

CMD [ "npm", "start" ]

HEALTHCHECK --interval=15s --timeout=3s --retries=12 \
  CMD curl --silent --fail http://localhost:3000/api/health/check || exit 1
