import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { NoteContext } from "../conextapi/notes";
const SignUp = () => {
    const {data,setdata,signup} = useContext(NoteContext)
    const [repeat, setrepeat] = useState("")
    const [check, setcheck] = useState(false)
    const signuphandler=()=>{
        if(isValid && check){
            signup()
        }
    }
    let isValid=(user)=>{
        if(!data.email){
            alert("email is require")
            return 0
        }else if(!data.password){
            alert("password is require")
            return 0
        }else if(data.password.length < 5 ){
            alert("password should be greater than 4 characters")
            return 0
        }else if(data.password.length >= 10 ){
            alert("password should be less than 10 characters")
            return 0
        }else if(!repeat){
            alert("repeat password is required")
            return 0
        }else if(user.password !== repeat){
            alert("passwords are not matching")
            return 0
        }
        return 1
    }
  return (
    <div className="login-container">
      <h1>Register</h1>
      <div className="div">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter email here..."
          className="input"
          onChange={(e) => setdata({ ...data, email: e.target.value })}
        />
      </div>
      <div className="div">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="enter password here..."
          className="input"
          onChange={(e) => setdata({ ...data, password: e.target.value })}
        />
      </div>
      <div className="div">
        <label htmlFor="repeat">Password</label>
        <input
          type="password"
          id="repeat"
          placeholder="enter confirm password here..."
          className="input"
          onChange={(e) => setrepeat(e.target.value )}
        />
      </div>
      <input type="checkbox" id="check" onChange={()=>setcheck((p)=>!p)}/>
      <label htmlFor="check">I agree with terms and conditions</label>
      <div>
        <button onClick={signuphandler}>Signup</button>
      </div>
      <Link to="/"><button>Sign In</button></Link>
    </div>
  );
};
export default SignUp;
