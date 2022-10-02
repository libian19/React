import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css";

function TodoForm(){
    //Se crea un estado para añadir el nuevo todo
    const [newTodoValue, setNewTodoValue]= React.useState('');

    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onCancel = () => {
        setOpenModal(false);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    };
    
    
    return(
        <form onSubmit = {onSubmit}>
            <label>
                ¿Cuál es la tarea a realizar?       
            </label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Escribe aqui el TODO"
                required
            
            />
            <div className="formButton-container">
                <button 
                className="formButton forButton-cancel"
                type="button"
                onClick={onCancel}
                >
                    Cancelar
                </button>
                <button 
                className="formButton formButton-add"
                type="submit"
                >
                    Añadir
                </button>
                
            </div>
        </form>
    );
}

export {TodoForm};
