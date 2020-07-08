#!/bin/bash
echo "getting everything setup..."

#copy deployment files to correct location
cp docker/docker-compose.yml .
#cp docker/Dockerfile
#copy settings.py to project settings
#cp docker/settings.py batproject/batproject/settings.py

echo "starting docker"

sudo docker-compose up --build