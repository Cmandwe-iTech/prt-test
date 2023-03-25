import "./home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NoteContext } from "../conextapi/notes";
const AddNote = () => {
  const { notes, setNotes, createnotes, logout } = useContext(NoteContext);
  return (
    <div className="container">
      <div className="header">
        <Link to="/home">
          <div>Home</div>
        </Link>
        <Link to="/addnotes">
          <div>AddNote</div>
        </Link>
        <di>DeletAll</di>
        <div>Export</div>
        <div>
          <p onClick={() => logout()}>LogOut</p>
        </div>
      </div>
      <div className="section">
        <h3>Title</h3>
        <input
          type="text"
          placeholder="title..."
          onChange={(e) => setNotes({ ...notes, title: e.target.value })}
        />
        <h3>Description</h3>
        <textarea
          cols="50"
          rows="5"
          placeholder="what's on your mind"
          onChange={(e) => setNotes({ ...notes, description: e.target.value })}
        />
        <br />
        <button id="btn" onClick={() => createnotes()}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default AddNote;
