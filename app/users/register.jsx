import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { router } from 'expo-router'
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
        <Text style={{ color: "#fff", fontSize: 15 }}>Create an account to join stford</Text>
        <View style={{ marginTop: 20 }}>
          <View>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} placeholder='Enter name' onChangeText={name => setName(name)} />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} placeholder='example@gmail.com' onChangeText={email => setEmail(email)} />
          </View>
          <View>
            <Text style={styles.text}>Mobile Number</Text>
            <TextInput style={styles.input} maxLength={10} keyboardType='number-pad' placeholderTextColor={"#fff"} placeholder='Phone number' onChangeText={phone => setPhoneNo(phone)} />
          </View>
          <View>
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} placeholder='Create your password' onChangeText={password => setPassword(password)} />
          </View>
          <TouchableOpacity onPress={register} style={styles.button}>
            <Text style={{ color: "#C80036", fontWeight: 600 }}>CREATE</Text>
          </TouchableOpacity>
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
    paddingTop: 20
  },
  text: {
    color: "#fff"
  },
  input: {
    backgroundColor: "#94032a",
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
    padding: 10,
    borderRadius: 8,
    width: "23%",
    marginTop: 10
  },
})

export default register