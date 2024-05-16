# Use a slim base image of Node
FROM node:20

# Install libvips-dev for sharp compatibility
RUN apt-get update \
    && apt-get install -y --no-install-recommends libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Create the directory for the Strapi app
WORKDIR /app

# Copy only the package files necessary for installing dependencies
COPY ./backend/package*.json ./backend/yarn.lock ./
COPY ./.env ./
COPY ./backend/public/uploads ./app/public/uploads
COPY ./init.sql ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy the rest of the Strapi folder
COPY ./backend ./

# Expose port 1337
EXPOSE 1337

# Set environment variables
ENV NODE_ENV=${NODE_ENV}

# Build Strapi admin
RUN yarn build

# Run Strapi
CMD ["yarn", "start"]
