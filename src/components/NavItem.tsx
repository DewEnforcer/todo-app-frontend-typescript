import React from 'react'
import {NavLink} from "react-router-dom"

import NavItemInterface from '../propModels/NavItemModel'

const NavItem: React.FC<NavItemInterface> = ({path, label}) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={path}>{label}</NavLink>
        </li>
    )
}

export default NavItem