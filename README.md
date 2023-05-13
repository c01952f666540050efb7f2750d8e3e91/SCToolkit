# Decentralised Staking 

A small project I made to recreate the functionality of scaffold ETH.

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