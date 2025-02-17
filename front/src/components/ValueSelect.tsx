interface ValueSelectProps {
    onchange: any
    value?: any
    options: any
    tittle?: any
}

export const ValueSelect = ({onchange, options, value = '', tittle=''}: ValueSelectProps) => {
    return (
        <div className="w-full">
             {tittle.length > 0 && <div className="mb-2 ml-1">{tittle}</div>}
              <select name="nivel" className="w-full border-transparent focus:outline-none 
                focus:ring-1 focus:ring-blue-500 bg-white/70 rounded-md hover:border-blue-800/40 p-2 border-2"
                value={value}
                onChange={(e) => {onchange(e)}}
              >
                {options.map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
    );
}