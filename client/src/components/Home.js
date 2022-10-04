import React , {useEffect , useState} from 'react'

const Home = () => {

  const [userName , setUserName] = useState("")
  const [show , setShow] = useState(false)
  
  const callHomePage = async () =>{
    try {
      const res = await fetch("/getUserData" , {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        } , 
      })

      const data = await res.json();
      
      setUserName(data.name )
      setShow(true)
     
    } catch (error) {
      console.log(error)

    }
  }
  
  useEffect(()=>{
    callHomePage();
  } , []) 

  return (
    <>
    <div class="container-fluid bg-black " style={{height:"90vh"}}>
<br /><br /><br />
        <div class="container jumbotron rounded" style={{width:"50%"}}>
            <h4 class="text-success text-center ">Welcome</h4>
           <br />
           <h1 class="text-primary text-center">{userName}</h1><br />
            <h2 class="text-secondary text-center">{show ? "Happy To See You Back :)":"We are Mern Developer"}</h2> 
        </div>
        </div>
    </>
  )
}

export default Home