# Register Drupal - Example Ethereum account verification

Note:
This is a Ethereum Smart Contract for hash verification with PHP based CMS Drupal.

For development see
http://truffleframework.com/

**Requires truffle 4.X**

## The Smart Contract
contains a simple registry mapping a hash to a Ethereum Address
A CMS like Drupal generates a hash for their users to approve an blockchain account.

The User is required to sign the "Registry transaction" with his blockchain key.
The signing process can take place in web browsers or on mobile devices.
So the user needs a web3 bases transaction signer like the Metamask Chrome/Firefox plug-in.

```
contracts/RegisterDrupal.sol
```
The Contract language is Solidity
Learn more: https://solidity.readthedocs.io/en/develop/


You may

* use truffle and ganache to start in browser development.
* change and deploy from online in the Browser using the Online Solidity compiler
* deploy to  Ganache, Ethereum "Ropsten" test net or even to Ethereum main net

http://remix.ethereum.org

In combination with the amazing Metamask Browser plug-in Metamask

https://metamask.io/


## Quickstart

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
