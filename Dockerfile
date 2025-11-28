# Stage 1: Build the React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

ARG REACT_APP_API_BASE_URL=http://137.116.207.5:5070
ARG REACT_APP_LANDING_API_BASE_URL=http://137.116.207.5:5188/api/v1
ARG REACT_APP_EVENT_API_BASE_URL=http://137.116.207.5:5186/api/v1
ARG REACT_APP_CUSTOMER_API_BASE_URL=http://137.116.207.5:5184/api/v1/customers
ARG REACT_APP_VENDOR_API_BASE_URL=http://137.116.207.5:5181/api/v1
ARG REACT_APP_NIN_API_BASE_URL=http://137.116.207.5:8187/api/nininfos/nin
ARG REACT_APP_VENUE_API_BASE_URL=http://137.116.207.5:8187/api/v1
ARG REACT_APP_CAC_API_BASE_URL=http://137.116.207.5:5182/validator/cac
ARG REACT_APP_IMAGE_API_BASE_URL=http://137.116.207.5:5183/api/v1/fotos
ARG REACT_APP_SECURITY_API_BASE_URL=http://137.116.207.5:5183/api/v1/securityQuestions
ARG REACT_APP_API_VERSIONL=api/v1
ARG REACT_APP_SECRET_KEY=TecVinsonEventMatcha

# Pass build arguments to the environment
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_LANDING_API_BASE_URL=${REACT_APP_LANDING_API_BASE_URL}
ENV REACT_APP_EVENT_API_BASE_URL=${REACT_APP_EVENT_API_BASE_URL}
ENV REACT_APP_CUSTOMER_API_BASE_URL=${REACT_APP_CUSTOMER_API_BASE_URL}
ENV REACT_APP_VENDOR_API_BASE_URL=${REACT_APP_VENDOR_API_BASE_URL}
ENV REACT_APP_NIN_API_BASE_URL=${REACT_APP_NIN_API_BASE_URL}
ENV REACT_APP_VENUE_API_BASE_URL=${REACT_APP_VENUE_API_BASE_URL}
ENV REACT_APP_CAC_API_BASE_URL=${REACT_APP_CAC_API_BASE_URL}
ENV REACT_APP_IMAGE_API_BASE_URL=${REACT_APP_IMAGE_API_BASE_URL}
ENV REACT_APP_SECURITY_API_BASE_URL=${REACT_APP_SECURITY_API_BASE_URL}
ENV REACT_APP_API_VERSIONL=${REACT_APP_API_VERSIONL}
ENV REACT_APP_SECRET_KEY=${REACT_APP_SECRET_KEY}

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]