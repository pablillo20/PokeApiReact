import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export function Login(){

    const navigate = useNavigate();
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function loginGoogle(){
        signInWithPopup(auth, googleProvider).then(() => {
            console.log("Sesión iniciada, hola: ");
            navigate('/juego');
        }).catch((reason) => {
            console.error('Failed sign', reason);
        });
    }

    function logOut(){
        signOut(auth).then(() => {
            console.log("Sesión cerrada");
        }).catch((error) => {
            console.log("Error al cerrar sesión: "+ error);
        });
    }

    async function iniciarSesionGitHub() {
        try {
            const resultado = await signInWithPopup(auth, githubProvider);
            const user = resultado.user; 
            const credential = GithubAuthProvider.credentialFromResult(resultado);
            const token = credential.accessToken; 
            console.log('Usuario', user);
            console.log('Token', token);
            navigate('/juego');
        } catch (error) {
            console.error('Error al iniciar sesión con GitHub:', error);
        }
    }

    async function registrar() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario registrado:', userCredential.user);
            navigate('/juego');
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error al registrar:', error);
        }
    }
    
    async function iniciarSesion() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario iniciado sesión:', userCredential.user);
            navigate('/juego');
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error al iniciar sesión:', error);
        }
    }

   

    const [user, setUser] = useState(null);

    useEffect(() => {
        const iniciada = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => iniciada();
    }, [auth]);

    return(
        <div className="login-container">
            <>
                {!user ? (
                    <>
                        <p>Google</p>
                        <button onClick={loginGoogle}>Iniciar Sesión con Google</button>

                        <p>GitHub</p>
                        <button onClick={iniciarSesionGitHub}>Iniciar Sesión con GitHub</button>

                        <p>Correo y Contraseña</p>
                        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={registrar}>Registrar</button>
                        <button onClick={iniciarSesion}>Iniciar Sesión</button>

                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </>
                ) : (
                    <button onClick={logOut}>Cerrar Sesión</button>
                )}
            </>
        </div>
    );
}