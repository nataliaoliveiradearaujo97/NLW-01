import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const navigation = useNavigation();

    function handleNavigationToPersonal() {
        navigation.navigate('Personal', {
          uf,
          cidade,
        });
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined }>
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 512, height: 512, marginTop: 110, marginLeft: 120 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo2.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace para personal trainers.</Text>
                  <Text style={styles.description}>Ajudamos na divulgação de profissionais 
                  capazes ajudar você alcançar seus objetivos.</Text>
                </View>
            </View> 

            <View style={styles.footer}>
              <TextInput 
                style={styles.input}
                placeholder="Digite a UF" 
                value={uf}
                maxLength={2}
                autoCapitalize="characters"
                autoCorrect={false}
                onChangeText={setUf}
              />

              <TextInput 
                style={styles.input}
                placeholder="Digite a cidade" 
                value={cidade}
                autoCorrect={false}
                onChangeText={setCidade}
              />

                <RectButton style={styles.button} onPress={handleNavigationToPersonal}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>

        </ImageBackground>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#ffffff',
      fontSize: 32,
      fontFamily: 'Inter_700Bold',
      maxWidth: 260,
      marginTop: 70,
    },
  
    description: {
      color: '#ffffff',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Inter_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#A0A7AB',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
    }
  });

export default Home;