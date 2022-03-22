# create a symlink to execute the transpiled javascript

echo "Using location of: $LBF_LOC"

PROJ_PATH="$LBF_LOC/hash_file/hashfile.sh"
SYM_LINK_PATH="/usr/local/bin/hashfile"

echo "Linking $PROJ_PATH to location $SYM_LINK_PATH"

ln -s $PROJ_PATH $SYM_LINK_PATH
