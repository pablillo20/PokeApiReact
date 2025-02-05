import pokemons from "../Imagenes/pokemons.png";

export function LandingPage() {
    return (
        <>
            <img className="inicio" src={pokemons} alt="pokemons" />
        </>
    );
}
