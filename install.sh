## Do a deep dive on bash and figure out how to dynamically process each directory here and execute its install script to create the symlinks.
## for now just doing the first few manually

# have some code here to check the value of this LBF_LOC env var
PROJ_NAME="local-bin-files"
LBF_LOC="$HOME/Code/$PROJ_NAME"

# cprng
cd cprng
. install.sh
cd ..

# hash_file
cd hash_file
. install.sh
cd ..

# now
cd now
. install.sh
cd ..

# uuid
cd uuid
. install.sh
cd ..
