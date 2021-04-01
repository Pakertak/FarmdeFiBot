const axios = require("axios");

const request = async url => {
  try {
    const response = await axios(url);
    const data = response.data;
		return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = request;