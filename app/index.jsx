import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        AsyncStorage.getItem("token").then((tokenJWT) => {
            if (tokenJWT) {
                router.replace("/motors/validation")
                setToken(tokenJWT)
                return
            }
            setToken(null)
        })

    }, [token])
    return (
        <>
            <View style={styles.main_container}>
                <Text style={styles.welcome_text}>Welcome to the,</Text>
                <Text style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: 600
                }}>ST Ford Alternator App</Text>
                <View style={styles.second_container}>
                    <Text style={{
                        color: "white",
                        fontSize: 15
                    }}>New to ST Ford Alternator app ?</Text>
                    <Link href={"users/register"} style={styles.button}>
                        <Text style={{ fontSize: 15, color: "#C80036", fontWeight: 500 }}>Create Account</Text>
                    </Link>
                    <Text style={{
                        color: "white",
                        fontSize: 15
                    }}>Already have an account on ST Ford ?</Text>
                    <Link href={"users/login"} style={styles.button}>
                        <Text style={{ fontSize: 15, color: "#C80036", fontWeight: 500 }}>Login</Text>
                    </Link>
                    <Text style={{ color: "white", fontSize: 15 }}>Validate a ST Ford alternator ?</Text>
                    <Link href={token === null ? "/users/login" : "motors/validation"} style={styles.outline}>
                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>Validate an Alternator</Text>
                    </Link>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    input: {
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,
        color: "#686D76",
        paddingBottom: 10
    },
    main_container: {
        backgroundColor: "#C80036",
        flex: 1,
        padding: 20,
        paddingTop: 10
    },
    welcome_text: {
        color: "white",
        fontSize: 16,
        marginBottom: 5
    },
    button: {
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 10
    },
    second_container: {
        marginTop: 26
    },
    outline: {
        backgroundColor: "transparent",
        borderColor: "#fff",
        borderWidth: 2,
        alignItems: "center",
        textAlign: "center",
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
        marginTop: 10
    }
})

export default Index
