import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo2.png';

interface Item {
    id: number;
    nome: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePersonal = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [initialPosition, setInitionPosition] = useState<[number, number]>([0,0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        nascimento: '',
        sexo: '',
        cpf: '',
        email: '',
    });

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitionPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if(selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent ){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        
        const { name, nascimento, sexo, cpf, email } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name, 
            nascimento,
            sexo,
            cpf,
            email, 
            uf,
            city,
            latitude,
            longitude,
            items
        };

        await api.post('personal', data);

        alert("Pesonal cadastrado com sucesso!");

        history.push('/');
    }

    return (
        <div id="page-create-personal">
            <header>
                <img src={logo} alt="BuilderGym" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastre-se</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="nascimento">Data de Nascimento</label>
                            <input 
                                type="text"
                                name="nascimento"
                                id="nascimento"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                        <label htmlFor="sexo">Sexo</label>
                            <select name="sexo" id="uf">
                                <option value="0"></option>
                                <option value="1">Feminino</option>
                                <option value="2">Masculino</option>
                                <option value="3">Outro</option>
                            </select>
                        </div>
                    </div>
                
                    <div className="field">
                        <label htmlFor="cpf">CPF</label>
                        <input 
                            type="text"
                            name="cpf"
                            id="cpf"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o Endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={17} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        [<Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">UF</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="cidade" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Metodologia</h2>
                        <span>Selecione um ou mais items abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)} 
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.nome} />
                                <span>{item.nome}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
};

export default CreatePersonal;