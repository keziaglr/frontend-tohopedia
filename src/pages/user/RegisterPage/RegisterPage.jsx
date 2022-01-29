import { Link } from 'react-router-dom'

function LoginPage(){
    return (
        <div className='content'>
            <div className='container'>
                <h2 className='title'>Sign Up Now</h2>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <input className='btn' type="submit" value="Sign Up" />
                </div>
                <div>Already have a Tohopedia account? <Link to='/login'>
                   <a>Log in</a> 
                </Link></div>
            </div>
        </div>
    )
}

export default LoginPage