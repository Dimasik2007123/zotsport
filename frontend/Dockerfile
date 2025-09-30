FROM nginx:alpine
COPY public_html/css /usr/share/nginx/html/css
COPY public_html/images /usr/share/nginx/html/images
COPY public_html/js /usr/share/nginx/html/js
COPY public_html/*.html /usr/share/nginx/html/
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]