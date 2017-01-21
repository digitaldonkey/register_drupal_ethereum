# Register Drupal - Example Ethereum account verification

Note:
This is a Ethereum Smart Contract for hash verification with PHP based CMS Drupal.

For development see
http://truffleframework.com/


## The Smart Contract
contains a simple registry mapping a hash to a Ethereum Address
A CMS like Drupal generates a hash for their users to approve an blockchain account.

The User is required to sign the "Registry transaction" with his blockchain key.
The signing process can take place in web browsers or on mobile devices.
So the user needs a web3 bases transaction signer like the Metamask Chrome plug-in. 

```
contracts/RegisterDrupal.sol
```
The Contract language is Solidity
Learn more: https://solidity.readthedocs.io/en/develop/


You may

* use truffle and testrpc to start in browser development.
* change and deploy from online in the Browser using the Online Solidity compiler
* deploy to  testrpc, Ethereum "Ropsten" test net or even to Ethereum main net



http://ethereum.github.io/browser-solidity

In combination with the amazing Metamask Browser plug-in Metamask

https://metamask.io/





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
