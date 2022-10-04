import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';



const Logout = () => {

  const {state , dispatch} = useContext(userContext)

  const history = useNavigate();

  // we will use promises because useEffect hook does not support async await . 
  // we are writing this code so that on clicking on logout path it goes to the backend path of logout 

  useEffect(()=>{
    fetch("/logout" , {
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      } , 
      credentials:"include"
    }).then((res)=>{
      
      if(res.status !== 200){
        const error = new Error(res.error)
        throw error
      }else{
        dispatch({type:"USER" , payload:false})
        history('/');

      }

    }).catch((err)=>{
      console.log(err)
    })
  })
  return (
    <>
    <div  class="container-fluid bg-dark " style={{height:"90vh"}}>
        <h1 class="text-center text-light py-5">Logout page</h1>
        </div>
    </>
  )
}

export default Logout