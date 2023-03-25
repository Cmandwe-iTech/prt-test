import Login from "./componenets/landing";
import SignUp from "./componenets/register";
import Home from "./componenets/home";
import AddNote from "./componenets/addnote";
import { Route, Routes } from "react-router-dom";
import NotesContextProvider from "./conextapi/notes_provider";
function App() {
  return (
    <div className="App">
      <NotesContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addnotes" element={<AddNote />} />
        </Routes>
      </NotesContextProvider>
    </div>
  );
}

export default App;
