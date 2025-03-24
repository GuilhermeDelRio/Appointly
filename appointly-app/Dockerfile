# Use an official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the project files into the container
COPY . .

# Build the project for production
RUN yarn build

# Serve the built app using a lightweight web server
# Example using nginx
FROM nginx:alpine

# Copy the built files to the nginx web directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the web server
EXPOSE 80

# Start nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
