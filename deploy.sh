/root/.nvm/nvm.sh use 20
git clean -fdx
git reset --hard
git pull
pnpm i
node base deploy
cd .output/app
pnpm i
cd db
pnpm prisma generate
cd ../../..
rm -rf ../old/app
mv ../app ../old/app
mv .output/app ../app
pm2 restart 16
