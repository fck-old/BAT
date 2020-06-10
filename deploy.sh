#!/bin/bash
echo "getting everything setup..."

#copy deployment files to correct location
cp docker/Dockerfile docker/docker-compose.yml docker/requirements.txt .

#copy settings.py to project settings
cp docker/settings.py batproject/batproject/settings.py

echo "starting docker"

sudo docker-compose up