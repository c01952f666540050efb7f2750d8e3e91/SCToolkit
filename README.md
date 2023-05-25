# Smart Contract Toolkit

SC Toolkit is something I'm building in the process of learning about smart contracts. Hoping I can share some of what I've built and hoping it can be useful to you going forward.

Please consider that the foundry-rs is the root of the folder. You can run all the foundry related commands here.

### Current Bugs

- Can only seem to use (--use) -> 0.8.19, will need to check how if that can be changed, or if I had just added in the versions too liberally for another project I was doing
- Update the navbar, so that it shows a dropdown for the send/receive buttons


### Next Steps
- Add transaction search via blockscan API
- Add xpub scan for UTXO users (BTC)
- add xpub scan for UTXO users of non BTC related assets
- Add Custom function call for a contract with 
- Adding the correct unit tests for this challenge
- Complete the challenge

## Install

Installs one or more dependencies.

```
forge install
```

HELP: https://book.getfoundry.sh/reference/forge/forge-install

## Test

Performs all the unit tests.

```
forge test
```

HELP: https://book.getfoundry.sh/reference/forge/forge-test

## Deploy

You can either run the script that I run that deploys all the relevant scripts:

```
./shell/init.sh
```

Or you can deploy them all separately via:

```
forge create [options] contract
```

HELP: https://book.getfoundry.sh/reference/forge/forge-create

## Frontend

You can deploy the frontend via:

```
cd frontend
npm run dev
```
