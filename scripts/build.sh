
#!/bin/bash
docker-compose down
docker-compose build
docker-compose run -d --publish 4444:4444 rsk-regtest
rm -rf ./build
cp -r ./node_modules/nft-marketplace-engine/contracts/* ./contracts
sed -i.bak 's+contracts/rns+.+g' ./contracts/rns/NFTRNSNameGenerationStrategy.sol
sleep 10
until nc -z localhost 4444
        do
            echo "Waiting for RskJ..."
            sleep 1
        done

#npx hardhat run --network rskRegtest src/scripts/deployMarketplace.js
