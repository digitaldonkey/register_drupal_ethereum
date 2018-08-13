/* eslint-env browser */

const contract = require('truffle-contract')
const Web3 = require('web3')

let account, accountCreatedFilter, registerDrupalDeployed, allEvents

// Import our contract artifacts and turn them into usable abstractions.
import registerDrupalArtifacts from '../../build/contracts/RegisterDrupal.json'

/**
 * Init web3
*/
window.addEventListener('load', () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.log('Found injected web3')
    web3 = new Web3(web3.currentProvider)
  }
  else {
    console.log('Could not find injected web3. You should consider trying MetaMask!')
    setStatus('Could not find injected web3. You should consider trying MetaMask!')
    // const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  startApp()
})

/**
 * Main App.
 */
function startApp() {
  const address = document.getElementById('contract-address')
  const RegisterDrupal = contract(registerDrupalArtifacts)

  console.log('startApp()')

  RegisterDrupal.setProvider(web3.currentProvider)

  web3.eth.getAccounts((err, accounts) => {
    // Account validation.
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }
    if (accounts && accounts.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }
    account = accounts[0]

    // The RegisterDrupal Smart Contract.
    RegisterDrupal.deployed().then((instance) => {
      registerDrupalDeployed = instance
      address.innerHTML = registerDrupalDeployed.address

      // Event listener for account creation.
      return registerDrupalDeployed
    }).then((contract) => {

      accountCreatedFilter = contract.AccountCreated().watch((error, result) => {
        // console.log('AccountCreated', [error, result])
        if (!error) {
          setStatus(
              `<strong>emited event AccountCreated</strong> <em>"Created account successfully"</em> <br /> 
               TX hash: <small>${result.transactionHash} </small><br /> 
               Account: <small>${result.args.from} </small><br />
               Hash: <small>${result.args.hash} </small><br />
              `, true
          )
          console.log('AccountCreated', result.args)
        }
        else {
          setStatus('ERROR see console', false)
          console.log(error)
        }
      })
    })
    generateHash()
  })
}

/* HELPER to update DOM */
function setStatus(message, success) {
  const status = document.getElementById('status')
  let thisMessage = document.createElement('div')
  thisMessage.innerHTML = `<span class="time">${new Date().toLocaleTimeString() }</span> ${message}`

  if (success) {
    thisMessage.className = 'success'
  }
  else {
    thisMessage.className = 'error'
  }
  status.insertBefore(thisMessage, status.firstChild)
}

/* Generating an "Drupal hash" */
function _makeid() {
  let text = ''
  let i
  const possible = 'abcdef0123456789'
  for (i = 0; i < 64; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
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
  const hashInput = document.getElementById('hash')
  const theHash = _makeid()
  setStatus(`<strong>Created new hash</strong> <br />Hash: <small>0x${theHash}</small>`, true)
  hashInput.value = theHash
}
window.generateHash = generateHash

/**
 * registerAccount
 *
 * This calls the newUser(bytes32 drupalUserHash) function of the contract.
 * User will be asked to sign this Solidtity function call using Metamask.
 */
function registerAccount() {
  // HASH - will be provided by the WebApp to register to. E.g: Drupal.
  const theHash = document.getElementById('hash').value

  registerDrupalDeployed.newUser(theHash, { from: account }).then(function (tx) {
    return tx
  })
  .then((tx) => {
    setStatus(
        `<strong>Transaction</strong> <em>"Registered Account address"<em/><br/>
         TX hash: <small>${tx.tx}</small> 
        `, true)
  }).catch(function (e) {

    if (e.message.search(/user denied/i)) {
      setStatus('User denied signature.')
    }
    else {
      setStatus('Error @registerAccount. See console')
    }
    console.log(e)
  })
}
window.registerAccount = registerAccount

/**
 * validateAccount
 *
 * This calls the validateUserByHash (bytes32 drupalUserHash) function of the contract.
 * This is a constant function, so no signature required here.
 */
function validateAccount(hash) {
  if (typeof hash === 'undefined') {
    hash = document.getElementById('hash').value
  }
  console.log(hash, 'hash@validateAccount')

  registerDrupalDeployed.validateUserByHash(hash, { from: account })
  .then(function (address) {
    // On a successful cal success must be 0.
    console.log(address, 'address@validateUserByHash')
    if (account === address) {
      setStatus(`<strong>Validated </strong> <em><small>0x${hash}</small></em> <br />
                 Submitting account <small>${address}</small>`, true)
    }
    else {
      setStatus(`<strong>Validated </strong> <em><small>0x${hash}</small></em> <br />
                No address found for hash.`, false)
    }
  }).catch(function (e) {
    setStatus('ERROR see console.')
    console.log(e)
  })
}
window.validateAccount = validateAccount

