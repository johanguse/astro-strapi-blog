FROM node:20

# Set environment variables
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV} \
    PORT=3000

# Create the directory for the frontend
WORKDIR /frontend

# Copy package.json, package-lock.json, and .env
COPY ./frontend/package*.json ./
COPY .env ./

# Install dependencies
RUN yarn config set network-timeout 600000 -g \
    && yarn install --frozen-lockfile

# Copy the rest of the frontend files
COPY ./frontend ./ 

# Install serve globally
RUN npm install -g serve

# Expose port and run the application
EXPOSE 3000
CMD ["sh", "-c", "yarn build && yarn start"]

