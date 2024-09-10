import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';
import { collection, onSnapshot } from 'firebase/firestore';
import Excluir from '../Manipular/Deletar';
import './tarefas.css';

function TarefasFinalizado() {
  const [tarefa, setTarefa] = useState([]);

  useEffect(() => {
    const unsub = async () => {
      const dados = collection(db, "Finalizado");
      onSnapshot(dados, (snapshot) => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            descricao: doc.data().descricao
          });
        });
        setTarefa(listaPost);
      });
    };
    unsub();
  }, []);

  return (
    <div className='tarefa-container'>
      <span className='tarefa-titulo'>Tarefas Já Finalizadas</span>
      <ul>
        {tarefa.map((value) => (
          <li key={value.id} className='tarefa-caixa'>
            <span>Tarefa: {value.tarefa}</span>
            <span>Descrição: {value.descricao}</span>
            <Excluir id={value.id} /> {/* Passa o ID para o componente Excluir */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TarefasFinalizado;
