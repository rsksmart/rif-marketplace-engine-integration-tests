const Migrations = artifacts.require("Migrations");
const MarketPlace = artifacts.require("Marketplace");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MarketPlace,true,true,true,true,true,true,true);
};
