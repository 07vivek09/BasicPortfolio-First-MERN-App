import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Registration = () => {
    const history = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();

        const { name , email, phone, work, password, cpassword } = user ; 

       const res = await fetch("/register" , {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name , email, phone, work, password, cpassword
            })
        })

        const data = await res.json();
           
        if(res.status === 422 || !data){
            const er = data.error
            window.alert(er)
            console.log("Invalid Registration");
        }else if(res.status === 500 ){
            const er = data.error
            window.alert(er)

        }else{
            const er = data.message
            window.alert(er)
           
            history('/login');
        }
    }


    return (
        <>
            <div class="container-fluid bg-black " style={{height:"92vh"}}>
                <br />
                <div class="container jumbotron rounded" style={{width:"50%" , height:"84vh"}}>
                <h3 className='text-center'>Registration Form</h3>
                
                <form method='post'>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Name"
                            name="name" value={user.name} onChange={handleInputs} autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Your Email"
                            name="email" value={user.email} onChange={handleInputs} autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" placeholder="Your Phone-Number"
                            name="phone" value={user.phone} onChange={handleInputs} autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Profession"
                            name="work" value={user.work} onChange={handleInputs} autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Your Password"
                            name="password" value={user.password} onChange={handleInputs} autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Confirm Password"
                            name="cpassword" value={user.cpassword} onChange={handleInputs} autoComplete='off' />
                    </div>
                        <div class="row">
                 <div className='col'> <button type="submit" class="btn btn-primary" onClick={postData}>Register</button> </div>  
                  
                 <div className='col'>  <NavLink className="nav-link" to="/login">Already a user ? Login Instead</NavLink> </div>    
                    </div>
                </form>
               
            </div>
          
            </div>
        </>
    )
}

export default Registration