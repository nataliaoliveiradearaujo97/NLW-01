import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { Feather as Icon, FontAwesome } from  '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  personal_id: number;
}

interface Data {
  personal: {
    image_url: string;
    nome: string;
    email: string;
    whatsapp: number;
    metodologia: string;
    cidade: string;
    uf: string;
  };
  items: {
    nome: string;

  }[];
}

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const route = useRoute();

    //esta constante assumiu o formato da interface Params
    const routeParams = route.params as Params;

    useEffect(() => {
      api.get(`personal/${routeParams.personal_id}`).then(response => {
        setData(response.data);
      });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleWhatsapp() {
      Linking.openURL(`whatsapp://send?phone${data.personal.whatsapp}&text=Tenho interesse nas aulas particulares`);
    }

    function handleComposerMail() {
      MailComposer.composeAsync({
        subject: 'Interesse em Aulas Particulares',
        recipients: [data.personal.email],
      })
    }

    if (!data.personal) {
      return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <Image style={styles.personalImage} source={{ uri: data.personal.image_url }} />

                <Text style={styles.personalName}>{data.personal.metodologia}</Text>
                <Text style={styles.personalItems}>{data.items.map(item => item.nome).join(', ')}</Text>

                <View style={styles.pessoal}>
                    <Text style={styles.pessoalTitle}>{data.personal.nome}</Text>
                    <Text style={styles.pessoalContent}>{data.personal.whatsapp}</Text>
                    <Text style={styles.pessoalContent}>{data.personal.email}</Text>
                </View>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressTitle}>{data.personal.cidade}, {data.personal.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposerMail}>
                    <Icon name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    personalImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    personalName: {
      color: '#FFF',
      fontSize: 28,
      fontFamily: 'Inter_700Bold',
      marginTop: 24,
    },
  
    personalItems: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#FFF'
    },

    pessoal: {
        marginTop: 32,
    },
  
    address: {
      marginTop: 32,
    },

    pessoalTitle: {
        color: '#FFF',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
      },
    
    addressTitle: {
      color: '#FFF',
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
    },

    pessoalContent: {
        fontFamily: 'Inter_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#FFF'
      },
  
    addressContent: {
      fontFamily: 'Inter_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#FFF'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#A0A7AB',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Inter_500Medium',
    },
  });

export default Detail;