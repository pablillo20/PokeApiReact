import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartaCerrada from '../Imagenes/cartaCerrada.png'
import carta from '../Imagenes/carta.png';
import carga from '../Imagenes/carga.gif';
import boton from '../Imagenes/boton.png';

export function ListadoPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numPokemons, setNumPokemons] = useState(8);
  const navigate = useNavigate(); // navegación sin recarga

  function loadPokemon(offset, limit) {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        const pokemonDetailsPromises = data.results.map(pokemon =>
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => ({
              name: pokemon.name,
              image: pokemonData.sprites.other['official-artwork'].front_default,
              backImage: pokemonData.sprites.other['official-artwork'].front_shiny,
            }))
        );

        Promise.all(pokemonDetailsPromises).then(pokemonDetails => {
          setPokemons(existingPokemons => {
            const newPokemons = pokemonDetails.filter(
              newPokemon => !existingPokemons.some(
                existingPokemon => existingPokemon.name === newPokemon.name
              )
            );
            return [...existingPokemons, ...newPokemons];
          });
          setLoading(false);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadPokemon(0, numPokemons);
  }, []);

  return (
    <>
      <div className="cartas">
        {pokemons.map((pokemon) => (
          <div className="pokeCarta" key={pokemon.name}
            onMouseOver={(e) => {
              const img = e.currentTarget.querySelector('img.pokemonImage');
              const img2 = e.currentTarget.querySelector('img.cerrada');
              img2.src = carta;
              img.src = pokemon.backImage;
              img.style.display = 'block';
            }}
            onMouseOut={(e) => {
              const img = e.currentTarget.querySelector('img.pokemonImage');
              img.src = pokemon.image;
            }}
            onClick={() => navigate(`/detalles/${pokemon.name}`)}
          >
            <h3>{pokemon.name}</h3>
            <img className="cerrada" src={cartaCerrada} alt={pokemon.name} />
            <img className="pokemonImage"></img>
          </div>
        ))}
      </div>

      {loading && <div className="loading-icon"><img src={carga} alt="Cargando" /></div>}

      <button className='boton'
        onClick={() => {
          const newNumPokemons = numPokemons + 8;
          setNumPokemons(newNumPokemons);
          loadPokemon(numPokemons, 8);
        }}
        disabled={loading}
      >
        <img className="ImgBoton" src={boton} alt="Cargar Más" />
      </button>
    </>
  );
}
