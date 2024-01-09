import React from 'react'
import { Text,View,Image } from 'react-native'

export default function ImageScreen({route,navigation}) {

    const {image} = route.params;
  return (
    <View>
        <Image source={{uri:image}} height={500} width={500}/>
    </View>
  )
}
