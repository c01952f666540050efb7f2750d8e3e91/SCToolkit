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
forge create src/common/stableToken.sol:FakeUSDT --rpc-url $LOCALHOST --private-key $PRIVATE_KEY --from $HOT_DEPLOY --json > shell/temp/stableToken.json
cat shell/temp/stableToken.json
echo "----------------------------------------------------------------------------------"
echo DEPLOYING MENTOS TOKEN
forge create src/common/mentosToken.sol:MentosToken --rpc-url $LOCALHOST --private-key $PRIVATE_KEY --from $HOT_DEPLOY --json > shell/temp/mentosToken.json
cat shell/temp/mentosToken.json