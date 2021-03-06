import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {auth} from '../firebase';

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut().then(props.history.push("/login"))
    }

    return (
        <div className="navbar navbar-dark bg-dark mt-5">
            <Link to="/" className="navbar-brand mx-2">Tareas</Link>
            <div className="d-flex">
                <NavLink to="/" exact className="btn btn-dark mr-2">Inicio</NavLink>
                {
                    props.user !== null ?
                    <NavLink to="/admin" className="btn btn-dark mr-2">Tareas</NavLink> :
                    null
                }  

                {
                    props.user === null ?
                    (<NavLink to="/login" className="btn btn-dark mr-2">Login</NavLink>) :
                    (<Link to="/login" className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>Cerrar sesion</Link>)
                }

            </div>
        </div>
    )
}

export default withRouter(Navbar)
