#!/bin/bash
rm -rf  /data/static/sites/test/www/*
git pull origin master 
npm run build 
cd ./dist &&  mv * /data/static/sites/test/www
nginx -s reload

