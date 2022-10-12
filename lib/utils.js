const validateData = ({ client_id, incident_desc, city, country }) => {
	return (
		typeof client_id === 'number' ||
		typeof incident_desc === 'string' ||
		typeof city === 'string' ||
		typeof country === 'string'
	);
};

module.exports = { validateData };
