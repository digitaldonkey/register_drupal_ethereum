var DefaultBuilder = require("truffle-default-builder");

module.exports = {
   build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  }),
  deploy: [
    "RegisterDrupal"
  ],
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
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
};
