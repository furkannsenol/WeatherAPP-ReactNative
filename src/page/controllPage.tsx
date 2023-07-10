import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeContainer from '../container/homeContainer'
import { getUserLocation } from '../service/locationService'


const ControllPage = ({ navigation }: { navigation: any }) => {
    const checkAndFetchLocation = async () => {
        const { latitude, longitude } = await getUserLocation();
        navigation.navigate('TabRouter', { latitude, longitude });
    }

    useEffect(() => {
        checkAndFetchLocation();
    }, []);

    return (
        <HomeContainer>
            { }
        </HomeContainer>
    )
}

export default ControllPage

const styles = StyleSheet.create({})