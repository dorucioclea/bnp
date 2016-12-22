FROM gr4per/bnp_base-image
MAINTAINER gr4per

# Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow,
# (creates it if does not exist).
# NOTE: "node" user and corresponding "/home/node" dir are created by "node:6-alpine" image.
WORKDIR /home/node/bnp

#COPY package.json npm-shrinkwrap.json .
COPY package.json .

# Setting NODE_ENV is necessary for "npm install" below.
ENV NODE_ENV=development
RUN npm set progress=false && npm install ; npm cache clean

# Bundle app source by overwriting all WORKDIR content.
COPY . tmp

# Change owner since COPY/ADD assignes UID/GID 0 to all copied content.
RUN chown -Rf node:node tmp
RUN rsync -vuar --delete-after tmp/* ./ && rm -rf tmp && chown node:node .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node
EXPOSE 3000
CMD [ "npm", "start" ]

# NOTE: "mysql" below is a DB service name in "docker-compose.yml"
ENTRYPOINT [ "./startup-script", "mysql" ]

