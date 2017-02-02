var testhash = '8490BBB2D0D369107F6F5CF6B34BFC4D';

contract('RegisterDrupal', function(accounts) {

  it("REGISTER A USER", function() {
    var meta = RegisterDrupal.deployed();

    return meta.newUser(testhash, {from: accounts[0]}).then(function(tx) {

      meta.validateUserByHash(testhash, {from: accounts[0]}).then(function(address) {
        assert.equal(address, accounts[0]);
      });

    });

  });
});
