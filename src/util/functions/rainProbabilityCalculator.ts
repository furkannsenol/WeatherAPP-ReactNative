import { IWeatherData } from "../../model/weatherData";

export const rainProbabilityCalculator = (weather: IWeatherData) => {
    const weatherCode = weather.weather && weather.weather[0]?.id || 0;

    const isRainy = weatherCode >= 200 && weatherCode < 600;

    const rainProbability = isRainy ? 100 : 0;

    return rainProbability
}

