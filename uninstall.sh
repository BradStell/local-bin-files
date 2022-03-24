## Do a deep dive on bash and figure out how to dynamically process each directory here and execute its install script to create the symlinks.
## for now just doing the first few manually

# have some code here to check the value of this LBF_LOC env var
PROJ_NAME="local-bin-files"
LBF_LOC="$HOME/Code/$PROJ_NAME"

# cprng
cd cprng
echo "uninstalling cprng"
. uninstall.sh
cd ..

# hash_file
cd hash_file
echo "uninstalling hash_file"
. uninstall.sh
cd ..

# now
cd now
echo "uninstalling now"
. uninstall.sh
cd ..

# uuid
cd uuid
echo "uninstalling uuid"
. uninstall.sh
cd ..
