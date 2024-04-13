## Do a deep dive on bash and figure out how to dynamically process each directory here and execute its install script to create the symlinks.
## for now just doing the first few manually

# have some code here to check the value of this LBF_LOC env var
PROJ_NAME="local-bin-files"
LBF_LOC="$HOME/Code/$PROJ_NAME"

echo "Using location of: $LBF_LOC"
echo ""

# cprng
echo "Installing rand-bytes"
cd cprng
npm i
npm run build
. install.sh
cd ..
echo ""

# hash_file
echo "Installing hashfile"
cd hash_file
npm i
npm run build
. install.sh
cd ..
echo ""

# now
echo "Installing now"
cd now
npm i
npm run build
. install.sh
cd ..
echo ""

# uuid
echo "Installing gen-uuid"
cd uuid
npm i
npm run build
. install.sh
cd ..
echo ""

# color convert
echo "Installing hex2rgb"
cd color-convert
npm i
npm run build
. install.sh
cd ..
echo ""
