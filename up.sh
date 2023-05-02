#!/usr/bin/env bash
cd /var/www/itender/vue/
git reset --hard origin/main
git pull 
npm i 
npm run build --production
updateLog="dist/up.txt"
if test -f "$updateLog"; then
    rm "$updateLog"
fi
touch "$updateLog"
ts=$(date "+%d/%m/%Y %H:%M:%S");
echo "Last update: $ts" >> "$updateLog"
/usr/games/cowsay -d I "Hey! Try after 20 minutes" >> "$updateLog"
/usr/games/cowsay -f tux "Psss at this moment we are died ..." >> "$updateLog"
