import { Dispatch } from 'react'
import { WeatherForecastApiService } from '../../service/apiService'
import * as actionTypes from './actionTypes'

const getWeatherForecastRequest = (): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_FORECAST_REQUEST
})

const getWeatherForecastSuccess = (data?: any): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_FORECAST_SUCCESS,
    payload: data
})

const getWeatherForecastError = (error: unknown): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_FORECAST_ERROR,
    payload: typeof error === "string" ? error : null
})

export const getWeatherForecast = (lat: number, lon: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getWeatherForecastRequest())
        try {
            const data = await WeatherForecastApiService(lat, lon)
            dispatch(getWeatherForecastSuccess(data))

        } catch (error) {
            dispatch(getWeatherForecastError(error))
        }
    }

}