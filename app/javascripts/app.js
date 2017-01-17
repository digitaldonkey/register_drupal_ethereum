var accounts;
var account;
var accountCreatedEvent;
var registerDrupal;
var events;


function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};



function generateHash() {
  var hashInput = document.getElementById("hash");
      hashInput.value = _makeid();
};




function registerAccount() {

  var hashInput = document.getElementById("hash").value;
  console.log(hashInput, 'hashInput');

  registerDrupal.newUser(hashInput, {from: account}).then(function(tx) {

    console.log(tx , 'tx');

    return tx;
  })
  .then(function(tx) {
    // On a sucessful call success must be 0.

    console.log(tx , 'tx2');
    return web3.eth.getTransactionReceipt(tx);
  })
  .then(function(recipt){
      console.log(recipt , 'recipt');
    }
  ).catch(function(e) {

    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};



function validateAccount(hash) {
    if (typeof hash === 'undefined') {
      hash = document.getElementById("hash").value;
    }
    console.log(hash, 'hash @ validateAccount');

  registerDrupal.validateUserByHash(hash, {from: account}).then(function(address) {
    // On a sucessful cal success must be 0.
    console.log(address , 'address@validateUserByHash');

    // TODO

  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};



function _makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    registerDrupal = RegisterDrupal.deployed();

    console.log(registerDrupal, 'registerDrupal');
    console.log(registerDrupal.address, 'registerDrupal.address');

    // var ClientReceipt = web3.eth.contract(registerDrupal.abi);
    // var clientReceipt = ClientReceipt.at(registerDrupal.address);

    accountCreatedEvent = RegisterDrupal.at(registerDrupal.address).AccountCreatedEvent();


    events = RegisterDrupal.at(registerDrupal.address).allEvents();

    // watch for changes
    events.watch(function(error, event){

      console.log('WATCH ALL triggered.');

    var SolidityCoder = require("web3/lib/solidity/coder.js");
    console.log(SolidityCoder, 'SolidityCoder');


      if (!error)
        console.log(event);
        console.log(event.type);
    });


//     console.log(accountCreatedEvent, 'accountCreatedEvent');

    accountCreatedEvent.watch(function(error, result){


      console.log('accountCreatedEvent triggered.');
      console.log(event.type);

      // result will contain various information
      // including the argumets given to the Deposit
      // call.
      if (!error) {
        console.log(result);
      }
      else {
        console.log(error);
      }

    });

    generateHash();
  });
}

