import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View,TextInput,SafeAreaView, Button ,FlatList,KeyboardAvoidingView, Platform} from 'react-native';
import Message from '../components/Message';;

export default function App() {
  const [messages,setMessages]=useState([
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello" },
  { role: "assistant", content: "Hello how can I help?" },
  ])

  const [prompt,setPrompt]=useState('')
  const list=useRef(null)

 useEffect(()=>{
    setTimeout(()=>{
        list.current?.scrollToEnd({animated:true})
    },1)
  

 },[messages])

  const onSend= async()=>{
const userMessage={role:'user',
content:prompt}

    setMessages((existingMessages)=>[...existingMessages,userMessage])
    setPrompt('');
    
   const result=await fetch('http://localhost:8081/completion',{method:'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify([...messages,userMessage])})
   const resultJSON=await result.json();
   const answer = resultJSON.choices ? resultJSON.choices[0].message : null;
   setMessages((existingMessages)=>[...existingMessages,answer])
    
   
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex:1}}behavior={Platform.OS==='ios'? 'padding':'height'}>

      <FlatList ref={list} data={messages}
      contentContainerStyle={{gap:10,padding:10}}
      renderItem={({item})=>{
        return(
           <Message message={item}/>
        )
    
      }}/>
    <View style={styles.footer} >
      <TextInput placeholder='How can I help you?' value={prompt} onChangeText={setPrompt}
      style={styles.input}/>
      <Button title='Send' onPress={onSend}/>
      <StatusBar style="auto"/>
    </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  footer:{
    marginTop:'auto',
    flexDirection:'row',
    padding:10,
  },
  input:{
    borderEndWidth:1,
    borderColor:'gainsboro',
    padding:10,
    borderRadius:50,
    flex:1,
  },
  message:{
    backgroundColor:'gainsboro',
    padding:10,
    marginVertical:5,
    borderRadius:10,
    width:'80%'
  }
});
