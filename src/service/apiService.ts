import axios, { AxiosResponse } from "axios";

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5'
const API_KEY: string = '64909afff512317e0b0f359e2ea476e1'

export const WeatherForecastApiService = async (lat: number, lon: number): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        return response.data
    } catch (error) {
        throw new Error("API Error:" + error)
    }
}

export const WeatherLocationApiService = async (lat: number, lon: number): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        return response.data
        
    } catch (error) {
        throw new Error("API Error:" + error)
    }
}

export const WeatherQueryApiService = async (query: string): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/weather?q=${query}&appid=${API_KEY}&units=metric`)
        return response.data
    } catch (error) {
        throw new Error("API Error:" + error)
    }
}