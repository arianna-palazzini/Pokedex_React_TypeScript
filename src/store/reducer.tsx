import { SAVE_USER, POPOLA_POKEMON, TOGGLE_LOADING, LOGOUT, POPOLA_POKEMON_SELEZIONATO } from "./actionTypes";
import { Pokemon } from "../pages/ListaPokemon/ListaPokemon";
import { Credentials } from "../pages/Login/Login";
import { PokemonSelected } from "../pages/Pokemon/Pokemon";



export interface StateI{
    user: Credentials | null,
    pokemon: Pokemon[],
    loading: boolean,
    pokemonSelezionato: PokemonSelected | null
}

const initialState: StateI = {
    user: null,
    pokemon: [],
    loading: false,
    pokemonSelezionato: null
}

function reducer(state= initialState, action: any):StateI{
    switch(action.type){
        case SAVE_USER:
            {
                sessionStorage.setItem('cred', JSON.stringify(action.payload))
                localStorage.setItem('credenziali', JSON.stringify(action.payload))
                return {
                    ...state,
                    user: action.payload
                }
            }
        case POPOLA_POKEMON:
            console.log(action.payload);
            return{
                ...state,
                pokemon: [...action.payload]
            }
        case POPOLA_POKEMON_SELEZIONATO:
            console.log(action.payload)
            return {
                ...state,
                pokemonSelezionato: action.payload
            }    
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case LOGOUT:
            return{
                ...state,
                user: null
            }
        default: return state;
    }
}

export default reducer;