import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "./notes";
import axios from "axios";
const NotesContextProvider = (props) => {
  const [user, setuser] = useState({ email: "", password: "" });
  const [data, setdata] = useState({ email: "", password: "" });
  const [notes, setNotes] = useState({ tite: "", description: "" });
  const [details, setdetails] = useState([]);
  const navigate = useNavigate();
  const fetchdata = () => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios.get("https://notesbackend-wg6k.onrender.com/notes", config).then((res) => {
      setdetails(res.data.note);
      navigate("/home");
    });
  };

  const login = () => {
    axios.post("https://notesbackend-wg6k.onrender.com/login", user).then((res) => {
      if (res.status === 200) {
        alert("login successfully");
        window.localStorage.setItem("token", res.data.token);
        fetchdata();
        navigate("/home");
      } else {
        alert("register first");
      }
    });
  };
  const signup = () => {
    axios.post("https://notesbackend-wg6k.onrender.com/register", data).then((res) => {
      if (res.status === 200) {
        alert("register successfully");
        navigate("/");
      } else {
        alert("user already exist");
        navigate("/");
      }
    });
  };
  const createnotes = () => {
    const token = window.localStorage.getItem("token");
    const config = {
      headers: {
        authorization: token,
      },
    };
    axios.post("https://notesbackend-wg6k.onrender.com/notes", notes, config).then((res) => {
      if (res.status === 200) {
        alert("notes added");
        fetchdata();
      }
    });
  };
  const updatenotes = (id) => {
    axios.put(`https://notesbackend-wg6k.onrender.com/${id}`).then((res) => {
        if(res.status === 200){
            fetchdata()
        }
    });
  };
  const deletnotes = (id) => {
    axios.post(`https://notesbackend-wg6k.onrender.com/${id}`).then((res) => {
        if(res.status === 200){
            fetchdata()
        }
    });
  };
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <NoteContext.Provider
      value={{
        user,
        setuser,
        data,
        setdata,
        details,
        login,
        signup,
        notes,
        setNotes,
        createnotes,
        logout,
        updatenotes,
        deletnotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesContextProvider;
