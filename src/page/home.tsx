import { StyleSheet, Text, View, Image, FlatList, StatusBar, TouchableOpacity, ScrollView, RefreshControl, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeContainer from '../container/homeContainer'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store/configureStore';
import { Dispatch } from 'redux';
import { IWeatherData } from '../model/weatherData';
import { timeConverter } from '../util/functions/timeConverter';
import { rainProbabilityCalculator } from '../util/functions/rainProbabilityCalculator';
import HourlyWeatherItem from '../component/hourlyWeatherItem'
import { getWeatherLocation } from '../redux/action/weatherLocationAction'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getUserLocation } from '../service/locationService'
import { getWeatherForecast } from '../redux/action/weatherForecastAction'
import { IWeatherForecastData } from '../model/forecastData'

const Home: React.FC = () => {
    //ScreenHeight
    const insets = useSafeAreaInsets()
    const statusBarHeight: number = insets.top + (StatusBar.currentHeight || 0);
    const screenHeight: number = (Dimensions.get('screen').height) - statusBarHeight

    //dispatch
    const dispatch: Dispatch<any> = useDispatch()
    //useSelector
    const weather: IWeatherData = useSelector((state: RootState) => state.weatherLocationReducer.weatherLocation)
    const loading: boolean = useSelector((state: RootState) => state.weatherLocationReducer.loading)
    const weatherForecast: IWeatherForecastData = useSelector((state: RootState) => state.weatherForecastReducer.weatherForecast)

    const checkAndFetchLocation = async () => {
        const { latitude, longitude } = await getUserLocation();
        dispatch(getWeatherLocation(latitude, longitude))
        dispatch(getWeatherForecast(latitude, longitude))
        console.log('hop burdasın')
    }

    useEffect(() => {
        checkAndFetchLocation();
    }, []);

    //Weather Data Convert
    const rainProbability = rainProbabilityCalculator(weather)
    const { dateTime, forecastDataDate } = timeConverter(weather.dt, weather.timezone)

    //Refresh Process
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        checkAndFetchLocation();
        setRefreshing(false);
    };

    //Render Item
    interface myData {
        v1: number,
        v2: string,
        v3: string
    }
    const forecast: myData[] = [
        { v1: 8, v2: 'https://openweathermap.org/img/wn/10d@2x.png', v3: "00:00" },
        { v1: 8, v2: 'https://openweathermap.org/img/wn/11d@2x.png', v3: "03:00" },
        { v1: 8, v2: 'https://openweathermap.org/img/wn/09d@2x.png', v3: "06:00" },
        { v1: 10, v2: 'https://openweathermap.org/img/wn/13d@2x.png', v3: "09:00" },
        { v1: 5, v2: 'https://openweathermap.org/img/wn/02n@2x.png', v3: "12:00" },
        { v1: 8, v2: 'https://openweathermap.org/img/wn/04n@2x.png', v3: "15:00" },
        { v1: 8, v2: 'https://openweathermap.org/img/wn/10d@2x.png', v3: "18:00" },
        { v1: 8, v2: 'https://openweathermap.org/img/wn/10d@2x.png', v3: "21:00" },
    ]
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const renderItem = ({ item, index }: { item: myData, index: number }) => {
        return (
            <TouchableOpacity onPress={() => setSelectedItem(index)}>
                <View style={[styles.itemContainer, index === selectedItem && styles.selectedItemContainer]}>
                    <Text style={{ color: '#f3f3f3', fontSize: 16, fontWeight: '600' }}>°</Text>
                    <Image source={{ uri: item.v2, height: 75, width: 75 }} />
                    <Text style={[{ color: '#869DA4', fontSize: 14, fontWeight: '600' }, index === selectedItem && { color: '#f3f3f3' }]} ></Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <HomeContainer>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight }}>
                        <ActivityIndicator size='large' />
                    </View>
                ) : (
                    <><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#f3f3f3', fontSize: 25, fontWeight: '900' }}>{weather.name}, <Text style={{ color: '#f3f3f3', fontSize: 25, fontWeight: '700' }}>{weather?.sys?.country}</Text></Text>
                            <Text style={{ paddingTop: 5, color: '#869DA4', fontSize: 15, fontWeight: '700' }}>{dateTime}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => checkAndFetchLocation()}>
                            <MaterialCommunityIcons name='crosshairs-gps' size={24} color='#869DA4' />
                        </TouchableWithoutFeedback>
                    </View><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 30 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ color: '#f3f3f3', fontSize: 60, fontWeight: 'bold', lineHeight: 60 }}>{weather?.main?.temp.toFixed(1)}°</Text>
                                <Text style={{ paddingTop: 0, color: '#869DA4', fontSize: 15, textTransform: 'capitalize', fontWeight: '700' }}>{weather?.weather?.map((it) => it.description)}</Text>
                            </View>
                            <Image source={{ uri: `https://openweathermap.org/img/wn/${weather?.weather?.map((it) => it.icon)}@4x.png`, width: 150, height: 150 }} />
                        </View><View style={{
                            backgroundColor: '#17224A', height: 100, borderRadius: 10, marginHorizontal: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 6, }, shadowOpacity: 0.39, shadowRadius: 8.30, elevation: 13,
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 40
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name='weather-windy' size={24} color='white' />
                                <Text style={{ color: '#f3f3f3', paddingTop: 5, fontWeight: '700' }}>{weather?.wind?.speed.toFixed(1)} m/s</Text>
                                <Text style={{ color: '#869DA4', fontSize: 13, fontWeight: '600' }}>Wind</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name='water' size={24} color='aqua' />
                                <Text style={{ color: '#f3f3f3', paddingTop: 5, fontWeight: '700' }}>{weather?.main?.humidity.toString().padStart(2, '0')}%</Text>
                                <Text style={{ color: '#869DA4', fontSize: 13, fontWeight: '600' }}>Humidty</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name='umbrella' size={24} color='#7B08AD' />
                                <Text style={{ color: '#f3f3f3', paddingTop: 5, fontWeight: '700' }}>{rainProbability}%</Text>
                                <Text style={{ color: '#869DA4', fontSize: 13, fontWeight: '600' }}>Rain</Text>
                            </View>
                        </View><View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, marginTop: 30, }}>
                            <Text style={{ color: '#f3f3f3', fontSize: 17, fontWeight: '700' }}>Today</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#869DA4', fontSize: 14, fontWeight: '600' }}>5 days</Text>
                                <MaterialCommunityIcons name='chevron-right' size={18} color='#869DA4' />
                            </View>
                        </View>
                        {/* <View style={{ marginTop: 20, paddingHorizontal: 20, marginBottom: 30 }}>
                             <FlatList
                                data={forecast}
                                renderItem={//({ item, index }) => <HourlyWeatherItem item={item} index={index} />
                                    renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} /> 
                        </View> */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", flex: 1, marginTop: 20, paddingHorizontal: 20, marginBottom: 30 }} >
                                {
                                    weatherForecast?.list?.slice(0, 9).map((it: IWeatherForecastData['list'][number], index: number) => {
                                        return <HourlyWeatherItem item={it} index={index} key={index} />
                                    })
                                }


                            </View>
                        </ScrollView>
                        {/* {<View style={{
                            backgroundColor: '#f3f3f3', height: 250, borderRadius: 10, marginHorizontal: 20, shadowColor: 'black', shadowOffset: { width: 0, height: 6, }, shadowOpacity: 0.39, shadowRadius: 8.30, elevation: 13,
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30
                        }}>
                            <Image source={{ uri: 'https://tile.openweathermap.org/map/wind_new/2/1/1.png?appid=64909afff512317e0b0f359e2ea476e1', }} style={{
                                width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 6, }, shadowOpacity: 0.39, shadowRadius: 8.30,
                            }} />
                        </View>*/}

                    </>
                )}
            </ScrollView>
        </HomeContainer>
    )
}

export default Home

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#17224A',
        marginRight: 10,
        paddingVertical: 10,
    },
    selectedItemContainer: {
        backgroundColor: 'rgba(31, 114, 128, 0.5)',
        //1F7280 sonuna 80 eklersensaydam olr
    },
})