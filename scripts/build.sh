
#!/bin/bash
cd ..
docker-compose down
docker-compose build
docker-compose run -d --publish 4444:4444 rsk-regtest
rm -rf ./build
truffle deploy --network rskRegtest