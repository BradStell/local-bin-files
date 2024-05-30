# create a symlink to execute the shell script

PROJ_PATH="$HOME/Code/local-bin-files/ts-init/create-ts-project.sh"
SYM_LINK_PATH="/usr/local/bin/ts-init"

echo "Linking $PROJ_PATH to location $SYM_LINK_PATH"

sudo ln -s $PROJ_PATH $SYM_LINK_PATH
