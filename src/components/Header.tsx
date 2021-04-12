import React, { useEffect, useState } from 'react';
import auth from "../services/authService";
import Navigation from './Navigation';

const initNavItems = [
    {id: 1, path: "/todos", label: "Home"},
    {id: 2, path: "/login", label: "Login"},
    {id: 3, path: "/register", label: "Signup"},
]

interface Props {

}

const Header: React.FC<Props> = () => {
    const [navItems, setNavItems] = useState(initNavItems);

    useEffect(() => {
        if (!auth.getCurrentUser()) return 
        const newNavItems = [...navItems, {id: 4, path:"/logout", label: "Logout"}];
        setNavItems(newNavItems);
    }, [])

    return (
        <div>
            <Navigation navItems={navItems}/>
        </div>
    )
}

export default Header