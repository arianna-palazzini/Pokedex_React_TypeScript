import { SAVE_USER, POPOLA_POKEMON, TOGGLE_LOADING, LOGOUT, POPOLA_POKEMON_SELEZIONATO } from "./actionTypes";
import { Credentials } from "../pages/Login/Login";
import { Pokemon } from "../pages/ListaPokemon/ListaPokemon";


//INSERISCO USER NELLO STORE
export function saveUser(user: Credentials){
    return{
        type: SAVE_USER,
        payload: user
    }
}

//CHIAMATA AJAX POKEMON
export function chiamaPokemon(){
    return async (dispatch: any) => {
        dispatch(toggleLoading());
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon')
            const data = await res.json();
            dispatch(popolaPokemon(data.results));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(toggleLoading());
        }
    }

}

//POPOLO LISTA POKEMON
function popolaPokemon(elementi: Pokemon[]) {  
    //console.log(elementi)
    return {
        type: POPOLA_POKEMON,
        payload: elementi
    }
}

//SPINNER DI ATTESA
export function toggleLoading() {
    return {
        type: TOGGLE_LOADING
    }
}

//ELIMINO USER
export function logout(){
    return{
        type: LOGOUT
    }
}


//CHIAMATA AL SINGOLO POKEMON
export function aggiornaPokemonSelezionato(urlPokemon: string | undefined) {
    return async (dispatch: any) => {
        dispatch(toggleLoading());
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${urlPokemon}`)
            const data = await res.json();
            dispatch(popolaPokemonSelezionato(data));
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(toggleLoading());
        }
    }
}

//SALVATAGGIO SINGOLO POKEMON
export function popolaPokemonSelezionato(elemento:any) {
    console.log(elemento);
    
    return {
        type: POPOLA_POKEMON_SELEZIONATO,
        payload: elemento
    }

}