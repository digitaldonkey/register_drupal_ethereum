var contract = require('truffle-contract');
var Web3 = require('web3');

var accounts;
var account;
var accountCreatedEvent;
var registerDrupalDeployed;

// Import our contract artifacts and turn them into usable abstractions.
import registerDrupalArtifacts from '../../build/contracts/RegisterDrupal.json';

/**
 * Init web3
*/
window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.log('Found injected web3');
    web3 = new Web3(web3.currentProvider);
  }
  else {
    console.log('Could not find injected web3. You should consider trying MetaMask!');
    setStatus('Could not find injected web3. You should consider trying MetaMask!');
    // var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  startApp();
});


/**
 * Main App.
 */
function startApp() {
  console.log('startApp()');

  var address = document.getElementById("contract-address");
  var RegisterDrupal = contract(registerDrupalArtifacts);

  RegisterDrupal.setProvider(web3.currentProvider);

  web3.eth.getAccounts(function(err, accs) {

    // Account validation.
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

    // The RegisterDrupal Smart Contract.
    RegisterDrupal.deployed().then(function(instance) {
      registerDrupalDeployed = instance;
      address.innerHTML = registerDrupalDeployed.address;

      // Event listener for account creation.
      return registerDrupalDeployed.AccountCreatedEvent();

    }).then(function(result) {

        accountCreatedEvent = result;



        accountCreatedEvent.watch(function(error, result){
          console.log(result, 'accountCreatedEvent triggered.');
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
      });
    generateHash();
  });
}


/* HELPER to update DOM */
function setStatus(message, success) {
  var status = document.getElementById("status");
    if (success) {
      status.className = 'success';
    }
    else {
      status.className = 'error';
    }
  status.innerHTML = message;
};


/* Generating an "Drupal hash" */
function _makeid() {
    var text = "";
    var possible = "ABCDEF0123456789";
    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/**
 * Generate a random hash
 *
 * We will ask the user to "submit" this hash to the registry "_accounts".
 * We will store an array in the Blockchain:
 *    _accounts[drupalUserHash] === <ETHEREUM ADDRESS of the registrant>
 *
 */
function generateHash() {
  var hashInput = document.getElementById("hash");
  var theHash = _makeid();
  setStatus('Generated new Hash: ' +  theHash, true)
  hashInput.value = theHash;

};
window.generateHash = generateHash;

/**
 * registerAccount
 *
 * This calls the newUser(bytes32 drupalUserHash) function of the contract.
 * User will be asked to sign this Solidtity function call using Metamask.
 */
function registerAccount() {
  // HASH - will be provided by the WebApp to register to. E.g: Drupal.
  var theHash = document.getElementById("hash").value;

  registerDrupalDeployed.newUser(theHash, {from: account}).then(function(tx) {
    return tx;
  })
  .then(function(tx){
    setStatus('Registered Account address: <br/>' +  account + '<br/>With hash:<br/>' + theHash, true)
  }).catch(function(e) {
    setStatus("Error @registerAccount. See console");
    console.log(e);
  });
};
window.registerAccount = registerAccount;


/**
 * validateAccount
 *
 * This calls the validateUserByHash (bytes32 drupalUserHash) function of the contract.
 * This is a constant function, so no signature required here.
 */
function validateAccount(hash) {
    if (typeof hash === 'undefined') {
      hash = document.getElementById("hash").value;
    }
    console.log(hash, 'hash @ validateAccount');

  registerDrupalDeployed.validateUserByHash(hash, {from: account})
  .then(function(address) {
    // On a sucessful cal success must be 0.
    console.log(address , 'address@validateUserByHash');
    if (account === address) {
      setStatus('The address submitted with the hash  "' + hash +'" is "' + address + '"', true);
    }
    else {
      setStatus('No adress found for hash.', false);
    }

  }).catch(function(e) {
    setStatus("ERROR see console.");
    console.log(e);
  });
};
window.validateAccount = validateAccount;

