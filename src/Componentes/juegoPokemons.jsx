import { useState, useEffect } from "react";
import carga from '../Imagenes/carga.gif'; 

export function Juego() {
    const [cartasPokemon, setCartasPokemon] = useState([]); 
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
    const [parejasEncontradas, setParejasEncontradas] = useState([]);
    const [cargando, setCargando] = useState(true); 

    useEffect(() => {
        cargarPokemon(); 
    }, []); 

    // Cargar los Pokémon desde la API
    function cargarPokemon() {
        setCargando(true); 

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
            .then(response => response.json()) 
            .then(data => {
                // Pokémon aleatorios y los mezcla
                const pokemonSeleccionados = obtenerPokemonAleatorios(data.results, 4);

                // Crear las cartas duplicadas 
                const cartasDuplicadas = mezclarArray([...pokemonSeleccionados, ...pokemonSeleccionados]);

                
                setCartasPokemon(cartasDuplicadas.map((pokemon, indice) => ({
                    id: indice, 
                    nombre: pokemon.name, 
                    imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`, // URL de la imagen
                    volteada: false 
                })));

                setCargando(false); 
            })
            .catch(error => {
                console.error('Error al obtener los Pokémon:', error);
                setCargando(false); 
            });
    }

    // Obtener x cantidad de pokemons aleatorios
    function obtenerPokemonAleatorios(array, cantidad) {
        return [...array].sort(() => 0.5 - Math.random()).slice(0, cantidad).map(pokemon => {
            // Extraer el ID del Pokémon desde la URL
            const id = pokemon.url.split("/").filter(Boolean).pop(); // Pop para coger el ultimo elemento y boolean para quitar los espacios
            return { name: pokemon.name, id }; // Retornamos un objeto con el nombre y el ID
        });
    }

    // Mezcla un array de manera aleatoria
    function mezclarArray(array) {
        return [...array].sort(() => 0.5 - Math.random()); 
    }

    // Función que maneja el clic en una carta
    function manejarClicCarta(indice) {
        if (cartasSeleccionadas.length === 2 || cartasPokemon[indice].volteada) return;

        const nuevasCartas = cartasPokemon.map((carta, i) =>
            i === indice ? { ...carta, volteada: true } : carta 
        );
        setCartasPokemon(nuevasCartas);
        setCartasSeleccionadas([...cartasSeleccionadas, indice]);

        if (cartasSeleccionadas.length === 1) {
            verificarPareja(cartasSeleccionadas[0], indice);
        }
    }

    function verificarPareja(primerIndice, segundoIndice) {
        const primeraCarta = cartasPokemon[primerIndice]; 
        const segundaCarta = cartasPokemon[segundoIndice]; 
        if (primeraCarta.nombre === segundaCarta.nombre) {
            setParejasEncontradas([...parejasEncontradas, primeraCarta.nombre]);
            setCartasSeleccionadas([]);
        } else {
            setTimeout(() => {
                setCartasPokemon(prev =>
                    prev.map(carta =>
                        carta.id === primerIndice || carta.id === segundoIndice
                            ? { ...carta, volteada: false } // Volteamos las cartas de vuelta
                            : carta
                    )
                );
                setCartasSeleccionadas([]);
            }, 1000);
        }
    }

    // Función para reiniciar el juego
    function reiniciarJuego() {
        // Limpiamos las parejas encontradas y las cartas seleccionadas
        setParejasEncontradas([]);
        setCartasSeleccionadas([]);
        // Recargamos los Pokémon y las cartas
        cargarPokemon();
    }

    return (
        <div className="juego-container">
            <h1>Juego de Memoria Pokémon</h1>

            {cargando ? (
                <div>
                    <img src={carga} alt="Cargando..." /> 
                </div>
            ) : (
                <div className="cartas-container">
                    {cartasPokemon.map((carta, indice) => (
                        <button
                            key={carta.id}
                            className="carta-boton"
                            onClick={() => manejarClicCarta(indice)} 
                        >
                            {carta.volteada || parejasEncontradas.includes(carta.nombre) ? (
                                <img src={carta.imagen} alt={carta.nombre} /> 
                            ) : "?"} {/* Si la carta no está volteada ni es parte de una pareja, mostramos un "?" */}
                        </button>
                    ))}
                </div>
            )}

            {parejasEncontradas.length === 4 && (
                <button className="reiniciar-boton" onClick={reiniciarJuego}>
                    Reiniciar Juego {/* Botón para reiniciar el juego cuando se han encontrado todas las parejas */}
                </button>
            )}
        </div>
    );
}
