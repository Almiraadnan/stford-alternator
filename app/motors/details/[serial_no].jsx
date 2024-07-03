import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'

const MotorDetails = () => {
    const { serial_no } = useLocalSearchParams()
    const [data, setData] = useState()
    useEffect(() => {
        axios.get("https://stford-alternator-backend.vercel.app/api/v2/engine/" + serial_no)
            .then((res) => {
                setData(res.data.engine)
            }).catch((err) => {
                console.error(err);
            })
    }, [])
    return (
        <View style={{
            backgroundColor: "white", padding: 14, borderRadius: 5, shadowColor: '#ececec',
            shadowOffset: { width: 0, height: 0.3 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 5,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: 20,
        }}>
            <Image
                style={
                    {
                        width: 200,
                        height: 200,
                        marginBottom: 20
                    }
                }
                source={{ uri: "https://www.stamford-avk.com/sites/stamfordavk/files/styles/large/public/2022-11/P7-thumb.png?itok=ir9IPfGG" }}
            />
            <View>
                <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 10, borderTopColor: "#ccc", borderTopWidth: 1, }}>
                    <Text style={{ marginBottom: 5, color: "#686D76" }}>Serial No</Text>
                    <Text>{serial_no}</Text>
                </View>
                <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingLeft: 10, borderTopColor: "#ccc", borderTopWidth: 1, }}>
                    <Text style={{ marginBottom: 5, color: "#686D76" }}>Model Name</Text>
                    <Text>{data?.model}</Text>
                </View>
                <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', borderTopColor: "#ccc", borderTopWidth: 1, borderBottomColor: "#ccc", borderBottomWidth: 1, paddingTop: 20, paddingBottom: 20, paddingLeft: 10 }}>
                    <Text style={{ marginBottom: 5, color: "#686D76" }}>Alternator Name</Text>
                    <Text>{data?.engine_name}</Text>
                </View>
                <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: 'row', borderBottomColor: "#ccc", borderBottomWidth: 1, paddingTop: 20, paddingBottom: 20, paddingLeft: 10 }}>
                    <Text style={{ marginBottom: 5, color: "#686D76" }}>Build Location</Text>
                    <Text>{data?.location}</Text>
                </View>

            </View>
        </View >
    )
}

export default MotorDetails