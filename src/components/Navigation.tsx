import React from 'react'
import { NavLink } from 'react-router-dom'
import NavItemInterface from '../propModels/NavItemModel'
import NavItem from './NavItem'

interface Props {
    navItems: NavItemInterface[];
}


const Navigation: React.FC<Props> = ({navItems}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Todo-Nator 3000</NavLink>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navItems.map(n => <NavItem key={n.id} id={n.id} path={n.path} label={n.label}/>)}
            </ul>
        </nav>
    )
}

export default Navigation