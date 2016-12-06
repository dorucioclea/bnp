FROM node:6-alpine
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
WORKDIR /home/node/supplierDir

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node

ENV NODE_ENV production
RUN mkdir -p node_modules

# Copying modules which are either manually changed or not located in https://registry.npmjs.org/ official registry
# (i.e. jCatalog registry) - see ".dockerignore" for the list. Otherwise "npm install" will throw an error.
COPY node_modules/ node_modules/

#COPY package.json npm-shrinkwrap.json .
COPY package.json .
RUN npm install && npm cache clean

# Bundle app source by overwriting all WORKDIR content.
COPY . .

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -R node:node .

EXPOSE 3001
CMD [ "node", "build/server/" ]

