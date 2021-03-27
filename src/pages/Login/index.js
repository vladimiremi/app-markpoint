
import React, {useState, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TextInput,
    ButtonText,
    TouchableOpacity
  } from 'react-native';


import { MMKV } from 'react-native-mmkv';

import api from '../../services/api.js';

const STORAGE_KEY = '@save_age';


export default function Login() {
    
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState();
  const [ points, setPoints] = useState([]);

  


  // useEffect(()=>{
  //   api.get('')
  // }, []) 

  async function handleLogon(){
    try {
      const response = await api.post('session-collaborator', { email, password } );
      
      // const idCollaborator = async (value) => {
      //   try {
      //     await AsyncStorage.setItem('@storage_Key', value);
      //     alert("LocalStorage Salvo!")
      //   } catch (e) {
      //     alert('LocalStorage não salvo!')
      //   }
      // };

      // idCollaborator(response.data[0]?.id);

      
      // getData = async () => {
      //   try {
      //      return  await AsyncStorage.getItem('@storage_Key')
          
      //   } catch(e) {
      //     // error reading value
      //   }
      //   console.log()
      // }
      


      alert("Logado!");
    } catch(err){
      alert("Erro ao fazer login, tente novamente!" + err);
    }
}



    return (
        <View>
            <StatusBar hidden={true}/>

            <View style={styles.container}>

            <Image
                source={require('../../assets/background.png')}
                
                style={{ width: 450, height: 305}}
                />

            </View>
            <View style={styles.body}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Bata o seu ponto</Text>
                <Text style={styles.supTitle}>de forma fácil e prática</Text>
            </View>
                <View style={styles.containerInputs}>
                <TextInput
                style={styles.input}
                placeholderTextColor={'black'}
                placeholder="Digite seu o seu e-mail"
                value={email}
                onChangeText={email => setEmail(email)}
                // defaultValue={text}
                />
                <TextInput />
                
                <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor={'black'}
                value={password}
                onChangeText={password => setPassword(password)}
                />
                <TextInput />
                </View>
                <View style={styles.ContainerForgot} >
                    <Text style={styles.forgot}>Esqueci minha senha</Text>
                </View>
                <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={handleLogon}>
                    <Text style={styles.buttonText} >Entrar</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      
    },
    containerTitle: {
      flex: 0.3,
      marginTop: 43,
      marginBottom: 80,
      marginLeft: 25,
      
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#3e3f3e'
      
    },
    supTitle: {
      fontSize: 30,
      color: '#3e3f3e',
    },
  
    body: {
      flex:1,
      marginTop: 70,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 40,
      // width:270,
      // height: 500,
      backgroundColor: 'white',
      // position: 'absolute',
    
    },
    containerButton: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  
    button: {
      backgroundColor: '#0066f0',
      height: 42,
      margin: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: 'white',
    },
    ContainerForgot: {
      alignItems: 'flex-end',
      marginRight: 30,
      marginBottom: 10,
    },
    forgot: {
      color: '#0066f0',
      fontWeight: 'bold',
      alignItems: 'center',
    },
  
    input: {
      height: 50,
      minWidth: 330,
      marginBottom: -35,
      borderBottomWidth: 1,
      paddingLeft: 7,
      fontWeight: 'bold',
  
    },
    containerInputs: {
      alignItems: 'center',
    }
  })
  