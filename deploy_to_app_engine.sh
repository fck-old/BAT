#!/bin/bash

###########
# This script (copies files to correct locations) asks for user input for the app version,
# then builds and pushes container image to gcr, finially deploying app using image
###########

##cp app.yaml to base project
cp ~/deployment_config/app.yaml ~/BAT/app.yaml

## cp deployment settings
cp ~/deployment_config/settings.py ~/deployment_config/settings_prod.py ~/BAT/batproject/batproject/

## cp json key
cp ~/deployment_config/media_sksys-bat-7a5cdc1a851f.json ~/BAT/batproject/

## mv Dockerfile out of home folder
mv Dockerfile docker/

read -p 'Version: ' version

read -p 'Promote (y/N): ' promote

# echo building docker image and pushing to gcr...

# docker build . -t eu.gcr.io/sksys-bat/bat-django:$version
# docker push eu.gcr.io/sksys-bat/bat-django:$version

echo deploying app... ...

if [[ "$promote" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    gcloud app deploy --version ${version//./-}
else
    gcloud app deploy --no-promote --version ${version//./-}
fi
