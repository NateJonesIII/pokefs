import React, {useState, ReactElement } from "react";
import { AuthProps } from "../types/types";

const Register: React.FC<AuthProps> = ({
    auth,
    setIsRegistered,
    setIsLoggedIn,
    setUser
}: AuthProps): ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = () => { }

    return (
        <div className="auth-container">
            <h2>Register:</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Go</button>
        </div>
    )
}

export default Register;