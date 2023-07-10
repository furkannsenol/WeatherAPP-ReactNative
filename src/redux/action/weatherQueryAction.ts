import { Dispatch } from 'redux';
import { WeatherQueryApiService } from '../../service/apiService'
import * as actionTypes from './actionTypes'

const getWeatherQueryRequest = (): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_QUERY_REQUEST
})

const getWeatherQuerySuccess = (data?: any): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_QUERY_SUCCESS,
    payload: data
})

const getWeatherQueryError = (error: unknown): actionTypes.IAction => ({
    type: actionTypes.GET_WEATHER_QUERY_ERROR,
    payload: typeof error === "string" ? error : null
})

export const getWeatherQuery = (query: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(getWeatherQueryRequest())
        try {
            const data = await WeatherQueryApiService(query)
            dispatch(getWeatherQuerySuccess(data))

        } catch (error) {
            dispatch(getWeatherQueryError(error))
        }
    }
}