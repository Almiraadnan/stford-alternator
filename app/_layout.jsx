import React from 'react'
import { Stack, router } from 'expo-router'
import { Text } from 'react-native'

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='users/register' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='users/login' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false }} />
            <Stack.Screen name='motors/validation' options={{ headerStyle: { backgroundColor: "#C80036" }, headerTitle: "", headerTintColor: "#fff", headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name='motors/profile' options={{
                headerShadowVisible: false, headerRight: () => (
                    <Text onPress={() => router.replace("/motors/validation")}>Back</Text>
                ),
                headerTitle: "Account Details"
            }} />
            <Stack.Screen name='motors/details/[serial_no]' options={{ headerShown: true, headerShadowVisible: false, headerTitle: "Alternator Details" }} />
        </Stack>
    )
}

export default RootLayout