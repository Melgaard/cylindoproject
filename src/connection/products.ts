const axios = require('axios').default;

async function GetProductFrames(product: string ,frame: number) {
	const res = await axios.get(`https://content.cylindo.com/api/v2/4404/products/${product}/frames/${frame}/`, { responseType: 'blob' });
	return URL.createObjectURL(res.data);
}

export {
	GetProductFrames
};