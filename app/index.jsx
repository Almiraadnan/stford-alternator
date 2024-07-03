import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {
    const [token, setToken] = useState({ token: undefined })
    useEffect(() => {
        try {
            AsyncStorage.getItem("token").then((tokenJWT) => {
                if (tokenJWT) {
                    router.replace("/motors/validation")
                    return
                }
                setToken({ token: tokenJWT })
            })
        } catch (err) {
            Alert.alert(err.message)
        }
    }, [token])
    return (
        <View style={{
            backgroundColor: "#C80036",
            flex: 1,
            padding: 20,
            paddingTop: 100
        }}>
            <Text style={{
                color: "white",
                fontSize: 15
            }}>Welcome to the,</Text>
            <Text style={{
                color: "white",
                fontSize: 30,
                fontWeight: 600
            }}>StFord Alternator App</Text>
            <View style={{ marginTop: 25 }}>
                <Text style={{
                    color: "white",
                    fontSize: 15
                }}>New to stFord My Alternator app ?</Text>
                <Link href={"users/register"} style={{
                    backgroundColor: "white",
                    alignItems: "center",
                    borderRadius: 5,
                    paddingTop: 15,
                    paddingBottom: 15,
                    textAlign: "center",
                    marginBottom: 20,
                    marginTop: 10
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: "#C80036",
                        fontWeight: 500
                    }}>Create Account</Text>
                </Link>
                <Text style={{
                    color: "white",
                    fontSize: 15
                }}>Already have an account ?</Text>
                <Link href={"users/login"} style={{ backgroundColor: "white", alignItems: "center", textAlign: "center", borderRadius: 5, paddingTop: 15, paddingBottom: 15, marginBottom: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 15, color: "#C80036", fontWeight: 500 }}>Login</Text>
                </Link>
                <Text style={{ color: "white", fontSize: 15 }}>Validate a stford alternator as guest ?</Text>
                <Link href={token ? "/motors/validation" : "/users/login"} style={{ backgroundColor: "transparent", borderColor: "#fff", borderWidth: 2, alignItems: "center", textAlign: "center", borderRadius: 5, paddingTop: 15, paddingBottom: 15, marginBottom: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>Validate an engine</Text>
                </Link>
            </View>
        </View>
    )
}


export default index