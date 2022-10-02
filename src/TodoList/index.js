import React from "react";
import "./TodoList.css";
//import {TodoContext} from '../TodoContext'
//import { TodoItem } from "./TodoItem";

function TodoList(props){
    return(
        <section>
            <ul className="TodoList">
                {props.children}
            </ul>
        </section>
    ); 
}

export { TodoList };