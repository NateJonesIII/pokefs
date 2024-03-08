import { AuthProps } from "../types/types";
import React, {useState, ReactElement } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const Login: React.FC<AuthProps> = ({
    auth,
    setIsRegistered,
    setIsLoggedIn,
    setUser
}: AuthProps): ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleLogin = async () => { 
        try {
            await signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    const user = userCredential.user;
                    setIsRegistered(true);
                    setIsLoggedIn(true);
                    setUser(user.email!);
                    navigate("/");
                    console.log(`The Trainer ${user.email} has logged in!`);
                }
            )
        } catch (error) {
            setIsRegistered(false);
            console.log(error);
        }
    }

    return (
        <div className="auth-container">
            <h2>Login:</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login!</button>
        </div>
    )
}

export default Login;