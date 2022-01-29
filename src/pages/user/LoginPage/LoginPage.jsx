import './LoginPage.scss'
import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import {LOAD_USERS} from '../../../graphql/user/Queries'

function LoginPage(){
    const {error, loading, data} = useQuery(LOAD_USERS);

    console.log(error)

    useEffect(()=>{
        console.log(data)
    }, [data])

    return (
        <div className='content'>
            <div className='container'>
                <h2 className='title'>Login</h2>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name="password" id="password" />
                </div>
                <div>
                    <input type="checkbox" name="remember-me" id="remember-me" />
                    <label>Remember me</label>
                </div>
                <div>
                    <input className='btn' type="submit" value="Login" />
                </div>
                <div><Link to='/register'>
                    <a>Register</a>
                </Link></div>
            </div>
        </div>
    )
}

export default LoginPage