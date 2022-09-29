import './ListaPokemon.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { chiamaPokemon } from '../../store/actionCreators';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer/index';
import { StateI } from '../../store/reducer';

export interface Pokemon {
    name: string,
    url: string
}

function ListaPokemon() {

    const listaPokemon: Pokemon[] = useSelector((state: RootState) => state.general.pokemon);
    const user = useSelector((state: RootState) => state.general.user)
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    console.log(listaPokemon);


    useEffect(() => {
        dispatch(chiamaPokemon());
    }, [])

    function viewDetail(nomePokemon: string) {
        navigate(`/pokemon/${nomePokemon}`);
    }

    return (
        <>
            {
                user ?
                    <>
                        <h2> Lista Pokemon</h2>
                        <div id='lista-pokemon'>

                            {
                                listaPokemon.map(el =>
                                    <button className='pokemon-in-lista' key={el.url} onClick={() => viewDetail(el.name)}>
                                        {el.name}
                                    </button>
                                )
                            }

                        </div>
                        <div id='div-crea'>
                            <NavLink to={'/nuovo-pokemon'}
                                style={({ isActive }) => ({
                                    textDecoration: "none",
                                    fontSize: "large",
                                    color: "rgb(17, 30, 103)",
                                    backgroundColor: "yellow",
                                    padding: "8px",
                                    borderRadius: "5px"
                                })}>
                                Crea nuovo Pokemon</NavLink>
                        </div>
                    </>
                    :
                    <>
                        <div id='lista-pokemon'>
                        </div>
                    </>
            }
        </>
    )
}

export default ListaPokemon;