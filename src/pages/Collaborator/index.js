import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import api from '../../services/api';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


 

  
  



export default function Collaborator({ navigation }) {
    // const idCollaborator = '0436e21b';

    const [collaborator, setCollaborator] = useState([]);
    const [pointsOfDay, setPointsOfDay] = useState([]);

    const [idCollaborator, setIdCollaborator] = useState();

    const [ newPoint, setNewPoint ] = useState(0)

    const getData = async () => {
        try {
           const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            setIdCollaborator(value);
          }
        } catch(e) {
          alert('deu erro', e)
        }
      //   console.log()
      }
      getData()
    

    useEffect(()=>{
        
        api.get('informations-collaborator-mobile', {
            headers: {
                Authorization: idCollaborator
            }
        }).then(response => {
            setCollaborator(response.data)
            
        })

         //histórico de pontos do colaborador
         api.get('list-points', {
            headers: {
                Authorization: idCollaborator,
            }
        }).then(response => {
            //faz a separação do array agrupadas de 4 em 4.
            let pointsDay = [];
            const corte = 4;
            for (var i = 0; i < response.data.length; i = i + corte) {
                pointsDay = [...pointsDay, response.data.slice(i, i + corte)]
              }
              
              setPointsOfDay(pointsDay.reverse());
            })
    }, [idCollaborator, newPoint])

    async function handleCreatePoint() {
        setNewPoint(newPoint + 1)
        alert(newPoint);
        await api.post('new-point', {latitude: '-41065655645', longitude: '-4212456454'}, {
            headers: {
                Authorization: idCollaborator,
            }
        })
        
        
    }

    return (
        <View style={{backgroundColor: '#e6e6e6', flex: 1}}> 
                <ScrollView>
                    <View style={styles.containerHeader}>
                        <View style={styles.containerHeaderMargin}>
                            <View style={styles.headerInformations}>
                                <View style={styles.perfil}>
                                    <Image
                                    source={require('../../assets/perfil.png')}
                                    
                                    style={{ width: 24, height: 24}}
                                    />
                                    <Text style={{marginLeft: 7, color: "#4a555d"}}>{collaborator[0]?.name}</Text>
                                </View>
                                <View>
                                    
                                    <Text style={styles.textGrey}>Sair</Text>
                                </View>
                                    
                            </View>
                            <View style={styles.timetableInformation}>
                                <View>
                                    <Text style={styles.boldBlue}>Ocupação</Text>
                                    <Text style={styles.textGrey}>{collaborator[0]?.occupation}</Text>
                                </View>
                                <View>
                                    <Text style={styles.boldBlue}>Horário Padrão</Text>
                                    <Text style={styles.textGrey}>{collaborator[0]?.startexpedient.slice(0, 5)} ás {collaborator[0]?.endtexpedient.slice(0, 5)}</Text>
                                </View>
                            </View>
                            <View style={{marginBottom: 20}}>
                                <Text style={styles.boldBlue}>Horário de Almoço</Text>
                                <Text style={styles.textGrey}>{collaborator[0]?.startlunch.slice(0, 5)} ás {collaborator[0]?.endlunch.slice(0, 5)}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleCreatePoint}>
                        <Text style={styles.buttonText} >Marcar entrada/Saída</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View>
                        {pointsOfDay ? pointsOfDay.map(pointday =>(
                             <View style={styles.containerPoints} key={pointday[0].id}>
                                <View style={styles.dayMoth}>
                                    <Text style={styles.day}>{pointday[0].timestring.slice(8, 10)}</Text>
                                    <Text style={styles.moth}>{pointday[0].timestring.slice(5, 7)}</Text>
                                </View>
                                <View>
                                    <Text style={styles.boldBlue}>Expediente</Text>
                                    <Text style={styles.bold}>Entrou</Text>
                                    <Text style={{marginBottom: 5}}>{pointday[0]?.timestring.slice(11, 16)}</Text>
                                    <Text style={styles.bold}>Saiu</Text>
                                    <Text>{pointday[3]?.timestring.slice(11, 16)}</Text>
                                </View>
                                <View>
    
                                    <Text style={styles.boldBlue}>Almoço</Text>
                                    <Text style={styles.bold}>Entrou</Text>
                                    <Text style={{marginBottom: 5}}>{pointday[1]?.timestring.slice(11, 16)}</Text>
                                    <Text style={styles.bold}>Saiu</Text>
                                    <Text>{pointday[2]?.timestring.slice(11, 16)}</Text>
    
                                </View>
                            </View>
                        )) : <Text>Não existe pontos</Text>}
                       
                    </View>
                    

                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    containerHeader: {
        backgroundColor: 'white'
    },
    containerHeaderMargin: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 17
    },
    headerInformations: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timetableInformation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    boldBlue: {
        fontWeight: 'bold',
        color: '#0066f0'
    },
    textGrey: {
        color: "#4a555d"
    },
    bold: {
        fontWeight: 'bold',
    },
    perfil: {
        display: 'flex',
        flexDirection: 'row',
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
      containerPoints: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: 'white',
          borderRadius: 11,
          padding: 11,
          marginBottom: 11
      },
      dayMoth: {
          justifyContent: 'center'
      },
      day: {
          fontSize: 30,
          fontWeight: 'bold',
          color: "#4a555d"
      }, 
      moth: {
          fontSize: 19,
          color: "#4a555d"
      }
})

