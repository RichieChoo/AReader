#!/bin/bash
git pull origin master 
npm run build 
rm -rf  /data/static/sites/test/www/*
cd ./dist &&  mv * /data/static/sites/test/www
