import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [password, setPassword] = useState("")

  const register = () => {
    axios.post("https://stford-alternator-backend.vercel.app/api/v1/user/register", {
      name,
      email,
      password,
      phoneNo
    })
      .then((res) => {
        if (!res.data.success) {
          Alert.alert("Registration Error", res.data.msg)
        } else {
          Alert.alert("Account Created Successfull!", "Thanks for joining Stford Alternators!")
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
          fontWeight: 600
        }}>Welcome!</Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>Create an account to join ST Ford Alternator</Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} placeholder='Enter name' onChangeText={name => setName(name)} />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} inputMode='email' keyboardType='email-address' placeholderTextColor={"#fff"} placeholder='example@gmail.com' onChangeText={email => setEmail(email)} />
          </View>
          <View>
            <Text style={styles.text}>Mobile Number</Text>
            <TextInput style={styles.input} maxLength={11} keyboardType='number-pad' placeholderTextColor={"#fff"} placeholder='Phone number' onChangeText={phone => setPhoneNo(phone)} />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} keyboardType='hidden-password' secureTextEntry={true} inputMode placeholderTextColor={"#fff"} placeholder='Create your password' onChangeText={password => setPassword(password)} />
          </View>
          <TouchableOpacity onPress={register} style={styles.button}>
            <Text style={{ color: "#C80036", fontWeight: 600, textAlign: "center" }}>Create Your Account</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", marginTop: 20, fontSize: 14 }}>
            Have an account?
            <Link href={"/users/login"} style={{ textDecorationLine: "underline" }}> Login</Link>
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
    paddingTop: 34
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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 10
  },
})

export default register