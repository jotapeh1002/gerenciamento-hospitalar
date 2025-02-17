interface TableProps {
    Headers: string[];
    Data: any[];
    Edit: (item: any) => void;
    Delete: (item: any) => void;
  }
  
  export const Table = ({ Headers, Data, Edit, Delete }: TableProps) => {
    return (
      <div className="w-full h-full overflow-x-auto">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] px-4 border-b bg-slate-500/20 p-1 text-blue-800 border-slate-400">
          {Headers.map((header, idx) => (
            <div key={idx} className="p-2 font-bold">{header}</div>
          ))}
          <div className="p-2 text-center font-semibold">Ações</div>
        </div>
        {Data.map((dataItem, rowIdx) => (
          <div key={rowIdx} className="grid items-center grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] px-4 border-b border-zinc-400/40">
            {dataItem.slice(1).map((item: any, colIdx: number) => (
              <div key={colIdx} className="p-2">
                {Array.isArray(item) ? (
                  item.length > 0 ? (
                    item.map((subItem: any, subIdx: number) => (
                      <div key={subIdx}>{subItem}</div>
                    ))
                  ) : (
                    "Sem Especialidades"
                  )
                ) : (
                  item
                )}
              </div>
            ))}
            <div className="py-3 flex justify-center gap-4 items-center text-center">
              <button onClick={() => Edit(dataItem[0])} className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600">Editar</button>
              <button onClick={() => Delete(dataItem[0])} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  