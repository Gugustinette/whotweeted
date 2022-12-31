# Deploy the app from scratch
# Usage: ./ressources/scripts/deploy.sh

# Add Nginx configuration
sudo cp ressources/deployment/whotweeted.fr /etc/nginx/sites-available/whotweeted.fr
sudo cp ressources/deployment/api.whotweeted.fr /etc/nginx/sites-available/api.whotweeted.fr
sudo ln -s /etc/nginx/sites-available/whotweeted.fr /etc/nginx/sites-enabled/whotweeted.fr
sudo ln -s /etc/nginx/sites-available/api.whotweeted.fr /etc/nginx/sites-enabled/api.whotweeted.fr

# Verify Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
