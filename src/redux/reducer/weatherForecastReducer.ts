import { IWeatherForecastData } from '../../model/forecastData';
import { IWeatherData } from '../../model/weatherData';
import * as actionTypes from '../action/actionTypes';
import { IAction } from '../action/actionTypes';


interface IState {
    weatherForecast: IWeatherForecastData[],
    loading: boolean,
    error: string | null
}

const initialState: IState = {
    weatherForecast: [],
    loading: false,
    error: null,
};

const weatherForecastReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.GET_WEATHER_FORECAST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_WEATHER_FORECAST_SUCCESS:
            return {
                ...state,
                weatherForecast: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.GET_WEATHER_FORECAST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default weatherForecastReducer;
