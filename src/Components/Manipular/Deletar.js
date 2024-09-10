import { db } from '../../firebaseConnection';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaTrashAlt } from 'react-icons/fa';

function Excluir({id}) {
    async function excluirTarefa() {
        if (!id) {
            alert("ID da tarefa não encontrado");
            return;
        }
        const postDeletado = doc(db, "Finalizado", id);
        await deleteDoc(postDeletado).then(() => {
            alert("Post deletado com sucesso")
        }
        ).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <button className='tarefa-botao' onClick={excluirTarefa}>
                <i><FaTrashAlt /></i>
                <span>Excluir Tarefa</span>
            </button>
        </div>
    );
}
export default Excluir;