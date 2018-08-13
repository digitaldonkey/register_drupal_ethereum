// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  deploy: [
    "RegisterDrupal"
  ],
  networks: {
    development: {
      host: '192.168.99.100',
      port: 8545,
      network_id: '5777' // Match any network id
    },
    local: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    staging: {
      host: "localhost",
      port: 8546,
      network_id: 1337
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: 3
    }
  }
}
