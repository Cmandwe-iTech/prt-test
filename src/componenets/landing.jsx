import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { NoteContext } from "../conextapi/notes";
const Login = () => {
  const { user, setuser, login } = useContext(NoteContext);
  const [check, setcheck] = useState(false);
  const submithandler = () => {
    if (check) {
      login();
    } else {
      alert("not ok");
    }
  };
  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <div className="div">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter email here..."
          className="input"
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="div">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="enter password here..."
          className="input"
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
      </div>
      <input type="checkbox" id="check" onChange={() => setcheck((p) => !p)} />
      <label htmlFor="check">remember me?</label>
      <div>
        <button onClick={submithandler}>Submit</button>
      </div>
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
    </div>
  );
};
export default Login;
