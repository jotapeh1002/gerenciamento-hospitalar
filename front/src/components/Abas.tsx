import { useState } from "react";
import { CiStethoscope, CiMenuBurger, CiMedicalClipboard, CiCalendar, CiGrid41, CiUser } from "react-icons/ci";
import { PiBedLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
interface AbasProps {
    children: any
    ClickButton?: any
    Header?:boolean
    Tittle?: string
    TittleBotton?: string
    Color?: string
}

export function Abas({ children, ClickButton, Header = true, Tittle, TittleBotton, Color = 'bg-zinc-300' }: AbasProps) {
    const navigate = useNavigate();
    const size = 25;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="flex w-full">
            <div className={`flex shadow-lg flex-col ${isExpanded ? 'w-[200px]' : 'w-[65px]'} ${isExpanded ? 'items-start pl-3' : 'items-center'} justify-between pt-2 pb-8 bg-zinc-400/60 h-screen transition-all duration-300`}>
                <div className="gap-6 flex flex-col">
                    <div onClick={toggleSidebar} className="hover:text-white hover:bg-blue-800 max-w-10 p-2 rounded-lg text-blue-800">
                        <CiMenuBurger size={size} />
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800" onClick={() => { navigate('/home') }}>
                        <CiGrid41 size={size} className={`${isExpanded && 'mr-2'}`} />{isExpanded && 'Dashboard'}
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800" onClick={() => { navigate('/medic') }}>
                        <CiStethoscope size={size} className={`${isExpanded && 'mr-2'}`} /> {isExpanded && 'Medicamentos'}
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800" onClick={() => { navigate('/patient') }}>
                        <CiUser size={size} className={`${isExpanded && 'mr-2'}`} /> {isExpanded && 'Pacientes'}
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800" onClick={() => { navigate('/procedure') }}>
                        <PiBedLight size={size} className={`${isExpanded && 'mr-2'}`} /> {isExpanded && 'Quartos'}
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800">
                        <CiMedicalClipboard size={size} className={`${isExpanded && 'mr-2'}`} />{isExpanded && 'Atendimentos'}
                    </div>
                    <div className="hover:text-white flex hover:bg-blue-800 p-2 rounded-lg text-blue-800">
                        <CiCalendar size={size} className={`${isExpanded && 'mr-2'}`} />{isExpanded && 'Agendamentos'}
                    </div>
                </div>
                <div onClick={()=>{
                     localStorage.clear();
                     navigate('/');
                    }}
                className="hover:text-white items-center justify-center flex hover:bg-blue-800 p-2 rounded-lg text-blue-800">
                    <img width={40} height={40} src="../public/user.png" alt="User" className={`${isExpanded && 'mr-2'}`} />{isExpanded && 'Perfil '}
                </div>
            </div>
            <div className="flex w-full bg-slate-400">
                <div className="w-full h-screen p-2">
                    <div className={`w-full h-full ${Color} overflow-hidden rounded-md`}>
                       {Header ===true && <div className="bg-blue-800/70 flex justify-between items-center px-6 py-6 text-lg font-semibold text-white/85">
                            <span>{Tittle}</span>
                            <button onClick={()=>ClickButton()} className="rounded-full bg-gray-600/70 px-3 hover:bg-gray-500 py-2 text-sm font-semibold text-white/85">
                                {TittleBotton}
                            </button>
                        </div> }
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
