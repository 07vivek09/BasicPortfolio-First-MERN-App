import React , {useState , useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';


const Login = () => {

  const {state , dispatch} = useContext(userContext)

  const history = useNavigate();
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const userLogin = async (e)=>{ 
    e.preventDefault();
    const res = await fetch("/signin" , {
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      email,
      password
    })
    })

    const data = await res.json();
    if(res.status === 422){
      const er = data.error
      window.alert(er)
    }

    else if(res.status === 400 || !data){
      const er = data.error
      window.alert(er)
    }else{
      dispatch({type:"USER" , payload:true})
      const er = data.message
      window.alert(er)
      history('/');
    }
  }
  return (
    <>
       <div class="container-fluid bg-black " style={{height:"92vh"}}>
            <br /><br />
            <div class="container jumbotron rounded" style={{width:"50%"}}>
            <h3 >Login</h3>
            <br />
                <form method='POST' >
                   
                    <div class="form-group">
                        <input type="email" class="form-control"  placeholder="Your Email" autoComplete='off'
                        value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                  
                    <div class="form-group">
                        <input type="password" class="form-control"  placeholder="Your Password" autoComplete='off'
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                   
                    <br />
                    <button type="submit" class="btn btn-primary" onClick={userLogin}>Login</button>
                </form>
                <br />
                <NavLink className="nav-link" to="/registration">New User ? Register Insted</NavLink>
                </div>
            </div>
    </>
  )
}

export default Login