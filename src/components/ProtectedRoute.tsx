import React from 'react'
import { Redirect, Route } from 'react-router'
import authService from '../services/authService'

interface Props {
    component?: React.FunctionComponent,
    redirectPath: string,
    render?: (props: any) => null | JSX.Element,
    [x:string]: any; //rest props
}

const ProtectedRoute: React.FC<Props> = ({component: Component, redirectPath, render, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props: any) => {
                if (!authService.getCurrentUser()) return <Redirect to={{
                    pathname: redirectPath,
                    state: {
                        from: props.location
                    }
                }}/>
                if (Component) return <Component {...props}/>;
                if (render) return render(props); 
            }}
        />
    )
}

export default ProtectedRoute