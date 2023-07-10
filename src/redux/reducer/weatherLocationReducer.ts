import { IWeatherData } from '../../model/weatherData';
import * as actionTypes from '../action/actionTypes';
import { IAction } from '../action/actionTypes';


interface IState {
    weatherLocation: IWeatherData[],
    loading: boolean,
    error: string | null
}

const initialState: IState = {
    weatherLocation: [],
    loading: false,
    error: null,
};

const weatherLocationReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.GET_WEATHER_LOCATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_WEATHER_LOCATION_SUCCESS:
            return {
                ...state,
                weatherLocation: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.GET_WEATHER_LOCATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default weatherLocationReducer;
