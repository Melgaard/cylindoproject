const axios = require('axios').default;

async function Archibald(frame: number) {
	const res = await axios.get(`https://content.cylindo.com/api/v2/4404/products/ARCHIBALDCHAIR/frames/${frame}/`, { responseType: 'blob' });
	return URL.createObjectURL(res.data);
}

export {
	Archibald
};