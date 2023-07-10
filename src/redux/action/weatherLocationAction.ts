import { Dispatch } from 'react'
import { WeatherLocationApiService } from '../../service/apiService'
import * as actionTypes from './actionTypes'

const getWeatherLocationRequest = (): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_LOCATION_REQUEST
})

const getWeatherLocationSuccess = (data?: any): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_LOCATION_SUCCESS,
    payload: data
})

const getWeatherLocationError = (error: unknown): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_LOCATION_ERROR,
    payload: typeof error === "string" ? error : null
})

export const getWeatherLocation = (lat: number, lon: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getWeatherLocationRequest())
        try {
            const data = await WeatherLocationApiService(lat, lon)
            dispatch(getWeatherLocationSuccess(data))

        } catch (error) {
            dispatch(getWeatherLocationError(error))
        }
    }

}