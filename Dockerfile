FROM gr4per/bnp-base
MAINTAINER gr4per

# go to base image folder first and add any missing modules there with npm install
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /var/tmp/base

#COPY package.json npm-shrinkwrap.json .
COPY package.json .

# Setting NODE_ENV is necessary for "npm install" below.
ENV NODE_ENV=development

RUN npm set progress=false && npm install ; npm cache clean

# make sure node can load modules from /var/tmp/base/node_modules
ENV NODE_PATH=/var/tmp/base/node_modules
ENV PATH=${PATH}:${NODE_PATH}/.bin

WORKDIR /home/node/bnp

# Bundle app source by overwriting all WORKDIR content.
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN rsync -a tmp/* ./ && rm -rf tmp && chown node:node .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node

# A container must expose a port if it wants to be registered in Consul by Registrator.
# The port is fed both to node express server and Consul => DRY principle is observed with ENV VAR.
# NOTE: a port can be any, not necessarily different from exposed ports of other containers.
EXPOSE 3000
CMD [ "npm", "start" ]

