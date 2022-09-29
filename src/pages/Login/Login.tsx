import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../store/actionCreators';
import { useNavigate } from 'react-router-dom';

//interfaccia per assegnazione dinamica di value
export interface Credentials {
    [name: string]: string | undefined
}

function Login(){

    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    })

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = { ...credentials };
        value[e.target.id] = e.target.value;
        setCredentials(value);
    }

    function saveCredentials(){
        dispatch(saveUser(credentials))
        navigate('/');
    }    


    return(
        <div id="div-login">
            <label>Username: </label>
            <input type='text' id='username' value={credentials.username} onChange={handleChange} />
            <label>Password: </label>
            <input type='text' id='password' value={credentials.password} onChange={handleChange} />
            <button onClick={saveCredentials}>Entra</button>
        </div>
    )
}

export default Login;