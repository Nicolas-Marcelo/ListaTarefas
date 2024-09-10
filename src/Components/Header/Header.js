import React from 'react';
import { useState } from 'react';
import Login from '../Login';
import './Header.css';
import { FaSignInAlt } from 'react-icons/fa';

function Header() {
    const [entrar, setEntrar] = useState(false);

    const configLogin = () => {
        setEntrar(!entrar)
    };

    return (
        <div className='header-container'>
            <div className='header-titulo'>
                <h1>Lista de Tarefas</h1>
            </div>
            <div >
                <button onClick={configLogin} className='header-botao'>
                    <FaSignInAlt />
                </button>
            </div>
            {entrar && <Login />}
        </div>
    );
}

export default Header;