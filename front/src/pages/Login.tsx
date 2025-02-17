import { Lock, User } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../components/verifyToken'
import { Loading } from '../components/Loading'

export function Login() {

  const navigate = useNavigate();

  const [rg, setRg] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyToken()
      setLoading(false);
      if (isAuthenticated) { navigate('/Home') }
    };
    checkAuth()
  }, [navigate])

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3001/auth', { password, rg:removeRgMask(rg) })
      localStorage.setItem('authToken', response.data.token)
      navigate('/Home');
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || 'Erro na autenticação')
        setShowModal(true)
        localStorage.removeItem('authToken')
        setShowModal(true)
      }
    }
  }

  const transitions = useTransition(showModal, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    config: { tension: 300, friction: 15 },
  });

  const overlayTransitions = useTransition(showModal, {
    from: { opacity: 0 },
    enter: { opacity: 0.7 },
    leave: { opacity: 0 },
    config: { tension: 200, friction: 30 },
  });

  const applyRgMask = (value: string) => {
    return value.replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
  };

  const removeRgMask = (value: string) => {
    return value.replace(/\D/g, ''); 
  };

  const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyRgMask(e.target.value);
    setRg(maskedValue);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center relative overflow-hidden bg-[url('../public/fondo2.jpg')] bg-cover">
      <div className='h-screen w-screen bg-blue-800/80 items-center justify-center flex'>
        <div className="relative z-10 w-full max-w-md bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl py-8 px-10">
          <img src="../public/e-sus-icon.png" className="w-[60%] h-[90px] mx-auto mb-10 mt-4" />
          {['RG', 'Senha'].map((_, idx) => (
            <div key={idx} className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {idx === 0 ? <User className="text-blue-500" size={20} /> : <Lock className="text-blue-500" size={20} />}
              </div>
              <input maxLength={14}
                onChange={idx === 0 ? handleRgChange : (e) => setPassword(e.target.value)}
                value={idx === 0 ? rg : undefined}
                type={idx === 0 ? 'text' : 'password'}
                placeholder={idx === 0 ? 'Digite seu RG' : 'Digite sua Senha'}
                className="w-full pl-12 pr-4 py-3 border-2 bg-white/50 text-blue-500 border-transparent rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out placeholder-blue-500 hover:border-blue-500"
              />
               </div>
          ))}
          <div
            onClick={login}
            className="w-full bg-blue-600 justify-center items-center flex text-white py-3 rounded-lg hover:bg-blue-700
             shadow-md hover:shadow-lg focus:ring-4"> Acessar Sistema
          </div>
          <div className="text-center mt-8 mb-3">
            <a href="#" className="text-blue-600 hover:underline text-sm flex items-center justify-center">
              <Lock className="mr-2" size={16} /> Recuperar Acesso
            </a>
          </div>
        </div>
      </div>
      {transitions(
        (style, item) => item && (
          <>
            {overlayTransitions(
              (overlayStyle, overlayItem) =>
                overlayItem && (
                  <animated.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black"
                    style={{ ...overlayStyle }} />))}
            <animated.div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={style}>
              <animated.div
                className="bg-white/75 p-6 rounded-lg shadow-xl max-w-sm border-2 border-gray-400 w-80 flex flex-col items-center justify-center"
                style={style}>
                <h2 className="text-xl font-semibold text-red-600 mb-4 text-center">Ops..!</h2>
                <p className="text-gray-700 mb-4 text-center">{message}</p>
                <button onClick={() => setShowModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"> Fechar
                </button>
              </animated.div>
            </animated.div>
          </>
        )
      )}
    </div>
  );
}