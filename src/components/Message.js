import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Message = ({message}) => {
  return (
    <View style={[styles.message ,{marginLeft:message.role==='user'? 'auto': 0,backgroundColor:message.role==='user'? '#007AFF': '#d3d3d3'}]}>
    <Text style={[styles.messageText,{color:message.role==='user'? 'white':'black'}]}>{message.content}</Text>
     </View>
  )
}

const styles = StyleSheet.create({
    message:{
      backgroundColor:'gainsboro',
      padding:10,
      marginVertical:5,
      borderRadius:10,
      width:'80%'
    }
  });
  

export default Message