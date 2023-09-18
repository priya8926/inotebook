import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
     // Define your initial state
    const s1 ={
        "name" : "priya",
        "class" : "5a",
    }
    // Use the useState hook to create state and a setState function
    const[state , setState] = useState(s1);
    const update = () =>{
        setTimeout(()=>{
             // Use the setState function to update the state
            setState({
                "name" : "riya",
                "class" : "5b"
            })
        },3000)
    }
    return (
        <NoteContext.Provider value ={{state:state ,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;