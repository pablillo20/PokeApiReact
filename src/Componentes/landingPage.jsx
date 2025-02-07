export function LandingPage() {
    return (
        <>
            <div className="landing-page">
                <header className="header">
                    <h1>Bienvenido al mundo Pokemon</h1>
                    <p>Descubre y juega con Pokemon!</p>
                </header>
                <main className="main-content">
                    <section className="pokemon-gallery">
                        <h2>Pokemons Destacados</h2>
                        <div className="pokemon-cards">
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" />
                                <h3>Bulbasaur</h3>
                            </div>
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" />
                                <h3>Charmander</h3>
                            </div>
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" />
                                <h3>Squirtle</h3>
                            </div>
                        </div>
                    </section>
                    <section className="pokemon-gallery">
                        <h2>Pokemons Preferidos por el Creador</h2>
                        <div className="pokemon-cards">
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png" alt="Rattata" />
                                <h3>Rattata</h3>
                            </div>
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png" alt="Gloom" />
                                <h3>Gloom</h3>
                            </div>
                            <div className="pokemon-card">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png" alt="Golem" />
                                <h3>Golem</h3>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <p>&copy; 2025 Mundo Pokemon. Github/pablillo20</p>
                </footer>
            </div>
        </>
    );
}
