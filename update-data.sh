#!/bin/bash

rm -f randomUsers.js
touch randomUsers.js
echo 'module.exports = ' > randomUsers.js
curl -s curl -s https://randomuser.me/api?results=5000 >> randomUsers.js
