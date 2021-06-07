import axios, { AxiosInstance } from "axios"

export default class BallChasingApi {
	instance: AxiosInstance

	public constructor() {
		this.instance = axios.create({
			baseURL: "https://localhost:44356/BallChasingApi/",
			timeout: 30000,
		})
	}
}
