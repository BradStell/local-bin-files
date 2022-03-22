# Collection of random utility scripts/programs.
Running the main `install.sh` script will create sym links for each program in your `/usr/local/bin` directory for system wide availability on your `PATH`. If you want a selection of the scripts installed, or installed to a different location modify the install script.

# Utility Scripts
## cprng
This script utilizes nodes build in cprng from the `crypto` (link) package to generate a random sequence of bytes. The first argument to the program is the number of bytes you want generated and the **optional** second argument is the encoding.

### examples
generate an 8 byte sequence encoded as hex (the default). This will result in a 16 character (byte) string as in hex encoding every 4 bits (half byte) generates a character. Said another way hex will generate 2 characters for each byte.
```shell
$ rand-bytes 8
d59a13f21288d736
```

generate an 8 byte sequence encoded as base64. This will result in a 12 character (byte) string as in base64 encoding every 3 bytes generates 4 characters (bytes).
```shell
$ rand-bytes 8 base64
Xq6/7N8M3eE=
```

generate a 256 byte sequence encoded as hex. This will generate a 512 byte string as it's encoded in hex.
```shell
$ rand-bytes 256 hex
1331862fc4a357d04b39546ceedd044be234a7dad080403f08b98b0d621a1f26b8299a5843ee65e827a20fc0a80653afb492235e9c3003ffb2f75fd09ac0d5bf7fb4cef2a1be4d547948369150e0e478cde4b6c0022c98cfa23ba026f5a60a5a031ee7cdbc0d0ec67f70ea8d1c9e3f3783bf87a62f08ea5dc78708f0cce355ebb3616644ae6164e9246593a1db5329c3d67ed6277c176b0da1ac59886aa58bdde8da7353e23047bd627850879135de74db4cc3a2f7731c491580a6cf4300fbd8709ed6ca8cd9623ce473c64298136b13e69c037ae26c05afd9d33d119096b9d2d87a0554c7c48a9b22f0b554c8779668afd48a0acdcf68ddc68a475dabed0c27
```

## hash_file
This script will run a SHA256 hash of the provided file in the first argument to the program. Future hash algorithms will be added as well as the encoding.

hash a file
```shell
$ hashfile path/to/file
4dc571451f9e1ea99940e514808ea75921bf28190200d1167e8e948ce52f65f7
```

## now
prints to std::out the current timestamp in milliseconds since epoch

```shell
$ now
1647962621708
```

pipe output into clipboard
```shell
$ now | phcopy
```

## uuid
This script will generate random version 4 uuids. The first argument is optional and represents how many uuids you want generated. If the argument doesn't parse as a valid int it defaults to generating 1 uuid.

### examples
generate 1 uuid
```shell
$ gen-uuid
3030d4a1-8dc5-408e-841f-d71434aff078
```

generate 10 uuids
```shell
$ gen-uuid 10
31c492b6-cbbf-469a-9234-d5e8aba6139c
15d22c5e-e2b2-4871-a929-116f6d89cedb
2f3d8711-56cb-4302-a4a2-5cfd8df0b2d7
f29c4caa-3080-4a2b-8b74-71d7123e8119
87fb6b0b-8e18-4ec1-8c72-8f621185b21c
d93711b5-fb47-4452-b8f5-2feefa75cdb6
e113bf16-b4cb-4b93-940a-521da751ece4
0882ae22-1f34-4e57-905a-65e237de3713
4178e51c-21cd-4930-992f-84110aeff8f5
be0f725a-b972-402d-88ab-2ddb7c036815
```

example demonstrating an invalid number
```shell
$ gen-uuid abc
d5ac7b7c-3a97-4c1a-81df-a06132291e72
```

generate a uuid and put it straight onto your clipboard
```shell
$ gen-uuid | pbcopy
```
