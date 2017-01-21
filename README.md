# Register Drupal - Example Ethereum account verification

Note:
This is a Ethereum Smart Contract for hash verification with PHP based CMS Drupal.

For development see
http://truffleframework.com/


## Quickstart

Install NPM
https://docs.npmjs.com/getting-started/installing-node

Install Truffle
http://truffleframework.com/docs/getting_started/installation

For development you may use testrpc, which is a local Ethereum testing node.
https://github.com/ethereumjs/testrpc

```
truffle migrate && truffle serve
```
http://localhost:8080/



## The Smart Contract

```contracts/RegisterDrupal.sol```

Is a simple registry. The Idea: a CMS generates a hash to connect an account to a blockchain account.
The User can use in Browser Transaction signers like Metamask to sign the "Registry transaction".

The Contract language is Solidity
Learn more: https://solidity.readthedocs.io/en/develop/



You may

* use truffle and testrpc to start in browser development.

* change and deploy from online in the Browser using the Online Solidity compiler:

http://ethereum.github.io/browser-solidity

In combination with the amazing Metamask Browser plug-in Metamask

https://metamask.io/


this to Ethereum "Ropsten" test net or even to Mainnet using:

