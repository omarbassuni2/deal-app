# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE ${PORT}

CMD ["npm", "run", "start"]