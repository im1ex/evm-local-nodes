#!/bin/bash

ID=$(($RANDOM+10000))

exec 3<>/dev/tcp/localhost/8545

echo -e "POST / HTTP/1.1
Host: localhost:8545
Content-Type: application/json
Content-Length: 65

{\"jsonrpc\":\"2.0\",\"method\":\"net_listening\",\"params\":[],\"id\":$ID}" >&3

timeout 1 cat <&3 | grep '"jsonrpc":' | grep "\"id\":$ID" | grep '"result":true' || exit 1

# | tee /dev/fd/2