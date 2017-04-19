#!/bin/bash
echo "shell begin" 

$1

pm2 reload all

echo "shell end"