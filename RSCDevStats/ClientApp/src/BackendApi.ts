import axios, { AxiosInstance } from "axios"

export default class BackendApi {
	instance: AxiosInstance

	public constructor() {
		this.instance = axios.create({
			baseURL: "https://localhost:44356/",
			timeout: 30000,
		})
	}
}
