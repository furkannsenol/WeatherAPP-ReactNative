import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IWeatherForecastData } from '../model/forecastData'


interface IProps {
    item: IWeatherForecastData['list'][number],
    index: number
}
const HourlyWeatherItem: React.FC<IProps> = ({ item, index }) => {
    const [selectedItem, setSelectedItem] = useState<number>(0);
    
    return (
        <TouchableWithoutFeedback onPress={() => setSelectedItem(index)}>
            <View style={[styles.itemContainer, index === selectedItem && styles.selectedItemContainer]}>
                <Text style={{ color: '#f3f3f3', fontSize: 16, fontWeight: '600' }}>{item.main.temp.toFixed(1)}°</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${item?.weather?.map((it: { icon: string }) => it.icon)}@2x.png`, height: 75, width: 75 }} />
                <Text style={[{ color: '#869DA4', fontSize: 14, fontWeight: '600' }, index === selectedItem && { color: '#f3f3f3' }]} >{item.dt_txt.substring(11, 16)}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default HourlyWeatherItem

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