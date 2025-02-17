import { Abas } from "../components/Abas";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ValueInput } from "../components/ValueInput";
import { Modal } from "../components/Modal";
import { Table } from "../components/Taable";

export function Patient() {

  interface Professional {
    id: string;
    name: string;
    rg: string;
  }

  const [profissionais, setProfessionals] = useState<Professional[]>([]);
  const [profissionaisModal, setProfessionalsModal] = useState<Professional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState({ message: '', type: '' });
  const [isEdit, setEdit] = useState(false);

  const API_BASE_URL = 'http://localhost:3001'
  const token = localStorage.getItem('authToken');

  const TABLE_HEADERS = ['Nome', 'RG', 'Cor', 'Telefone', 'Data de Nascimento'];

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cadastros/patient`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfessionals(data.getUser);
    } catch (error) { }
  }

  function cadProf() {

    setProfessionalsModal({
      id: '',
      name: '',
      rg: '',
    });

    setEdit(true);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    fetchProfessionals();
    setIsModalOpen(false);
    setEdit(false);
  };

  const openModal = (id: string) => {
    const professional = profissionais.find((prof) => prof.id === id);
    setProfessionalsModal(professional || null);
    setIsModalOpen(true);
    setEdit(false);
  }

  const alertMessage = () => {
    if (!isMessage.message) return
    const bg = isMessage.type === 'error' ? 'bg-red-500/90' : isMessage.type === 'warning' ? 'bg-yellow-500/90' : 'bg-green-500/85'
    setTimeout(() => {
      setIsMessage({ message: '', type: '' });
    }, 3000);
    return (<div className={`${bg} z-50 text-white/80 p-2 justify-center absolute ease-in-out duration-100 left-1/2 
    -translate-x-1/2 transition-all rounded-lg top-[3%] w-fit h-16 flex items-center mx-2`}>
      <div> <IoCloseCircleOutline size={30} className="mr-2" /> </div>
      {isMessage.message}
    </div>)
  };

  const updateModal = async () => {
    if (!profissionaisModal) return;

    if (profissionaisModal.name === '' || profissionaisModal.rg === '') {
      setIsMessage({ message: 'Preencha todos os campos', type: 'warning' })
      return;
    }

    const professionalData = {
      "name": profissionaisModal.name,
      "rg": profissionaisModal.rg,
    }

    try {
      const requestMethod = isEdit ? 'post' : 'patch';
      const url = isEdit
        ? `${API_BASE_URL}/cadastros/patient`
        : `${API_BASE_URL}/cadastros/patient/${profissionaisModal.id}`

      await axios[requestMethod](url, professionalData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsMessage({ message: requestMethod === 'post' ? 'Paciente cadastrado com sucesso' : 'Paciente atualizado com sucesso', type: 'success' })
      setEdit(false);
      setIsModalOpen(false);
      fetchProfessionals();
    } catch {
      setIsMessage({ message: 'Ops, algo deu errado...', type: 'error' })
    }
  }

  const deleteProfessional = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/cadastros/patient/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      setIsMessage({ message: 'Paciente deletado com sucesso', type: 'success' })
      fetchProfessionals();
    } catch {
      setIsMessage({ message: 'Ops, algo deu errado...', type: 'error' })
    }
  };

  const renderEditModal = () => {
    if (!isModalOpen || !profissionaisModal) return null;

    return (
      <Modal
        tittle={isEdit ? 'Cadastrar Paciente' : 'Editar Paciente'}
        clickSave={updateModal}
        clickClose={closeModal}
      >
        <div className=" flex gap-2 mb-2">
          <div className="w-full">
            <ValueInput
              placeholder="Nome"
              tittle={'Nome'}
              value={profissionaisModal.name}
              onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, name: e })}
            />
          </div>
          <div className="w-full">
            <ValueInput
              placeholder="Rg"
              tittle={'RG'}
              value={profissionaisModal.rg}
              onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, rg: e })}
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
      <Abas
        ClickButton={cadProf}
        Tittle="Pacientes"
        TittleBotton="Cadastrar Paciente"
      >
        {alertMessage()}
        <Table
          Headers={TABLE_HEADERS}
          Data={[...profissionais.map((professional) => [professional.id, professional.name, professional.rg, "N/D", "N/D", "N/D"])]}
          Delete={deleteProfessional}
          Edit={openModal} />
        {renderEditModal()}
    </Abas>
      
  );
}