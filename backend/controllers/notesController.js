import Notes from "../models/Notes.js";
//ROUTE 1 ---> Get All Notes
export const getAllNotes = async (req, res) => {
  const userId = req.user.id;
  try {
    console.log(userId, "User Id");
    const notes = await Notes.find({ user: userId });
    res.status(200).json({
      message: "Notes fetched successfully",
      success: true,
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

//ROUTE 2 ---> Add Note

export const addNote = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const newNote = new Notes({
      title,
      content,
      tag,
      user: req.user.id,
    });
    const savedNote = await newNote.save();
    res.status(200).json({
      message: "Note added successfully",
      success: true,
      savedNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

//ROUTE 3 ---> Update Note

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tag } = req.body;
  try {
    //Find Note by id

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        msg: "Note not found",
      });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Not Allowed to update this note",
      });
    }

    //Find the note to be updated and update it
    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      { title, content, tag },
      { new: true }
    );
    res.status(200).json({
      message: "Note updated successfully",
      success: true,
      updatedNote,
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};


//ROUTE 4 ---> Delete Note

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    //Find Note by id

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        msg: "Note not found",
      });
    }

     //ALLOW ONLY THE USER WHO CREATED THE NOTE TO DELETE IT

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Not Allowed to delete this note",
      });
    }

    //Find the note to be deleted and delete it

    await Notes.findByIdAndDelete(id);

    

    res.status(200).json({
      message: "Note deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
}
