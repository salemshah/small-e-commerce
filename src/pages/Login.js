import React, {useState, useContext, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
import {UserContext} from "../context/user";

export default function Login() {

    //user context
    const {userLogin, user, setShowMessage, showMessage} = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {
        user.token ? history.push("/products") : history.push("/login")
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isMember, setIsMember] = useState(true);

    const toggleMember = () => {
        setIsMember((prevValue) => {
            let isMember = !prevValue;
            isMember ? setUsername("default") : setUsername("");
            return isMember;
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;

        if (isMember) {
            response = await loginUser({email, password})
        } else {
            response = await registerUser({email, password, username})
        }
        if (response) {
            const {jwt: token, user: {username}} = response.data;
            const newUser = {token, username};
            if (token && response.status === 200 && username) {
                setShowMessage(true);
            }
            userLogin(newUser);
            history.push("/products")
        } else {
            setShowMessage(false);
        }
    };

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-center">
                <form method="post" className="p-5 rounded" onSubmit={handleSubmit}
                      style={{background: "#e8e8e8", width: "30rem"}}>
                    <h3 className="text-center text-info">{isMember ? "Sign in" : "Register"}</h3>
                    <div className="form-group">
                        <label htmlFor="email" className="text-info">Email:</label>
                        <input onChange={(e) => setEmail(e.target.value)}
                               type="email"
                               name="email"
                               id="email"
                               required
                               className="form-control"
                        />
                    </div>
                    {!isMember &&
                    <div className="form-group">
                        <label htmlFor="username" className="text-info">Username:</label>
                        <input onChange={(e) => setUsername(e.target.value)}
                               type="username" name="username"
                               id="username"
                               required
                               className="form-control"/>
                    </div>
                    }

                    <div className="form-group">
                        <label htmlFor="password" className="text-info">Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password"
                               id="password"
                               required
                               className="form-control"/>
                    </div>

                    {isMember &&
                    <div className="form-group">
                        <label htmlFor="remember-me" className="text-info">
                            <span className="mr-3">Remember me</span>
                            <span>
                <input id="remember-me" name="remember-me" type="checkbox"/>
              </span>
                        </label>
                    </div>
                    }

                    <input disabled={showMessage === true || showMessage === false}
                           type="submit"
                           name="submit"
                           className="btn btn-info btn-md"
                           value={
                               isMember ? showMessage === true || showMessage === false ? "Connexion..." : "Connexion" :
                                   showMessage === true || showMessage === false ? "S'inscrire..." : "S'inscrire"
                           }
                    />

                    <div id="register-link" className="text-right">
                        <spain onClick={() => {
                            toggleMember();
                            setIsMember(!isMember);
                        }} className="text-info" style={{cursor: "pointer"}}>
                            {!isMember ? "I have already account" : "Register here"}
                        </spain>
                    </div>
                </form>
            </div>
        </div>
    );
}
