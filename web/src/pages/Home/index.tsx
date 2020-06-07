import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo2.png';

const Home = () => {
    return (
       <div id="page-home">
           <div className="content">
            <header>
                <img src={logo} alt="BuilderGym"/>
            </header>

            <main>
                <h1>Seu marketplace para personal trainers.</h1>
                <p>Ajudamos na divulgação de profissionais capazes ajudar você alcançar seus objetivos.</p>

                <Link to="/create-personal">
                    <span>
                        <FiLogIn/>
                    </span>
                    <strong>
                        Cadastre-se
                    </strong>
                </Link>
            </main>
           </div>
       </div>
    )
}

export default Home;