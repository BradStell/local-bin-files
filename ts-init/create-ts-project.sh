cp "$HOME/Code/local-bin-files/ts-init/package.json" ./package.json

npm install --save-dev typescript ts-node

cp "$HOME/Code/local-bin-files/ts-init/tsconfig.json" ./tsconfig.json

cp "$HOME/Code/local-bin-files/ts-init/gitignore" ./.gitignore

mkdir src dist

touch src/index.ts
