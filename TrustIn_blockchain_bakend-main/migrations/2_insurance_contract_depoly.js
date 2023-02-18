const cont = artifacts.require("InsuranceContract");

module.exports = function (deployer) {
  deployer.deploy(cont);
};