import { Abas } from "../components/Abas";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Modal } from "../components/Modal";
import { Table } from "../components/Taable";

export function Procedure() {

  interface Professional {
    id: string;
    patient_name_id: string;
    professional_name_id: string;
    typeConsultation: string;
    hour_start: string;
    date_start: string;
  }
  interface Paciente {
    name: any
  }
  interface Medico {
    professional_name: string;
  }

  const [profissionais, setProfessionals] = useState<Professional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [profissionaisModal, setProfessionalsModal] = useState<Professional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState({ message: '', type: '' });
  const [isEdit, setEdit] = useState(false);

  const API_BASE_URL = 'http://localhost:3001'
  const token = localStorage.getItem('authToken');

  const TABLE_HEADERS = ['Paciente', 'Procedimento', 'Medico', 'Horario'];

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cadastros/procedure`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfessionals(data.getUser);
      setPacientes(data.pacientes);
      setMedicos(data.medicos);
    } catch (error) { }
  }

  function cadProf() {

    setProfessionalsModal({
      id: '',
      patient_name_id: '',
      professional_name_id: '',
      typeConsultation: '',
      hour_start: '',
      date_start: '',
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

    if (profissionaisModal.patient_name_id === '' || profissionaisModal.professional_name_id === '' || profissionaisModal.typeConsultation === '') {
      setIsMessage({ message: 'Preencha todos os campos', type: 'warning' })
      return;
    }
    const professionalData = {
      "patient_name_id": profissionaisModal.patient_name_id,
      "professional_name_id": profissionaisModal.professional_name_id,
      "typeConsultation": profissionaisModal.typeConsultation,
      "hour_start": profissionaisModal.hour_start + ' ' + profissionaisModal.date_start,
    }

    try {
      const requestMethod = isEdit ? 'post' : 'patch';
      const url = isEdit
        ? `${API_BASE_URL}/cadastros/procedure`
        : `${API_BASE_URL}/cadastros/procedure/${profissionaisModal.id}`

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

  const deleteProfessional = async (id: any) => {
    try {
      await axios.delete(`${API_BASE_URL}/cadastros/procedure/${id}`,
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
        tittle={isEdit ? 'Cadastrar Profissional' : 'Editar Profissional'}
        clickSave={updateModal}
        clickClose={closeModal}
      >
        <div className="mb-2 flex gap-2">
          <div className="w-full">
            <div className="mb-2">Medicos</div>
            <select className="w-full bg-white/70 rounded-md border-transparent focus:outline-none  focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
              onChange={(e) => setProfessionalsModal({ ...profissionaisModal, professional_name_id: e.target.value })}>
              <option value={''}>Escolha um medico</option>
              {medicos.map((medico: any, idx: any) => (
                <option key={idx} value={medico.id}>{medico.professional_name}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <div className="mb-2 ml-1">Procedimento</div>
            <select className="w-full bg-white/70 rounded-md border-transparent focus:outline-none  focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
              onChange={(e) => setProfessionalsModal({ ...profissionaisModal, typeConsultation: e.target.value })}>
              <option value={''}>Escolha um procedimento</option>
              <option value={'consulta'}>Consulta</option>
              <option value={'exame'}>Exame</option>
              <option value={'operacao'}>Operação/Cirurgia</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mb-2">Paciente</div>
          <select className="w-full bg-white/70 rounded-md border-transparent focus:outline-none  focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
            onChange={(e) => setProfessionalsModal({ ...profissionaisModal, patient_name_id: e.target.value })}>
            <option value={''}>Escolha um paciente</option>
            {pacientes.map((paciente: any, idx: number) => (
              <option key={idx} value={paciente.id}>{paciente.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-full">
            <div className="mb-2 ml-1">Data Inicio</div>
            <input type="date" placeholder="Data" value={profissionaisModal.hour_start}
              className="w-full bg-white/70 rounded-md border-transparent focus:outline-none 
              focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
              onChange={(e) => setProfessionalsModal({ ...profissionaisModal, hour_start: e.target.value })}
            />
          </div>
          <div className="w-full">
            <div className="mb-2 ml-1">Hora Inicio</div>
            <input type="time" placeholder="Hora" value={profissionaisModal.date_start}
              className="w-full bg-white/70 rounded-md border-transparent focus:outline-none 
              focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
              onChange={(e) => setProfessionalsModal({ ...profissionaisModal, date_start: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Abas
      ClickButton={cadProf}
      Tittle="Procedimentos"
      TittleBotton="Criar Procedimento"
    >
      {alertMessage()}
      <Table
        Headers={TABLE_HEADERS}
        Data={[...profissionais.map((profissional: any) => [
          profissional.id,
          pacientes.find((paciente: any) => paciente.id === profissional.patient_name_id)?.name || "Sem Paciente",
          profissional.typeConsultation,
          medicos.find((medico: any) => medico.id === profissional.professional_name_id)?.professional_name || "Sem Medico",
          profissional.hour_start,
        ])]}
        Edit={openModal}
        Delete={deleteProfessional}
      />
      {renderEditModal()}
    </Abas>
  );
}