import React, { useContext } from "react";
import noteContext from "../../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const tag = e.target.tag.value;

    console.log(title, content, tag);
    addNote(title, content, tag);

    //Clear the form
  };
  return (
    <>
      <div className="flex items-center mb-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a note"
            id="title"
            name="title"
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2"
          />
          <input
            type="text"
            placeholder="Add Description"
            id="content"
            name="content"
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2"
          />
          <input
            type="text"
            placeholder="Add Tag"
            id="tag"
            name="tag"
            className="border-2 border-gray-300 px-3 py-2 rounded w-full mr-2"
          />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
