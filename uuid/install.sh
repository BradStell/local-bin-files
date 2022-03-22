# create a symlink to execute the transpiled javascript

PROJ_PATH="$LBF_LOC/uuid/run.sh"
SYM_LINK_PATH="/usr/local/bin/gen-uuid"

echo "Linking $PROJ_PATH to location $SYM_LINK_PATH"

ln -s $PROJ_PATH $SYM_LINK_PATH
