import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const Logout = () => {
  
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.removeItem('token')
    navigate("/login")
  })

  return (
    <></>
  )
}
