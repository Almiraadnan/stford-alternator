import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = () => {
    axios.post("https://stford-alternator-backend.vercel.app/api/v1/user/login", {
      email,
      password,
    })
      .then((res) => {
        if (!res.data.success) {
          Alert.alert("Login Error", res.data.msg)
        } else {
          Alert.alert("Login Successfull!", "Your account logged in!")
          AsyncStorage.setItem("token", JSON.stringify(res.data.token))
          router.replace("/motors/validation")
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={{
          color: "white",
          fontSize: 30,
          fontWeight: 600,
        }}>Welcome Back!</Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>Login to your account in ST Ford Alternator!</Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} inputMode='email' placeholderTextColor={"#fff"} placeholder='example@gmail.com' onChangeText={email => setEmail(email)} />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} keyboardType='hidden-password' secureTextEntry={true} placeholderTextColor={"#fff"} placeholder='Password' onChangeText={password => setPassword(password)} />
          </View>
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={{ textAlign: "center", color: "#C80036", fontWeight: 600 }}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", marginTop: 20, fontSize: 14 }}>
            Don't have an account?
            <Link href={"/users/register"} style={{ textDecorationLine: "underline" }}> Register</Link>
          </Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C80036',
    padding: 20,
    paddingTop: 40
  },
  text: {
    color: "#fff"
  },
  input: {
    backgroundColor: "#a3032e",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    color: '#fff'
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 6,
    width: "100%",
    marginTop: 10
  },
})

export default login