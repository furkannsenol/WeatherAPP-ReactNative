import { IWeatherData } from '../../model/weatherData';
import * as actionTypes from '../action/actionTypes';
import { IAction } from '../action/actionTypes';

interface IState {
    weatherQuery: IWeatherData[],
    loading: boolean,
    error: string | null
}

const initialState: IState = {
    weatherQuery: [],
    loading: false,
    error: null,
};

const weatherQueryReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.GET_WEATHER_QUERY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_WEATHER_QUERY_SUCCESS:
            return {
                ...state,
                weatherQuery: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.GET_WEATHER_QUERY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default weatherQueryReducer;
