import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import {TodoForm} from "../TodoForm";
import { Modal } from "../Modal";


function AppUI() {
    const {
        error,
        loading,
        searchTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
    } = React.useContext(TodoContext);

    return(
        <React.Fragment>
      
            <TodoCounter/>
        
            <TodoSearch/>
    
            <CreateTodoButton
                setOpenModal={setOpenModal}
            
            />

            <TodoList>
                {error && <p>Caramba, hubo un error!!</p>}
                {loading && <p>Espera, estamos cargando...</p>}
                {(!loading && !searchTodos.length) && <p>Crea tu primer TODOs!</p>}
                
                {searchTodos.map(todo => (
                    <TodoItem 
                        key={todo.text} 
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete= {() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>

            {!!openModal && (
                <Modal>
                   
                   <TodoForm/>

                </Modal>
            )}
            
          
                     
        </React.Fragment>
    );
}

export { AppUI }