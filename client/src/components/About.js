import React, {useEffect , useState} from 'react' 
import { useNavigate } from 'react-router-dom';


const About = () => {
  const [userData , setUserData] = useState({})
  const history = useNavigate();

  const callAboutPage = async () =>{
    try {
      const res = await fetch("/about" , {
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        } , 
        credentials:"include"
      })

      const data = await res.json();
      console.log(data)
      setUserData(data)

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;

      }

    } catch (error) {
      console.log(error)
      history('/login');

    }
  }
  
  useEffect(()=>{
    callAboutPage();
  } , [])

  return (
    <>
    
    <div class="container-fluid bg-black " style={{height:"90vh"}}>
    <form  method="GET">
     <div class="container "><br />
      <h1 class="text-center text-uppercase font-weight-bold "><span class="text-secondary">{userData.name}</span>
      </h1>
      <h3 class="text-center text-uppercase font-weight-bold "> <span class="text-secondary">{userData.work}</span>
      </h3>
      <br />
     </div>
     
        <div class="jumbotron container " style={{width:"50%"}} >
          <h3 class=" text-primary text-center"><u>About</u></h3>
          <br />
          <div className='row'>
          <div class="col text-right text-uppercase font-weight-bold">User ID :</div>
          <div class="col text-success font-weight-bold">{userData._id}</div>
          </div>
          <div className='row'>
          <div class="col text-right text-uppercase font-weight-bold"> Name :</div>
          <div class="col text-success font-weight-bold">{userData.name}</div>
          </div>
          <div className='row'>
          <div class="col text-right text-uppercase font-weight-bold">Email :</div>
          <div class="col text-success font-weight-bold">{userData.email}</div>
          </div>
          <div className='row'>
          <div class="col text-right text-uppercase font-weight-bold">Phone :</div>
          <div class="col text-success font-weight-bold">{userData.phone}</div>
          </div>
          <div className='row'>
          <div class="col text-right text-uppercase font-weight-bold">Proffession :</div>
          <div class="col text-success font-weight-bold ">{userData.work}</div>
          </div>
         
        </div>
        
        </form>
        <br />
        </div>
    </>
  )
}

export default About