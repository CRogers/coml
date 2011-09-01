#!/bin/sh

# See https://github.com/CRogers/FileWatcher

filewatcher "src/" "*.coffee" "coffee -o lib/ -c :path" "rm lib/:wefile.js"
