#!/usr/bin/env bash
deploy_path="/home/casper1149/electric3/web/dist"
tarballname="web.tar.gz"

ip="169.45.106.72"
login="casper1149"

cd ./app
tar -czf ${tarballname} ./*

sshpass ssh ${login}@${ip} "cd ${deploy_path} && rm -rf ./*"

sshpass scp ${tarballname} ${login}@${ip}:${deploy_path}

rm ${tarballname}

sshpass ssh ${login}@${ip} << ENDHERE
   cd ${deploy_path}
   tar xf ${tarballname}
   rm ${tarballname}
   exit
ENDHERE
cd ../