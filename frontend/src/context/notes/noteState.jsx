import React, { useState } from "react";
import NoteContext from "./noteContext";
import axios from "axios";

const HOST_URL = "http://localhost:8000/api";
const NoteState = (props) => {
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  // FETCH ALL NOTES
  const getNotes = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/notes`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmZlYWI1ZTkwMWI0OWYxZWVmMGFhNSIsImlhdCI6MTcwNzIzMDg1NCwiZXhwIjoxNzA4NTI2ODU0fQ.4cpqN34uwBpbGml0D_oBvcN_bdZMPOj42YeDwc6tMac",
        },
      });
      const data = response.data.notes;
      console.log(data, "GET ALL NOTES");
      setNotes(data);
    } catch (error) {
      console.log("🚀 ~ getNotes ~ error:", error);
    }
  };

  //ADD NOTE
  const addNote = async (title, content, tag) => {
    //API CALL
    try {
      const response = await axios.post(
        `${HOST_URL}/notes`,
        {
          title: title,
          content: content,
          tag: tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmZlYWI1ZTkwMWI0OWYxZWVmMGFhNSIsImlhdCI6MTcwNzIzMDg1NCwiZXhwIjoxNzA4NTI2ODU0fQ.4cpqN34uwBpbGml0D_oBvcN_bdZMPOj42YeDwc6tMac",
          },
        }
      );
      const data = response.data.savedNote;
      console.log("🚀 ~ addNote ~ data:", data);
      const note = {
        _id: data._id,
        user: data.user,
        title: data.title,
        content: data.content,
        tag: data.content,
        date: data.date,
        __v: 0,
      };

      setNotes(notes.concat(note));
    } catch (error) {
      console.log("🚀 ~ getNotes ~ error:", error);
    }

    // const note = {
    //   _id: "65c0b81ebbc2149dec27d30d554",
    //   user: "65c0b659bbc2149dec27d2ff45",
    //   title: title,
    //   content: content,
    //   tag: tag,
    //   date: "2024-02-05T10:27:42.731Z",
    //   __v: 0,
    // };

    // setNotes(notes.concat(note));
  };
  //DELET A NOTE
  const deleteNote = async (id) => {
    console.log(id);
    // setNotes(notes.filter((note) => note._id !== id));
    try {
      const response = await axios.delete(`${HOST_URL}/notes/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmZlYWI1ZTkwMWI0OWYxZWVmMGFhNSIsImlhdCI6MTcwNzIzMDg1NCwiZXhwIjoxNzA4NTI2ODU0fQ.4cpqN34uwBpbGml0D_oBvcN_bdZMPOj42YeDwc6tMac",
        },
      });
      const data = response.data;
      console.log(data, "DELETE NOTE");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("🚀 ~ deleteNote ~ error:", error);
    }
  };
  //EDIT A NOTE

  const editNote = (id, title, content, tag) => {
    console.log("EDIT", id);
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.content = content;
        note.tag = tag;
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
