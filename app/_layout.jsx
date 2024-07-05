import React, { useEffect, useState } from 'react'
import { Stack, router } from 'expo-router'
import { Image, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const RootLayout = () => {
    const logout = () => {
        AsyncStorage.removeItem("token")
        router.replace("/")
    }
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerTitle: "", headerStyle: { backgroundColor: "#C80036" }, headerShadowVisible: false, headerBackVisible: false
         }} />
            <Stack.Screen name='users/register' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='users/login' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='motors/validation' options={{
                headerStyle: { backgroundColor: "#C80036" }, headerTitle: (props) => (
                    <Image
                        style={{ width: 360, height: 70 }}
                        source={require('../assets/images/logo.png')}
                        resizeMode='contain'
                    />
                ),
                headerTitleStyle: { flex: 1, textAlign: 'center' },
                headerLeft: null,
                headerBackVisible: false,
                headerRight: () => (
                    <TouchableOpacity onPress={logout} ><Text style={{ color: "white" }}>Logout</Text></TouchableOpacity>
                ),
                headerShadowVisible: false
            }} />
            <Stack.Screen name='motors/details/[serial_no]' options={{ headerShown: true, headerShadowVisible: false, headerTitle: "Alternator Details" }} />
        </Stack>
    )
}

export default RootLayout