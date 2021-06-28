import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer , toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: 'antonio',
        email: 'antonio@gmail.com',
        password: '1234',
        buttonText: 'Submit'
    });

    const {name,email,password,buttonText} = values

    const handleChange = (name) => (event) => {
        //
    }

    const clickSubmit = event => {
        //
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-mited">Name</lable>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-mited">Email</lable>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-mited">Password</lable>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    )


    return (<Layout>
        <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">SignUp</h1>
        {signupForm()}
        </div>
    </Layout>
    )
}


export default Signup;