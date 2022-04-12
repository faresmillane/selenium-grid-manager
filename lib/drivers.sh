#!/bin/bash

if [ "$3" = ".tar.gz" ]; 
    then
        curl -LkSs $1 --output tmp/$2.tar.gz
        pwd
        ls
        tar -xf tmp/$2.tar.gz -C drivers
    else
        curl -LkSs $1 --output tmp/$2.zip
        pwd
        ls
        unzip tmp/$2.zip -d drivers
fi
