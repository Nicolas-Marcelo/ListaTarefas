import React, { useState } from 'react';
import { db } from '../../firebaseConnection';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { FaArrowRight } from 'react-icons/fa';

function MoverDocumento({id}) {
  const [documento, setDocumento] = useState('');

  async function moverDocumento() {
    try {
      const docRefOrigem = doc(db, 'Andamento', id);
      const docSnapOrigem = await getDoc(docRefOrigem);

      const dados = docSnapOrigem.data();
      const docRefDestino = doc(db, 'Finalizado', id);
      await setDoc(docRefDestino, dados);

      await deleteDoc(docRefOrigem);

      alert('Documento movido com sucesso!');
      setDocumento('');
    } catch (error) {
      console.error('Erro ao mover documento: ', error);
    }
  }

  return (
    <div>
      <button className='tarefa-botao' onClick={moverDocumento}>
        <i><FaArrowRight /></i>
        <span>Finalizar Tarefa</span>
      </button>
    </div>
  );
}

export default MoverDocumento;
