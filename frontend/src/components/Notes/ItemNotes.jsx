import React, { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import noteContext from "../../context/notes/noteContext";
import Modal1 from "../Modals/Modal1";

const ItemNotes = ({ notes }) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote , getNotes } = context;

    const [isEditOpen,  setisEditOpen] = useState(false);

    //HANDLE THE OPEN OF THE MODAL WHEN THE EDIT BUTTON IS CLICKED
    const handleEditModal = (noteID) => {
        console.log(noteID);
        setisEditOpen(true);
    }
    //HANDLE THE CLOSE OF THE MODAL WHEN THE EDIT BUTTON IS CLICKED

    const handleCloseModal = () => {
        setisEditOpen(false);
    }

    useEffect(() => {
        
        getNotes()
        
    },[])
 
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes &&
                notes.map((note, index) => (
                    <div
                        key={note._id}
                        className="bg-white shadow-md rounded p-4 flex items-center justify-between"
                    >
                        <div className="px-2 py-4">
                            <h2 className="mr-2 font-bold mb-4">Title: <span className="font-normal">
                                {note.title} </span> </h2>
                            <p className="font-bold">Desc:
                                <span className="font-normal">{note.content}</span>
                            </p>
                        </div>
                        <MdEdit
                            className="cursor-pointer text-blue-500 hover:text-blue-800 text-xl mr-2"
                            onClick={() => handleEditModal(note._id)} // Add edit functionality
                        />
                        <MdDelete
                            className="cursor-pointer text-red-500 hover:text-red-800 text-xl"
                            onClick={() => deleteNote(note._id)}
                            />
                    </div>
                ))}
          {  isEditOpen  &&  <Modal1 isOpen={isEditOpen}  closeModal={handleCloseModal} />}
                  
        </div>
    );
};

export default ItemNotes;
