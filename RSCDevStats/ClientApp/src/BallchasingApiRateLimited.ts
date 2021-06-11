import axios, { AxiosInstance } from "axios"

const MAX_REQUESTS_COUNT = 1
const INTERVAL_MS = 100
let PENDING_REQUESTS = 0

export default class BallChasingApiRateLimited {
	instance: AxiosInstance

	public constructor() {
		this.instance = axios.create({
			baseURL: "https://localhost:44356/BallChasingApi/",
			timeout: 30000,
		})

		/**
		 * Axios Request Interceptor
		 */
		this.instance.interceptors.request.use(function (config) {
			return new Promise((resolve, reject) => {
				let interval = setInterval(() => {
					if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
						PENDING_REQUESTS++
						clearInterval(interval)
						resolve(config)
					}
				}, INTERVAL_MS)
			})
		})

		/**
		 * Axios Response Interceptor
		 */
		this.instance.interceptors.response.use(
			function (response) {
				PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
				return Promise.resolve(response)
			},
			function (error) {
				PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
				return Promise.reject(error)
			}
		)
	}
}
