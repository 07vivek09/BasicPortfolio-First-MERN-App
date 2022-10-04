import React , {useEffect , useState} from 'react'

const Contact = () => {
   
    const [userData , setUserData] = useState({name:"" , email:"" , phone:"" , message:""})
  
    const callContactPage = async () =>{
      try {
        const res = await fetch("/getUserData" , {
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          } , 
        })
  
        const data = await res.json();
        console.log(data)
        setUserData({...userData , name:data.name , email:data.email , phone:data.phone})
  
        if(!res.status === 200){
          const error = new Error(res.error);
          throw error;
  
        }
  
      } catch (error) {
        console.log(error)
  
      }
    }
    
    useEffect(()=>{
      callContactPage();
    } , []) 

    // storing data in states

    const handleInputs = (e)=>{
        const name = e.target.name ; 
        const value = e.target.value ;

        setUserData({...userData , [name]:value })

    } 

    const contactForm = async (e)=>{
        try {
            e.preventDefault();
            console.log("state of contact form ", userData)
            const {name , email , phone , message} = userData 
            const res = await fetch("/contact" , {
                method:"POST" , 
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name , email , phone , message
                })
            })

            const data = await res.json();

            if(!data){
                console.log("message not send");
            }else{
                alert("message sent")
                setUserData({...userData , message:""})
            }
        } catch (error) {
            console.log(error)
        }
     
      
    }

  
  return (
    <>
       <div class="container-fluid bg-black " style={{height:"92vh"}}>
            <br />
            <div class="container jumbotron rounded" style={{width:"50%"}} >
            <h3 >Get in Touch</h3>
            <br />
                <form method='POST'>
                   
                    <div class="form-group">
                        <input type="text" class="form-control" onChange={handleInputs} name="name" value={userData.name} placeholder="Name" autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" onChange={handleInputs} name="email" value={userData.email} placeholder="Your Email" autoComplete='off' />
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" onChange={handleInputs} name="phone" value={userData.phone} placeholder="Phone-Number" autoComplete='off' />
                    </div>
                    <div class="form-group">
                    <textarea class="form-control" aria-label="With textarea" onChange={handleInputs} name="message" value={userData.message}  placeholder='Message'></textarea>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary" onClick={contactForm} >Send Message</button>
                </form>
            </div>
            <br />
            </div>
    </>
  )
}

export default Contact