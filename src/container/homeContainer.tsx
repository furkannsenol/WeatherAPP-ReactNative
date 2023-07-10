import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface IProps {
    children?: ReactNode
}

const HomeContainer: React.FC<IProps> = ({ children }) => {

    const lgColors: string[] = ['#17224B', '#0E1325']
    //const statusBarHeight: number | undefined = StatusBar.currentHeight
    //233473
    const insets = useSafeAreaInsets()
    const statusBarHeight: number = insets.top + (StatusBar.currentHeight || 0);

    return (
        <LinearGradient colors={lgColors} style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
            <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight }}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    )
}

export default HomeContainer

const styles = StyleSheet.create({})