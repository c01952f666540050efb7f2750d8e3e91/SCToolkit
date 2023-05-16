source .env
echo "----------------------------------------------------------------------------------"
echo Dealing to HOT_DEPLOY
cast send --rpc-url $LOCALHOST --value 100ether --private-key $ANVIL_PK1 $HOT_DEPLOY 
echo "----------------------------------------------------------------------------------"
echo Dealing to Felix
cast send --rpc-url $LOCALHOST --value 100ether --private-key $ANVIL_PK1 $FELIX 
# echo "----------------------------------------------------------------------------------"
# echo DEPLOYING STABLE TOKEN
# forge create StableToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 
# echo "----------------------------------------------------------------------------------"
# echo DEPLOYING MENTOS TOKEN
# forge create MentosToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 
# echo "----------------------------------------------------------------------------------"
# echo DEPLOYING STAKING CONTRACT
# forge create MentosToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 