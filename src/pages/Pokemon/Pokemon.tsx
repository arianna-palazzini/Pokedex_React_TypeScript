import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer/index";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { aggiornaPokemonSelezionato } from "../../store/actionCreators";
import { useParams } from "react-router-dom";
import "./Pokemon.css";

export interface PokemonSelected {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: [
    {
      slot: number;
      ability: {
        name: string;
      };
    }
  ];
  sprites: {
    front_default: string;
    back_default: string;
  };
}

function Pokemon() {
  const user = useSelector((state: RootState) => state.general.user);
  const pokemonSelezionato: PokemonSelected | null = useSelector(
    (state: RootState) => state.general.pokemonSelezionato
  );
  const dispatch = useDispatch<any>();
  const params = useParams();

  useEffect(() => {
    dispatch(aggiornaPokemonSelezionato(params.nomePokemon));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? (
    <>
      <div className="navlink">
        <NavLink
          to={"/"}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "large",
            color: "yellow",
          })}
        >
          &lt;
        </NavLink>
      </div>

      <div id="dettaglio-pokemon">
        <h2>{pokemonSelezionato?.name}</h2>
        <div>
          <img src={pokemonSelezionato?.sprites.front_default} alt="" />
          <img src={pokemonSelezionato?.sprites.back_default} alt="" />
        </div>
        <div>
          <p> Altezza: {pokemonSelezionato?.height}</p>
          <p> Peso: {pokemonSelezionato?.weight}</p>
          <p> Esperienza: {pokemonSelezionato?.base_experience}</p>
          <p>
            {" "}
            Abilità:
            {pokemonSelezionato?.abilities.map((el) => (
              <span key={el.slot}> {el.ability.name} </span>
            ))}
          </p>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Pokemon;
