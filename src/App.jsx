import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { ListadoPokemon } from './Componentes/listadoPokemon';
import { LandingPage } from './Componentes/landingPage';
import { DetallesPokemons } from './Componentes/detallesPokemons';
import { Juego } from './Componentes/juegoPokemons';
import { RutasPrivadas } from './RutasPrivadas';
import { Error404 } from './Componentes/Error404';
import logo from './Imagenes/logo.png'

function App() {
  return (
    <>
      <BrowserRouter>
        <nav class="nav">
          <Link class="navegacion" to="/">
            <img src={logo} alt="Logo"/>
          </Link>
          <Link class="navegacion" to ="/juego">Juego</Link>
          <Link class="pokemons"to="/pokemons">Pokemons</Link>
          <Link class="navegacion" to="/">Inicio</Link>
        </nav>

        <Routes>
          <Route exact path="/" Component={LandingPage}></Route>
          <Route element={<RutasPrivadas />}>
          <Route exact path="/juego" Component={Juego}></Route>
          </Route>
          <Route exact path="/pokemons" Component={ListadoPokemon}></Route>
          <Route exact path="/detalles/:name" Component={DetallesPokemons}></Route>
          <Route exact path="*" Component={Error404}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
