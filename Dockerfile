# build environment
FROM node:21 AS builder

# Setting up the work directory
WORKDIR /app

# Copy package.json and package-lock.json to the container 
COPY package*.json ./ 

# Install dependencies 
RUN npm install 
# RUN yarn install
# ENV PATH /app/node_modules/.bin:$PATH

# Copy the rest of the application code 
# Directories are special! If you write: COPY dir1 dir2 ./
# that actually works like: COPY dir1/* dir2/* ./
# If you want to copy multiple directories (not their contents) under a destination directory in a single command, you'll need to set up the build context so that your source directories are under a common parent and then COPY that parent.
# if the sources are directories, this copies the directory contents, not the directories themselves
COPY README.md vite.config.ts tsconfig.node.json tsconfig.app.json tsconfig.json LICENSE index.html .gitignore .eslintrc.cjs ./
COPY src ./src
COPY public ./public

RUN echo $(pwd)
RUN echo $(ls)
RUN echo $(ls node_modules)

# Build the React app 
RUN npm run build 
# RUN yarn run build
# node_modules/.bin/tsc --version

# Serve stage 
FROM nginx:1.25.1 

# Declaring env
# ENV NODE_ENV production

# Copy the custom nginx.conf file to the container 
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Copying our default.conf 
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the build stage to the nginx container 
COPY --from=builder /app/dist /usr/share/nginx/html 
# COPY --from=builder /app/dist /var/www/html/
COPY --from=builder /app/src/shared/assets /data/images

# Expose port 80 
EXPOSE 80 

# Start Nginx 
CMD ["nginx", "-g", "daemon off;"]

ARG DESCRIPTION="A neon-style website that allows you to play 2D games"
ARG BUILD_TAG=local
ARG VERSION=local

LABEL maintainer="krzysztofbasior"
LABEL description=${DESCRIPTION}
LABEL version=${VERSION}
LABEL build_tag=${BUILD_TAG}

# docker build --no-cache --progress=plain . 