import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeContainer from '../container/homeContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherQuery } from '../redux/action/weatherQueryAction';
import { RootState } from '../redux/store/configureStore';
import { Dispatch } from 'redux';
const Search = () => {
  return (
    <HomeContainer>
      <View>
        
      </View>
    </HomeContainer>
  )
}

export default Search

const styles = StyleSheet.create({})