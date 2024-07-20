import Button from "./Button";

const Input=(
    {
        label='',
        name='',
        className ='',
        inputClassName='',
        type = 'text',
        isRequired = "false",
        placeholder = '',
        value='',
        onChange=()=>{},
    }
)=>{

return(
    <>
   
 
    <div className={`w-1/2 ${className}`}>
      <label className="block uppercase tracking-wide text-gray-700 text-sl font-bold mb-2" >
        {label}
      </label>
      <input  value ={value} onChange = {onChange} className= {`appearance-none block w-full h-12 bg-light text-gray-700 border  rounded-1 py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white  ${inputClassName}`} id={name} type={type} isrequired={isRequired} placeholder={placeholder}/>
     
    </div>
  
 

    </>
)
}

export default Input;