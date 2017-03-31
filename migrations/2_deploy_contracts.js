var RegisterDrupal = artifacts.require("RegisterDrupal");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(RegisterDrupal);
};
