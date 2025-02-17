import { Abas } from "../components/Abas";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ValueSelect } from "../components/ValueSelect";
import { ValueInput } from "../components/ValueInput";
import { Modal } from "../components/Modal";
import { Table } from "../components/Taable";

export function Medic() {

  interface Professional {
    id: string;
    professional_name: string;
    typeProfessional: string;
    statusProf: string;
    rg: string;
    nivel?: string;
    password?: string;
    specialtyId: Array<number>;
    specialties: { id: string; specialty: { name_specialty: string; id: any; } }[];
  }

  const [profissionais, setProfessionals] = useState<Professional[]>([]);
  const [profissionaisModal, setProfessionalsModal] = useState<Professional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState({ message: '', type: '' });
  const [isEdit, setEdit] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number[]>([]);
  const [especialidade, setEspecialidade] = useState<{ id: number; name_specialty: string }[]>([]);

  const API_BASE_URL = 'http://localhost:3001'
  const token = localStorage.getItem('authToken');

  const TABLE_HEADERS = ['Nome', 'Tipo', 'status', 'RG', 'Especialidades'];

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cadastros`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfessionals(data.getUser);
      setEspecialidade(data.getSpecialty);
    } catch (error) { }
  } 

  function cadProf() {
    setProfessionalsModal({
      id: '',
      professional_name: '',
      typeProfessional: '',
      statusProf: '',
      rg: '',
      nivel: '',
      password: '',
      specialtyId: [],
      specialties: []
    });

    setSelectedSpecialty([]);
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
    if (professional) {
      const existingSpecialtyIds = professional.specialties.map(
        (spec) => (spec.specialty.id)
      );

      setProfessionalsModal(professional);
      setSelectedSpecialty(existingSpecialtyIds);
      setIsModalOpen(true);
      setEdit(false);
    }
  };

  const deleteProfessional = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/cadastros/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      setIsMessage({ message: 'Profissional deletado com sucesso', type: 'success' })
      fetchProfessionals();
    } catch {
      setIsMessage({ message: 'Ops, algo deu errado...', type: 'error' })
    }
  };

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

    if (selectedSpecialty.length === 0 || profissionaisModal.professional_name === '' || profissionaisModal.rg === '' || profissionaisModal.statusProf === '' ||
      profissionaisModal.typeProfessional === '' || (profissionaisModal.password === '' && isEdit) || profissionaisModal.nivel === '') {
      setIsMessage({ message: 'Preencha todos os campos', type: 'warning' })
      return;
    }

    const professionalData = {
      "professional_name": profissionaisModal.professional_name,
      "password": profissionaisModal.password,
      "statusProf": profissionaisModal.statusProf,
      "rg": profissionaisModal.rg,
      "nivel": Number(profissionaisModal.nivel),
      "typeProfessional": profissionaisModal.typeProfessional,
      "specialtyId": selectedSpecialty
    };

    try {
      const requestMethod = isEdit ? 'post' : 'patch';
      const url = isEdit
        ? `${API_BASE_URL}/cadastros`
        : `${API_BASE_URL}/cadastros/${profissionaisModal.id}`

      await axios[requestMethod](url, professionalData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsMessage({ message: requestMethod === 'post' ? 'Profissional cadastrado com sucesso' : 'Profissional atualizado com sucesso', type: 'success' })
      setEdit(false);
      setIsModalOpen(false);
      fetchProfessionals();
    } catch {
      setIsMessage({ message: 'Ops, algo deu errado...', type: 'error' })
    }
  }

  const renderEditModal = () => {
    if (!isModalOpen || !profissionaisModal) return null;
    return (
      <Modal
        tittle={isEdit ? 'Cadastrar Profissional' : 'Editar Profissional'}
        clickSave={updateModal}
        clickClose={closeModal}
      >
        <div className="mb-2">
          <ValueInput
            tittle={"Nome"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, professional_name: e })}
            value={profissionaisModal.professional_name}
            placeholder="Nome"
          />
        </div>
        <div className="flex gap-2 mb-2">
          <ValueInput
            tittle={"RG"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, rg: e })}
            value={profissionaisModal.rg}
            placeholder="RG"
          />
          <ValueInput
            tittle={"Senha"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, password: e })}
            value={profissionaisModal.password}
            placeholder={!isEdit ? "Alterar a sennha" : "Senha"}
          />
          <ValueSelect
            tittle={"Nivel"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, nivel: e.target.value })}
            value={profissionaisModal.nivel}
            options={[{ value: "", label: "Escolha um nivel" }, { value: "1", label: "Nivel 1" }, { value: "2", label: "Nivel 2" }, { value: "3", label: "Nivel 3" }, { value: "4", label: "Nivel 4" }]}
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <ValueSelect
            tittle={"Tipo"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, typeProfessional: e.target.value })}
            value={profissionaisModal.typeProfessional}
            options={[{ value: "", label: "Escolha um tipo" }, { value: "medico", label: "Médico" }, { value: "enfermeiro", label: "Enfermeiro" }]}
          />
          <ValueSelect
            tittle={"Status"}
            onchange={(e: any) => setProfessionalsModal({ ...profissionaisModal, statusProf: e.target.value })}
            value={profissionaisModal.statusProf}
            options={[{ value: "", label: "Escolha um status" }, { value: "ativo", label: "Ativo" }, { value: "inativo", label: "Inativo" }]}
          />
        </div>
        <div className="mb-2">
          <ValueSelect
            tittle={"Especialidade"}
            onchange={(e: any) => {
              const selectedId = Number(e.target.value);
              { selectedId && !selectedSpecialty.includes(selectedId) && setSelectedSpecialty((prevSelected) => [...prevSelected, selectedId]) }
            }}
            options={[{ value: "", label: "Escolha uma especialidade" }, ...especialidade.map(({ id, name_specialty }: any) => ({ value: id, label: name_specialty, }))
            ]}
          />
          <div className="w-full overflow-x-scroll flex items-cente h-[55px] text-center p-2 bg-white/70 rounded-b-md">
            {selectedSpecialty.length === 0 && <span className="text-gray-400">Nenhuma especialidade selecionada</span>}
            {especialidade
              .filter((item) => selectedSpecialty.includes(item.id))
              .map((item) => (
                <div
                  className="rounded-full w-fit px-3 items-center flex gap-2 border hover:border-blue-800/40 py-3 bg-blue-800/70 text-white mr-2 mb-2"
                  key={item.id}
                >
                  <span className="text-sm font-semibold"> {item.name_specialty} </span>
                  <button onClick={() => { setSelectedSpecialty((prevSelected) => prevSelected.filter((id) => id !== item.id)) }} >
                    <IoCloseCircleOutline />
                  </button>
                </div>))}
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Abas
      ClickButton={cadProf}
      Tittle="Profissionais"
      TittleBotton="Cadastrar Profissional"
    >
      {alertMessage()}
      <Table
        Delete={deleteProfessional}
        Edit={openModal}
        Data={[
          ...profissionais.map((professional) => [
            professional.id,
            professional.professional_name,
            professional.typeProfessional,
            professional.statusProf,
            professional.rg,
            professional.specialties.map((spec: any) => spec.specialty.name_specialty),
          ])]}
        Headers={TABLE_HEADERS} />
      {renderEditModal()}
    </Abas>
  );
}