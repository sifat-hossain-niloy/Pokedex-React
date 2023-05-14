import React, { useState } from 'react';
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./style.css"

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    return (
        <div id="login-page">
            <div id="image-container">
            <img style={{ width: 500, height: 200 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" alt="Pokémon Logo"/>
            </div>
            <p id="login-header">Login Page</p>
            
            <Button id="google-signin-button" onClick={() => signInWithGoogle()} disabled={authing}>
                Sign in with Google
            </Button>
        </div>


    );
};

export default LoginPage;