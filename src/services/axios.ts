import axios, { AxiosResponse } from "axios";

const instance = axios.create({
	baseURL: `https://${process.env.VUE_APP_URL}/`,
});

export const scrapePromiseResData = <T>(res: Promise<AxiosResponse<T>>): Promise<T> => {
	return new Promise<T>((resolve, reject) => {
		res.then((res) => {
			resolve(res.data);
		}).catch((err) => {
			reject(err);
		});
	});
};

export default instance;
