import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { router } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const validation = () => {
  const [serial, setSerial_no] = useState("")
  const [token, setToken] = useState("")
  const [user, setUser] = useState({ name: "K" })
  useEffect(() => {
    AsyncStorage.getItem("token").then((data) => {
      setToken(JSON.parse(data))
      if (token === null) {
        router.replace("/users/login")
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

  const getSingleEngine = () => {
    axios.get("https://stford-alternator-backend.vercel.app/api/v2/engine/" + serial , {
      name : user.name,
      email : user.email,
      phoneNo : user.phoneNo
    })
      .then((res) => {
        if (!res.data.success) {
          Alert.alert("Engine Error", res.data.msg)
        } else {
          router.push({
            pathname: `/motors/details/[serial_no]`,
            params: { serial_no: serial }
          })
        }
      }).catch((err) => {
        console.error(err);
      })
  }
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', alignItems: "center", width: '100%', justifyContent: "space-between", flexDirection: "row", marginBottom: 40 }}>
        <Text style={{ color: "#C80036", fontSize: 26, fontWeight: 500, }}>Validate an engine</Text>
        <Text onPress={() => {
          router.replace("/motors/profile")
        }} style={{ backgroundColor: "#D80032", color: "white", width: 30, height: 30, borderRadius: 50, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", paddingTop: 5 }}>{user.name.charAt(0)}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={{ fontSize: 18, fontWeight: 450, marginBottom: 30 }}>Enter a StFords Motor serial{"\n"}number to validate It's status{"\n"}and learn more about it  </Text>
        <TextInput autoCapitalize={"characters"} maxLength={12} onChangeText={newText => setSerial_no(newText)} placeholderTextColor={"#686D76"} placeholder='eg: PJ12345U123' style={styles.input} />
        <Text style={{ marginTop: 20, marginBottom: 20 }}>Remove all spaces and symbols asterisks, {"\n"}hyphens, etc. while entering the serial number. {"\n"}eg: PJ12345U123</Text>
        <View style={{ width: "100%", height: 1, backgroundColor: "#ececec" }} />
        <Text numberOfLines={1}></Text>
        <Text onPress={getSingleEngine} style={styles.button}>Validate</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80
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
  button: {
    color: "white",
    backgroundColor: "#D80032",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16
  },
  input: {
    borderBottomColor: "#ececec",
    borderBottomWidth: 1,
    color: "#686D76",
    paddingBottom: 10
  }
})

export default validation