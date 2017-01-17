pragma solidity ^0.4.0;

contract RegisterDrupal {

  // Mapping that matches Drupal generated hash with Ethereum Account address.
  mapping (string => address) _accounts;

  address _registryAdmin;

  // Allowed to administrate accounts only, not everything
  address _accountAdmin;

  // If a newer version of this registry is available, force users to use it
  bool _registrationDisabled;

  // Event allowing listening to newly signed Accounts (?)
  event AccountCreatedEvent (address indexed from, string indexed hash, string error);

  function accountCreated(address from, string hash, string error) {
    AccountCreatedEvent(from, hash, error);
  }

  // Register Account
  function newUser(string drupalUserHash) public {

    if (_accounts[drupalUserHash] == msg.sender) {
      // Hash allready registered to address.
      accountCreated(msg.sender, drupalUserHash, "-1");
    }
    else if (_accounts[drupalUserHash] > 0) {
      // Hash allready registered to different address.
      accountCreated(msg.sender, drupalUserHash, "-2");
    }
     else if (bytes(drupalUserHash).length >= 64) {
      // Hash too long
      accountCreated(msg.sender, drupalUserHash, "-3");
    }
    else if (_registrationDisabled){
      // Registry is disabled because a newer version is available
      accountCreated(msg.sender, drupalUserHash, "-4");
    }
    else {
      _accounts[drupalUserHash] = msg.sender;
      accountCreated(msg.sender, drupalUserHash, "0");
    }
  }

  function validateUserByHash (string drupalUserHash) constant returns (address result){
      return _accounts[drupalUserHash];
  }

  function RegisterDrupal() {
    _registryAdmin = msg.sender;
    _accountAdmin = msg.sender; // can be changed later
    _registrationDisabled = false;
  }

  function adminSetRegistrationDisabled(bool registrationDisabled) {
    // currently, the code of the registry can not be updated once it is
    // deployed. if a newer version of the registry is available, account
    // registration can be disabled
    if (msg.sender == _registryAdmin) {
      _registrationDisabled = registrationDisabled;
    }
  }

  function adminSetAccountAdministrator(address accountAdmin) {
    if (msg.sender == _registryAdmin) {
      _accountAdmin = accountAdmin;
    }
  }

  function adminRetrieveDonations() {
    if (msg.sender == _registryAdmin) {
      if (!_registryAdmin.send(this.balance))
        throw;
    }
  }

  function adminDeleteRegistry() {
    if (msg.sender == _registryAdmin) {
      suicide(_registryAdmin); // this is a predefined function, it deletes the contract and returns all funds to the admin's address
    }
  }

}
