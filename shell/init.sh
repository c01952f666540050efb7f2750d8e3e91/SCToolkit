source .env

echo "----------------------------------------------------------------------------------"
echo Dealing to HOT_DEPLOY
cast send --rpc-url $LOCALHOST --value 100ether --private-key $ANVIL_PK1 $HOT_DEPLOY -j > shell/temp/hotDeploy.json
cat shell/temp/hotDeploy.json
echo "----------------------------------------------------------------------------------"
echo Dealing to Felix
cast send --rpc-url $LOCALHOST --value 100ether --private-key $ANVIL_PK1 $FELIX -j > shell/temp/felix.json
cat shell/temp/felix.json
echo "----------------------------------------------------------------------------------"
echo DEPLOYING STABLE TOKEN
forge create src/common/stableToken.sol:FakeUSDT --use 0.8.19 --rpc-url $LOCALHOST --private-key $PRIVATE_KEY --from $HOT_DEPLOY --json > shell/temp/stableToken.json
cat shell/temp/stableToken.json
echo SENDING MENTOS TOKEN
touch shell/temp/mintStable.json
cast send --private-key $PRIVATE_KEY --rpc-url $LOCALHOST $(jq -r ".deployedTo" "shell/temp/stableToken.json") "mint(address, uint256)" $HOT_DEPLOY 1000ether -j < shell/temp/mintStable.json
cat shell/temp/mintStable.json
echo "----------------------------------------------------------------------------------"
echo DEPLOYING MENTOS TOKEN
forge create src/common/mentosToken.sol:MentosToken --use 0.8.19 --rpc-url $LOCALHOST --private-key $PRIVATE_KEY --from $HOT_DEPLOY --json > shell/temp/mentosToken.json
cat shell/temp/mentosToken.json
echo SENDING MENTOS TOKEN
touch shell/temp/mintMentos.json
cast send --private-key $PRIVATE_KEY --rpc-url $LOCALHOST $(jq -r ".deployedTo" "shell/temp/mentosToken.json") "mint(address, uint256)" $HOT_DEPLOY 1000ether -j > shell/temp/mintMentos.json
cat shell/temp/mintMentos.json

