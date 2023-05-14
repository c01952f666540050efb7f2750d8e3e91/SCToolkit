# Get ABI for Tokens 

echo "Getting ABI for $1"
forge inspect src/$1.sol:$1 abi > abi/$1.json
echo "Written to abi/$1.json"