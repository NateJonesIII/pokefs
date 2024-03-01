import { AuthProps } from "../types/types";
import React, {useState, ReactElement } from "react";
import './auth.css'
import { createUserWithEmailAndPassword } from "firebase/auth";


const Register: React.FC<AuthProps> = ({
    auth,
    setIsRegistered,
    setIsLoggedIn,
    setUser
}: AuthProps): ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async () => { 
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    const user = userCredential.user;
                    setIsRegistered(true);
                    setIsLoggedIn(true);
                    setUser(user.email);
                    console.log(user.email, "has become a trainer!");
                }
            )
        } catch (error) {
            
        }
    }

    return (
        <div className="auth-container">
            <h2>Register:</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register!</button>
        </div>
    )
}

export default Register;