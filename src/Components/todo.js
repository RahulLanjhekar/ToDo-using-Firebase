import React, { useEffect } from 'react'
import { useState } from 'react';
import "./style.css"

// TO GET DATA FROM LOCAL STORAGE

const getLocalData = () => {
    const localData = localStorage.getItem("TodoList");

    if(localData){
        return JSON.parse(localData) // TO CONVERT DATA INTO AN ARRAY
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setinputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [toggleMenu, settoggleMenu] = useState(false);

    const fireBase = async () => {
        const resp = await fetch("https://todolist-7c9fa-default-rtdb.firebaseio.com/todo.json",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(items)  // IF IT WOULD HAVE BEEN AN OBJECT, WE WOULD HAVE TO SET LIKE { key: value }
                                               //  BUT IF NAME OF KEY AND VALUE IS SAME, IT WOULD BE {key}.
        });
    }

            //  USING useEffect SO IT CALLS THE FUNCTION WHENEVER items CHANGES.

    useEffect(() => {
        fireBase();
    },[items])
    

    const addItem = () => {
        if(!inputData){
            alert("Please fill some data.")
        } else {
            setItems([...items, inputData]);
            setinputData("");
        }
        
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((curElem, index) => {
            return index !== id;
        })
        setItems(updatedItems);
    }

    // EDIT ITEMS

    const editInput = (curElem) => {
            setinputData(curElem)
            settoggleMenu(true);
    }

    // ADDING LOCAL STORAGE IN KEY VALUE PAIR

    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(items));    // TO CONVERT DATA INTO A STRING
    },[items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here :)</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                        placeholder="Add Items"
                        className="form-control"
                        value={inputData}
                        onChange={(event) => setinputData(event.target.value)}
                        />
                        {toggleMenu ? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                         : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>

                    {/* DISPLAYING ITEMS */}

                    <div className="showItems">
                        {items.map((curElem, index) => {
                            return (
                                <div className="eachItem" key={index}>
                                <h3>{curElem}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={() => editInput(curElem)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(index)}></i>
                                </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={() => setItems([])}>
                            <span> CHECK LIST </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo
