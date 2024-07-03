import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { router } from 'expo-router'

const user = () => {
    const [token, setToken] = useState("")
    const [user, setUser] = useState({})
    const logout = () => {
        AsyncStorage.removeItem("token")
        setToken(null)
    }
    useEffect(() => {
        AsyncStorage.getItem("token").then((data) => {
            setToken(JSON.parse(data))
            if (token === null) {
                router.replace("/")
                return
            }
            axios.post("https://stford-alternator-backend.vercel.app/api/v1/user/me", {
                token: data
            }).then((res) => {
                if (res.data.success === true) {
                    setUser(res.data.user)
                } else {
                    Alert.alert("Jwt Token Error", res.data.msg)
                    AsyncStorage.removeItem("token")
                }
            }).catch((err) => {
                console.error(err);
            })
        })
    }, [token])
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: 600 }}>Name : </Text>
            <Text style={{ marginTop: 10, marginBottom: 10, paddingBottom: 10, fontSize: 16 }}>{user.name}</Text>
            <Text style={{ fontSize: 17, fontWeight: 600 }}>Email :</Text>
            <Text style={{ marginTop: 10, marginBottom: 10, paddingBottom: 10, fontSize: 16 }}>{user.email}</Text>
            <Text style={{ fontSize: 17, fontWeight: 600 }}>Phone no :</Text>
            <Text style={{ marginTop: 10, marginBottom: 10, paddingBottom: 10, fontSize: 16 }}>{user.phoneNo}</Text>
            <TouchableOpacity style={{ backgroundColor: "#D80032", width: "24%", paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, borderRadius: 6, textAlign: "center" }} onPress={logout}>
                <Text style={{ textAlign: "center", color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default user