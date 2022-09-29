import { useDispatch, useSelector } from 'react-redux';
import { StateI } from '../../store/reducer';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/reducer/index';
import { Navigate } from 'react-router-dom';
import { logout } from '../../store/actionCreators';


function Header(){

    const user = useSelector((state: RootState) => state.general.user)
    const dispatch = useDispatch();

    function eliminaUser(){
        dispatch(logout());
        sessionStorage.removeItem('cred');
        <Navigate to='/'/>
    }

    return(
        <div id='header'>
            <h2>Pokedex</h2>
            {
            user ?
            <>
            <button id='logout' onClick={eliminaUser}>Logout</button>
            </>
            :
            <NavLink to='/login'
            style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "white" : "yellow",
                fontSize: "large"
            })}
            >Login</NavLink>
            }
        </div>
    )
}

export default Header;