import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler =  () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 font-semibold duration-200 hover:bg-blue-200 hover:text-blue-800 rounded-full cursor-pointer transition-all'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn