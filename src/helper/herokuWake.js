const axios = require("axios").default;

const wakeDyno = (url, options = {}) => {
	const { interval = 29, logging = true } = options;
	const milliseconds = interval * 60000;

	setTimeout(() => {
		axios.get(url)
			.then((res) => logging && console.log(res.statusText))
			.catch(() => logging && console.log('Error attempting to wake the dyno'))
			.finally(() => wakeDyno(url, options));

	}, milliseconds);
};

module.exports = { wakeDyno };
