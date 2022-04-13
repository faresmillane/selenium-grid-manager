#!/bin/bash

if [ "$3" = ".tar.gz" ]; 
    then
        curl -LkSs $1 --output $4tmp/$2.tar.gz
        pwd
        ls
        tar -xf $4tmp/$2.tar.gz -C $4drivers
    else
        curl -LkSs $1 --output $4tmp/$2.zip
        pwd
        ls
        unzip $4tmp/$2.zip -d $4drivers
fi
