import axios from 'axios';

export const verifyToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('Nenhum token encontrado');
      return false;
    }
    
    const response = await axios.post(
      'http://localhost:3001/protected',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return false;
  }
};
