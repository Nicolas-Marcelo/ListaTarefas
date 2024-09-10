import { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';
import './tarefas.css';

import MoverDocumento from '../Manipular/MoverFaAn';
import Editar from '../Manipular/Editar';
import { collection, onSnapshot } from 'firebase/firestore';

function TarefasFazer() {

  const [tarefa, setTarefa] = useState([])

  useEffect(() => {
    async function conteudo() {
      const dados = (collection(db, "Fazer"));
      onSnapshot(dados, (snapshot) => {
        let listaPost = []

        snapshot.forEach((doc) => {
          listaPost.push(
            {
              id: doc.id,
              tarefa: doc.data().tarefa,
              descricao: doc.data().descricao
            });
        })
        setTarefa(listaPost)
      })
    }
    conteudo();
  }, [])

  return (
    <div className='tarefa-container'>
      <span className='tarefa-titulo'>Tarefas Para Começar</span>
      <ul>
        {tarefa.map((value) => (
          <li key={value.id} className='tarefa-caixa'>
            <span>Tarefa: {value.tarefa}</span>
            <span>Descricao: {value.descricao}</span>
            <MoverDocumento id={value.id} className='tarefa-botao-mover'/>
            <Editar id={value.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TarefasFazer;