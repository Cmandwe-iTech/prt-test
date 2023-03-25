import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NoteContext } from "../conextapi/notes";
const Home = () => {
  const { details, logout, deletnotes } = useContext(NoteContext);
  const [ss, setss] = useState(true);
  const [text, settext] = useState("");
  const [fd, setfd] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (text === "") {
      setfd(details);
    } else {
      let filterdata = details.filter((item, i) =>
        item.title.toLowerCase().includes(text)
      );
      setfd(filterdata);
    }
  }, [details, text, setfd]);
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
        <input
          type="text"
          id="searchbar"
          placeholder="search here..."
          onChange={(e) => settext(e.target.value)}
        />
        <div className="display">
          {fd.map((item, i) => {
            return (
              <div key={i}>
                {ss ? (
                  <div className="div2" onClick={() => setss(false)}>
                    <p>{item.date}</p>
                    <p>{item.title}</p>
                  </div>
                ) : (
                  <div className="div3">
                    <p>{item.date}</p>
                    <p>{item.description}</p>
                    <button
                      className="btns"
                      onClick={() => {
                        deletnotes(`${item._id}`);
                      }}
                    >
                      delete
                    </button>
                    <button className="btns">update</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
