import React from "react";
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConnection';
import './Login.css';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [usuario, setUsuario] = useState(false);
    const [detalhesUseario, setDetalhesUsuario] = useState({});

    useEffect(() => {
        async function verificarLogin() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUsuario(true)
                    setDetalhesUsuario({
                        uid: user.uid,
                        email: user.email
                    })
                } else {
                    setUsuario(false);
                    setDetalhesUsuario({});
                }
            })
        }
        verificarLogin();
    }, [])

    async function novoUsuario() {
        await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                alert("Usuário cadastrado");
                setEmail("");
                setSenha("");
            }).catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert("Senha muito fraca")
                } else if (error.code === "auth/email-already-in-use") {
                    alert("Este email já foi usado por outra conta")
                }
            })
    }

    async function logarUsuario() {
        await signInWithEmailAndPassword(auth, email, senha)
            .then((value) => {
                alert("Usuário logado com sucesso!")

                setUsuario(true);
                setDetalhesUsuario({
                    uid: value.user.uid,
                    email: value.user.email
                });

                setEmail("");
                setSenha("");
            }).catch(() => {
                alert("Erro ao fazer o login");
            })
    }

    async function fazerLogout() {
        await signOut(auth)
        setUsuario(false);
        setDetalhesUsuario({});
    }

    return (
        <div>
            <label className='login-titulo-email'>Email:</label>
            <input
                type='email'
                className='login-email'
                placeholder='Digite seu email: '
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <label className='login-titulo-senha'>Senha:</label>
            <input
                type='password'
                className='login-senha'
                placeholder='Digite sua senha: '
                value={senha}
                onChange={(e) => setSenha(e.target.value)} />

            <button onClick={novoUsuario} className='login-botao-novo'>Cadastrar</button>
            <button onClick={logarUsuario} className='login-botao-logar'>Login</button>
            <button onClick={fazerLogout} className='login-botao-sair'>Deslogar</button>
        </div>
    );
}

export default Login;