#!/bin/bash
echo "shell begin" 

$1

pm2 restart all

echo "shell end"