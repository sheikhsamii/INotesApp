import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "../components/Notes/AddNote";
import ItemNotes from "../components/Notes/ItemNotes";

const Home = () => {
  const { notes, setNotes } = useContext(noteContext);
  console.log(notes);
  return (
    <div className="bg-[#f5f5f5]  px-10 py-10 mx-auto flex flex-col justify-center align-middle w-[1200px]">
      <h1 className="text-3xl font-bold mx-10 my-4 text-center">Notes</h1>

      {/* ADD A NOTE SECTION */}
      <AddNote />
    <ItemNotes notes={notes} setNotes={setNotes}/>
     
    </div>
  );
};

export default Home;
