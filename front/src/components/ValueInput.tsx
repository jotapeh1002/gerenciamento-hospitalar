interface ValueInputProps {
  onchange: any
  value?: any
  tittle?: any
  type?: string
  placeholder?: string
}

export const ValueInput = ({ onchange, value = '', tittle = '', type = 'text', placeholder }: ValueInputProps) => {
  return (
    <div className="w-full">
      {tittle.length > 0 && <div className="mb-2 ml-1">{tittle}</div>}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/70 rounded-md border-transparent focus:outline-none 
        focus:ring-1 focus:ring-blue-500 p-2 hover:border-blue-800/40 border-2"
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
}