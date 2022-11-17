import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header/Header";
import ListaPokemon from "./pages/ListaPokemon/ListaPokemon";
import Login from "./pages/Login/Login";
import { RootState } from "./store/reducer/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "./store/actionCreators";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Pokemon from "./pages/Pokemon/Pokemon";
import NewPokemon from "./pages/NewPokemon/NewPokemon";

function App() {
  const loading = useSelector((state: RootState) => state.general.loading);
  const user = useSelector((state: RootState) => state.general.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const actualUser = sessionStorage.getItem("cred");
    if (actualUser) dispatch(saveUser(JSON.parse(actualUser)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<ListaPokemon />} />
              <Route path="/pokemon/:nomePokemon" element={<Pokemon />} />
              <Route path="nuovo-pokemon" element={<NewPokemon />} />
              {/* <Route path='login' element={<Navigate to={'/'} />} /> */}
            </Routes>
          </BrowserRouter>
          {loading && <LoadingSpinner />}
        </>
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ListaPokemon />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path='/pokemon/:nomePokemon' element={<ImportPokemon />} /> 
            <Route path='nuovo-pokemon' element={<WrappedNewPokemon />} /> */}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
