import { useState, useEffect } from 'react';
import { db } from '../../firebaseConnection';
import MoverDocumento from '../Manipular/MoverAnFi';
import './tarefas.css';

import { collection, onSnapshot } from 'firebase/firestore';

function TarefasAndamento() {

  const [tarefa, setTarefa] = useState([])

  useEffect(() => {
    async function conteudo() {
      const dados = (collection(db, "Andamento"));
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
      <span className='tarefa-titulo'>Tarefas Já Em Andamento</span>
      <ul>
        {tarefa.map((value) => (
          <li key={value.id} className='tarefa-caixa'>
            <span>Tarefa: {value.tarefa}</span>
            <span>Descricao: {value.descricao}</span>
            <MoverDocumento id={value.id} className='tarefa-botao-mover'/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TarefasAndamento;