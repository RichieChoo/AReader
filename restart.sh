#!/bin/bash
git pull origin master && npm run build && cd ./dist && mv * /data/static/sites/test/www
