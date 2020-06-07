import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from  '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

//formato do vetor de um estado
interface Item {
    id: number,
    nome: string,
    image_url: string
}

interface Pesonal {
    id: number;
    nome: string;
    image: string;
    latitude: number;
    longitude: number;
}

interface Params {
    uf: string;
    cidade: string;
}

const Personal = () => {
    const [items, setItems] = useState<Item[]>([]);//estado composto por arrays
    const [personal, setPersonal] = useState<Pesonal[]>([]);
    const [selectedItems, setSelectedItems] = useState<Number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if(status !== 'granted') {
                Alert.alert('Ops, precisamos de sua permissão para obter a localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            console.log(latitude, longitude);

            setInitialPosition([
                latitude,
                longitude
            ])
        }

        loadPosition();
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        api.get('personal', {
            params: {
                cidade: routeParams.cidade,
                uf: routeParams.uf,
                items: selectedItems
            }
        }).then(response => {
            setPersonal(response.data);
        })
    }, [selectedItems]);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', { personal_id: id });
    }

    function handleSelectItem(id: number) {
        const alreadSelected = selectedItems.findIndex(item => item === id);

        if(alreadSelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        }else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um personal próximo a você.</Text>

                <View style={styles.mapContainer}>
                   { initialPosition[0] !== 0 && (
                        <MapView 
                            style={styles.map} 
                            initialRegion={{ 
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.017,
                                longitudeDelta: 0.017,
                            }}
                        >
                        {personal.map(personals => (
                            <Marker 
                                key={String(personals.id)}
                                style={styles.mapMarker}
                                onPress={() => handleNavigateToDetail(personals.id)}
                                coordinate={{ 
                                    latitude: personals.latitude,
                                    longitude: personals.longitude,
                                }} 
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image style={styles.mapMarkerImage} source={{ uri: personals.image }} />
                                    <Text style={styles.mapMarkerTitle}>{personals.nome}</Text>
                                </View>
                            </Marker>
                        ))}
                        </MapView>
                   ) }
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                {items.map(item => (
                    <TouchableOpacity 
                        key={String(item.id)} 
                        style={[
                            styles.item, 
                            selectedItems.includes(item.id) ? styles.selectedItem : {}
                        ]} 
                        onPress={() => handleSelectItem(item.id)} 
                        activeOpacity={0.6}
                    >
                        <SvgUri width={42} height={42} uri={item.image_url} />
                        <Text style={styles.itemTitle}>{item.nome}</Text>
                    </TouchableOpacity>
                ))}
                </ScrollView>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      color: '#FFF',
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#FFF',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Inter_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#174564',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Inter_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#174564',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Inter_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Personal;