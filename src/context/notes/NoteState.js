import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
   const notesInitial =[
    {
      "_id": "6507120cf61bf49535700b48",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat",
      "tag": "coders",
      "date": "2023-09-17T14:49:48.025Z",
      "__v": 0
    },
    {
      "_id": "65071227f61bf49535700b4b",
      "user": "6506fa8c263bbc9adfe0ef05",
      "title": "my title",
      "description": "eat sleep code repeat ok...",
      "tag": "coders",
      "date": "2023-09-17T14:50:15.345Z",
      "__v": 0
    }
  ]
  const [notes , setNotes] = useState(notesInitial)
  
    return (
        <NoteContext.Provider value ={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;