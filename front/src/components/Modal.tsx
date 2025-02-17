import { useState, useEffect } from 'react';

interface ValueSelectProps {
  children: React.ReactNode;
  tittle?: any;
  clickSave: any;
  clickClose?: any;
}

export const Modal = ({ children, tittle = '', clickSave, clickClose }: ValueSelectProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black/75 flex justify-center items-center z-30 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`} >
      <div
        className={`bg-zinc-400/90 rounded-lg overflow-auto w-[70%] transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-90'
          }`} >
        <h2 className="text-xl font-bold p-6 bg-blue-800/70 text-white/90">{tittle}</h2>
        <div className="p-6">{children}</div>
        <div className="flex gap-4 justify-end mt-5 px-6 pb-6 text-white/90">
          <div
            className="bg-gray-500 rounded-md px-3 py-2 items-center hover:bg-gray-600"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => clickClose(), 300);
            }} >
            Fechar
          </div>
          <div
            className="bg-blue-800/70 rounded-md px-3 py-2 items-center hover:bg-blue-900/90"
            onClick={() => { clickSave() }} >
            Salvar Alterações
          </div>
        </div>
      </div>
    </div>
  );
};