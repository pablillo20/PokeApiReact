import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro 'name' de la URL.
import Chart from 'chart.js/auto'; // Usar el gráfico
import carga from '../Imagenes/carga.gif'; 

export function DetallesPokemons() {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null); // Guarda los datos del Pokémon.
  const [loading, setLoading] = useState(true); 

  
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Guardamo gráfico para eliminarlo si es necesario.

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json()) 
      .then(data => {
        setPokemon(data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error:', error); 
        setLoading(false); 
      });
  }, [name]);

  // useEffect para crear y actualizar el gráfico de barras.
  useEffect(() => {
    if (pokemon && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Eliminamos cualquier gráfico previo para evitar duplicados.
      }

      const ctx = chartRef.current.getContext('2d'); 
     
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar', 
        data: {
          labels: pokemon.stats.map(stat => stat.stat.name), 
          datasets: [{
            label: 'Base Stats', 
            data: pokemon.stats.map(stat => stat.base_stat), 
            borderWidth: 1, 
            backgroundColor: 'rgba(54, 162, 235, 0.5)', 
            borderColor: 'rgba(54, 162, 235, 1)', 
          }],
        },
        options: {
          responsive: true, 
          scales: {
            y: {
              beginAtZero: true, 
            },
          },
        },
      });
    }
  }, [pokemon]); 

  
  if (loading) {
    return <div className="loading-icon"><img src={carga} alt="Cargando..." /></div>;
  }

 
  if (!pokemon) {
    return <div>Error cargando los detalles del Pokémon.</div>;
  }

  
  return (
    <div className="pokemon-details">
      <h1 className="pokemon-name">
        <img className="pokemon-animated-sprite" src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default} alt={`${pokemon.name} animated`} />
        {pokemon.name.toUpperCase()}
      </h1>
      <div className="pokemon-images">
        <img className="pokemon-official-artwork" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
        <img className="pokemon-shiny-artwork" src={pokemon.sprites.other['official-artwork'].front_shiny} alt={`${pokemon.name} shiny`} />
      </div>
      <h2 className="pokemon-details-title">Detalles</h2>
      <p className="pokemon-type">Tipo: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p className="pokemon-ability">Habilidad: {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
      <p className="pokemon-weight">Peso: {pokemon.weight} kg</p>
      <p className="pokemon-height">Altura: {pokemon.height} m</p>
      <h2 className="pokemon-stats-title">Estadísticas</h2>
      <canvas className="pokemon-stats-chart" ref={chartRef}></canvas>
    </div>
  );
}
