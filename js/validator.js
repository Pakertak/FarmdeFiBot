// documentation: https://web3js.readthedocs.io/en/v1.2.0/web3-utils.html#tochecksumaddress
const 
	web3 = require('web3'),
	validators = {
		/*
			Checks if a given string is a valid Ethereum address. 
			It will also check the checksum, if the address has upper and lowercase letters.
			@params string - address
			@returns boolean
		*/
		'isAddress': web3.utils.isAddress,

		/*
			Checks the checksum of a given address. Will also return false on non-checksum addresses.
			@params string - address
			@returns boolean	
		*/
		'checksumAddress': web3.utils.checkAddressChecksum
	};

	/*
		Will convert an upper or lowercase Ethereum address to a checksum address.
		@params string - address
		@returns boolean
	*/
	// web3.utils.toChecksumAddress(address);



module.exports = function (address, param) {
	return validators[param](address);
};