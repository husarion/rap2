#!/bin/bash
# make sure this file uses LF instead of CRLF,
# unless you can get cryptic No such file or directory error
echo $(pwd)
PACKAGE_DIR=$(rospack find rap2)
cd $PACKAGE_DIR/server
node main.js $@