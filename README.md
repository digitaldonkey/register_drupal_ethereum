# Register Drupal - Example Ethereum account verification

This repository contains a very simple registry smart contract which is used in the Drupal Ethereum module. 

It allows the PHP Application (Drupal) to verify a visitors Blockchain address. 

**Summing up the flow**

* Drupal creates a 32 bit hash
* The visitor "submits" this hash to the registry (this contract) using Metamask as a transaction signer `newUser(bytes32 drupalUserHash)`. Drupal will also save the Ethereum address the user **claims to own**.
* Drupal can now call `validateUserByHash (bytes32 drupalUserHash)`. If the If the hash has been submitted with the users claimed address Drupal has a **proof that the user actually owns** the private key to sign this transaction. 

You might easily turn this into a simple paywall contract. 

**Development with truffle**

Requires truffle 4.X

Next to this contract there is a simple app to interact with the contract or modify it. 

See *quickstart* below or http://truffleframework.com 

## The Smart Contract
contains a simple registry mapping a hash to a Ethereum Address
A CMS like Drupal generates a hash for their users to approve an blockchain account.

The user is required to sign the "Registry transaction" with his blockchain key. The signing process can take place in web browsers or on mobile devices.

To sign a transaction in the browser you need a _transaction signer_ like the [Metamask](https://metamask.io/) Chrome/Firefox plug-in.

```
contracts/RegisterDrupal.sol
```
The Contract language is [Solidity](https://solidity.readthedocs.io/en/develop/).

Solidity has a great tool you may use to develop and deploy out of the browser called [REMIX](http://remix.ethereum.org). You will also need Metamask to do so. 


## Quickstart with Truffle

Install NPM
https://docs.npmjs.com/getting-started/installing-node

Install Truffle
http://truffleframework.com/docs/getting_started/installation

```
npm install -g truffle
```
Install dependencies

```
npm install 
```

Start truffle console (previously testrpc)

```
truffle develop
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
[ .... ]
Private Keys:
(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
[ .... ]
```
This will start a local blockchain running at http://localhost:9545
Make sure to you set the Network in Metamask to this custom network address.

In truffle you can now build and deploy the contract:

```
truffle(develop)> compile
``` 

and migrate the Contracts. This will save the Contract meta information (artifacts) into `build/contracts` too.

```
truffle(develop)> migrate
Using network 'develop'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xd045bbc33fecb5352b5c01f9443d87df21287734abb499492e4dffb3be74bd62
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing RegisterDrupal...
  ... 0x992b104ddf616b5debce348d50f50193f76db94c00044f3c2c201bb51fffeece
  RegisterDrupal: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...
``` 

Note:
* If your get an Error `Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc13a92c0a6da92698644c0 is not a contract address` you might need to delete `build/contracts/*.json`
* After restarting the development network you might get a nounce related error. Metamask tracks the TX on your account, if you reset the network you also need to reset the account in Metamask (settings Reset account).

Now keep the truffle console open (it's your local blockchain) and start the app 

```
npm run dev

> truffle-init-webpack@0.0.2 dev /Users/tho/htdocs/register_drupal_ethereum/register_drupal_update
> webpack-dev-server

Project is running at http://localhost:8081/
webpack output is served from /
Hash: f36739e2f122fef70704
Version: webpack 2.7.0
Time: 1466ms
                   Asset       Size  Chunks                    Chunk Names
                  app.js    1.67 MB       0  [emitted]  [big]  main
              index.html    1.16 kB          [emitted]
                 app.css  595 bytes          [emitted]
images/drupal-8-logo.svg    1.24 kB          [emitted]
chunk    {0} app.js (main) 1.65 MB [entry] [rendered]
   [71] ./app/javascripts/app.js 4.86 kB {0} [built]
   [72] (webpack)-dev-server/client?http://localhost:8081 7.91 kB {0} [built]
   [73] ./build/contracts/RegisterDrupal.json 51.3 kB {0} [built]
  [109] ./~/loglevel/lib/loglevel.js 7.86 kB {0} [built]
  [117] ./~/strip-ansi/index.js 161 bytes {0} [built]
  [154] ./~/truffle-contract-schema/index.js 5.4 kB {0} [built]
  [159] ./~/truffle-contract/index.js 2.64 kB {0} [built]
  [193] ./~/url/url.js 23.3 kB {0} [built]
  [194] ./~/url/util.js 314 bytes {0} [built]
  [195] ./~/web3/index.js 193 bytes {0} [built]
  [229] (webpack)-dev-server/client/overlay.js 3.67 kB {0} [built]
  [230] (webpack)-dev-server/client/socket.js 1.08 kB {0} [built]
  [231] (webpack)/hot nonrecursive ^\.\/log$ 160 bytes {0} [built]
  [232] (webpack)/hot/emitter.js 77 bytes {0} [built]
  [233] multi (webpack)-dev-server/client?http://localhost:8081 ./app/javascripts/app.js 40 bytes {0} [built]
     + 219 hidden modules
webpack: Compiled successfully.
```
This will start a local webserver at [http://localhost:8081](http://localhost:8081).