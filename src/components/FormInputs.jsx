import { handleInputChange } from "../utils/handleChange";



const Label= ({htmlFor, labelName} ) => {
    return (
        <label htmlFor={htmlFor} className=" block text-sm font-medium text-gray-700">
            {labelName}
        </label>
    )
}



const InputField = ({ type, id, name, placeholder, required, value, setData }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => handleInputChange(e, setData)}
        />
    );
};



const TextArea = ({  id, name, placeholder, required, value, setData }) => {
    return (
        <textarea
            id={id}
            name={name}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => handleInputChange(e, setData)}
        />
    );
};





const AuthButton = ({type, buttonName, onClick, isLoading}) => {
    return (
        <button 
            type={type}
            className="cursor-pointer w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            onClick={(e) => onClick(e)}
        >
            {isLoading ? (<span className="animate-pulse">{buttonName}ing... </span>)
                : `${buttonName}`}
        </button>
    )
}
const Button = ({type, buttonName, onClick, isLoading}) => {
    return (
        <button 
            type={type}
            className="cursor-pointer py-1 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            onClick={(e) => onClick(e)}
        >
            {isLoading ? (<span className="animate-pulse">{buttonName}ing... </span>)
                : `${buttonName}`}
        </button>
    )
}



export {InputField, TextArea, AuthButton, Button, Label}