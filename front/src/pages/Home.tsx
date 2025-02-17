import { Abas } from "../components/Abas";

export function Home() {
  return (
    <Abas
      Color="bg-slate-500"
      Header={false}>
      <div className="px-6 pt-9 text-white">
        <div className="text-center text-3xl font-semibold mb-6">Dashboard Interativo</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-500 text-white p-6 border-l-8 border-blue-800 rounded-lg transform hover:scale-105 transition-transform">
            <div className="text-lg">Médicos Ativos:</div>
            <div className="text-3xl text-red-500 font-bold">0</div>
          </div>
          <div className="bg-gray-400 text-white p-6 border-l-8 border-blue-800 rounded-lg transform hover:scale-105 transition-transform">
            <div className="text-lg">Médicos Inativos:</div>
            <div className="text-3xl text-red-500 font-bold">0</div>
          </div>
          <div className="bg-green-500 text-white p-6 border-l-8 border-blue-800 rounded-lg transform hover:scale-105 transition-transform">
            <div className="text-lg">Enfermeiros Ativos:</div>
            <div className="text-3xl text-red-500 font-bold">0</div>
          </div>
          <div className="bg-gray-400 text-white p-6 border-l-8 border-blue-800 rounded-lg transform hover:scale-105 transition-transform">
            <div className="text-lg">Enfermeiros Inativos:</div>
            <div className="text-3xl text-red-500 font-bold">0</div>
          </div>
        </div>
      </div>
    </Abas >
  );
}
