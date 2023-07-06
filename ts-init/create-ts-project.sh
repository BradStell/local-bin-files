# copy over package.json and install deps
cp "$HOME/Code/local-bin-files/ts-init/package.json" ./package.json
npm install --save-dev typescript ts-node

# root project files
cp "$HOME/Code/local-bin-files/ts-init/tsconfig.json" ./tsconfig.json
cp "$HOME/Code/local-bin-files/ts-init/gitignore" ./.gitignore
cp "$HOME/Code/local-bin-files/ts-init/.env" ./.env
cp "$HOME/Code/local-bin-files/ts-init/.env.example" ./.env.example

# source files
mkdir src
cp "$HOME/Code/local-bin-files/ts-init/utils.ts" ./src/utils.ts
cp "$HOME/Code/local-bin-files/ts-init/config.ts" ./src/config.ts
touch src/index.ts

