import React, { useState, useEffect } from "react";
import { db } from '../../firebaseConnection';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { FaEdit } from 'react-icons/fa';
import './Editar.css';

function Editar({ id }) {
    const [tarefa, setTarefa] = useState('');
    const [descricao, setDescricao] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "Fazer", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTarefa(data.tarefa || '');
                setDescricao(data.descricao || '');
            } else {
                console.log("Nenhum documento encontrado!");
            }
        }

        if (id) fetchData();
    }, [id]);

    async function EditarTarefa() {
        const docRef = doc(db, "Fazer", id);

        try {
            await updateDoc(docRef, {
                tarefa: tarefa,
                descricao: descricao,
            });
            alert('Tarefa editada com sucesso');
            setTarefa('');
            setDescricao('');
            setShowModal(false);
        } catch (error) {
            console.log("Erro ao editar tarefa:", error);
            alert('Erro ao editar a tarefa. Confira o console para mais detalhes.');
        }
    }

    return (
        <div>
            <button className='tarefa-botao' onClick={() => setShowModal(true)}>
                <FaEdit />
                <span>  Editar Tarefa</span>
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Editar Tarefa</h2>
                        <label>Título:</label>
                        <textarea
                            placeholder='Título'
                            value={tarefa}
                            onChange={(e) => setTarefa(e.target.value)}
                        />

                        <label>Descrição:</label>
                        <input
                            type='text'
                            placeholder='Descrição da Tarefa'
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <div className="editar-botoes">
                            <button className='modal-botao' onClick={EditarTarefa}>
                                Salvar
                            </button>
                            <button className='modal-fechar' onClick={() => setShowModal(false)}>
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Editar;
