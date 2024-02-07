import React, { useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(title, content, tag);

    // Clear the form fields after submission
    setTitle("");
    setContent("");
    setTag("");
  };

  const resetForm = () => {
    // Reset form fields
    setTitle("");
    setContent("");
    setTag("");
  };

  return (
    <>
      <div className="flex items-center mb-10 justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2  mb-3 border-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2 mb-3  border-none"
            placeholder="Add Content"
          ></textarea>
          <input
            type="text"
            placeholder="Add Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2 mb-3 border-none"
          />

          <div className="flex items-center justify-between">
            <button
              type="button" 
              onClick={resetForm}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2  w-[30%]"
            >
              Reset
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[60%]"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
