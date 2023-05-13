source .env
echo "----------------------------------------------------------------------------------"
echo DEPLOYING STABLE TOKEN
# forge create StableToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 
echo "----------------------------------------------------------------------------------"
echo DEPLOYING MENTOS TOKEN
# forge create MentosToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 
echo "----------------------------------------------------------------------------------"
echo DEPLOYING STAKING CONTRACT
# forge create MentosToken --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --verify 