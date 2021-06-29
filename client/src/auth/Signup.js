import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer , toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Registrar'
    });

    const {name,email,password,buttonText} = values

    const handleChange = (name) => (event) => {
        //console.log(event.target.value)
        setValues({...values,[name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Registrando'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email,password}
        })
        .then(response => {
            console.log('SIGNUP SUCCESS', response)
            setValues({...values,name: '',email: '',password: '', buttonText:'Registrado'})
            toast.success(response.data.message)
        })
        .catch(error => {
            console.log('SIGNUP ERROR', error.response.data)
            setValues({...values,buttonText: 'Registrar'})
            toast.error(error.response.data.error)
        })
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <lable className="text-mited">Nombre</lable>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-mited">Email</lable>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>

            <div className="form-group">
                <lable className="text-mited">Contraseña</lable>
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
        <h1 className="p-5 text-center">Registro</h1>
        {signupForm()}
        </div>
    </Layout>
    )
}


export default Signup;