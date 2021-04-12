import React from 'react'
import auth from "../services/authService";

interface Props {

}

const Logout: React.FC<Props> = () => {
    auth.logout();
    window.location.href = "/";
    return null;
}

export default Logout