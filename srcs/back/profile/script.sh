#!bin/bash
rm -rf /var/www/html/profile/node_modules;
npm cache clean --force;
if test -d /var/www/html/profile;
then
    echo "folder already exists";
    cd /var/www/html/profile;
else
    echo "folder doesn't exists! start setting up..";
    mkdir -p /var/www/html/profile;
    cd /var/www/html/profile;
    nest new .  --package-manager npm;
    npm install --save @nestjs/cli;
fi

echo "--------------------- Init --------------------------------";
npm install;
echo "--------------------- Starting --------------------------------";
exec npm run start:dev;