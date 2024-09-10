import { useState } from 'react';
import { db } from '../../firebaseConnection';
import { addDoc, collection } from 'firebase/firestore'
import './Adicionar.css';

function AdicionarTarefas() {
    const [tarefa, setTarefa] = useState('');
    const [descricao, setDescricao] = useState('');

    async function adicionartarefas() {
        await addDoc(collection(db, "Fazer"), {
            tarefa: tarefa,
            descricao: descricao,
        }).then(() => {
            alert("tarefa adicionada com sucesso");
            setTarefa('');
            setDescricao('');
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='adicionar-tarefas-container'>
            <label>Tarefa</label>
            <input
                type='text'
                placeholder='Adicione o titulo de sua tarefa'
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)} />

            <label>Descricao</label>
            <input
                type='text'
                placeholder='Adicione a descrição de sua tarefa'
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)} />

            <button onClick={adicionartarefas}>Inserir</button>
        </div>
    );
}

export default AdicionarTarefas;