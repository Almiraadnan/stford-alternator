import { View, Text, StyleSheet, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const validation = () => {
    const [user, setUser] = useState("")
    const [token, setToken] = useState(null)
    const [serial, setSerial_no] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("token").then((tokenJWT) => {
            if (tokenJWT) {
                setToken(tokenJWT)
                return
            }
            setToken(null)
            AsyncStorage.getItem("token").then((data) => {
                axios.post("https://stford-alternator-backend.vercel.app/api/v1/user/me", {
                    token: data
                }).then((res) => {
                    if (res.data.success === true) {
                        setUser(res.data.user)
                    }
                }).catch((err) => {
                    console.error(err);
                })
            })
        })
    })
    const getSingleEngine = () => {
        axios.get("https://stford-alternator-backend.vercel.app/api/v2/engine/" + serial, {
            name: user.name,
            email: user.email,
            phoneNo: user.phoneNo
        })
            .then((res) => {
                if (!res.data.success) {
                    Alert.alert("Alternator Serial No Error", res.data.msg ? res.data.msg : "Please fill the serial no.")
                } else {
                    router.push({
                        pathname: `/motors/details/[serial_no]`,
                        params: {
                            serial_no: serial,
                            model: res.data.engine.model,
                            engine_name: res.data.engine.engine_name,
                            location: res.data.engine.location,
                        },
                    })
                }
            }).catch((err) => {
                console.error(err);
            })
    }
    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', alignItems: "center", width: '100%', justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
                <Text style={{ color: "#000", fontSize: 20, fontWeight: 400, }}>Validate an Alternator</Text>
            </View>
            <View style={styles.wrapper}>
                <Text style={{ fontSize: 18, fontWeight: 450, color: "#C80036" }}>Enter a ST Ford Alternator serial{"\n"}number to validate It's status{"\n"}</Text>
                <TextInput autoCapitalize={"characters"} maxLength={15} onChangeText={newText => setSerial_no(newText)} placeholderTextColor={"#686D76"} placeholder='eg: DP123456U12345B' style={styles.input} />
                <View style={{ height: 1, backgroundColor: "#e1e6f0" }} />
                <Text numberOfLines={1}></Text>
                <Text onPress={getSingleEngine} style={styles.button_valid}>Validate</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: 1,
        shadowRadius: 30
    },
    wrapper: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 5,
        shadowColor: '#ececec',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 5
    },
    button_valid: {
        color: "white",
        backgroundColor: "#D80032",
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        textAlign: "center",
        fontSize: 16,
        width: 90,
    },
})

export default validation