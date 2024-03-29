import React, { useState } from "react";
import NoteContext from "./noteContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          "auth-token": JSON.parse(localStorage.getItem("token")),
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
            "auth-token": JSON.parse(localStorage.getItem("token")),
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
      toast.success("Note added successfully");
    } catch (error) {
      console.log("🚀 ~ getNotes ~ error:", error);
      toast.error(error.response.data.error);
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
          "auth-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      const data = response.data;
      console.log(data, "DELETE NOTE");
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("🚀 ~ deleteNote ~ error:", error);
      toast.error(error.response.data.error);
    }
  };
  //EDIT A NOTE

  const editNote = async (id, title, content, tag) => {
    console.log("EDIT", id);
    try {
      const response = await axios.put(
        `${HOST_URL}/notes/${id}`,
        {
          title: title,
          content: content,
          tag: tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      const data = response.data;
      console.log(data, "EDIT NOTE");
      const newNotes = notes.map((note) => {
        if (note._id === id) {
          note.title = title;
          note.content = content;
          note.tag = tag;
        }
        return note;
      });
      setNotes(newNotes);
      toast.success("Note updated successfully");
    } catch (error) {
      console.log("🚀 ~ editNote ~ error:", error);
      if (error.response && error.response.status !== 200) {
        // Handle non-2xx responses
        toast.error(error.response.data.error);
      } else {
        // Handle other errors
        toast.error("An error occurred while updating the note");
      }
    }
  };

  //CLEAR Notes

  const clearNotes = () => {
    setNotes([]);
  }

  return (
    <>
      <NoteContext.Provider
        value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, clearNotes }}
      >
        {props.children}
      </NoteContext.Provider>
      <ToastContainer />
    </>
  );
};

export default NoteState;
