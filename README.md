# Collection of random utility scripts/programs.
Running the main `install.sh` script will create sym links for each program in your `/usr/local/bin` directory for system wide availability on your `PATH`. If you want a selection of the scripts installed, or installed to a different location modify the install script.

# Utility Scripts
## cprng
This script utilizes nodes build in cprng from the `crypto` (link) package to generate a random sequence of bytes. The first argument to the program is the number of bytes you want generated and the **optional** second argument is the encoding.

### examples
generate an 8 byte sequence encoded as hex (the default)
```shell
$ rand-bytes 8
```
