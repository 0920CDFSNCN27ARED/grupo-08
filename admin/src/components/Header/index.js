import './styles.scss';
import alaskaLogo from '../../assets/images/alaska_logo.svg';

import { Link } from 'react-router-dom';
import HeaderLink from '../HeaderLink';

const Header = (props) => {
    return (
        <header id="admin_header">
            <div id="logo">
                <Link to="/">
                    <img src={alaskaLogo} alt="Alaska logo" />
                </Link>
            </div>

            <div className="user_data">
                <h2>Nombre Apellido</h2>
                <h4>Admin Rol</h4>
                <a href={process.env.REACT_APP_STORE} target="_blank" rel="noopener noreferrer">
                    Visitar tienda
                </a>
                <Link to="/user/logout">Cerrar sesión</Link>
            </div>

            <nav id="menu">
                <ul>
                    <li className="menu_item">
                        <Link to="/">
                            <span>
                                <svg
                                    id="dashboard_icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30 33"
                                >
                                    <g transform="translate(-3 -1.5)">
                                        <path
                                            className="a"
                                            d="M4.5,13.5,18,3,31.5,13.5V30a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3Z"
                                        />
                                        <path className="a" d="M13.5,33V18h9V33" />
                                    </g>
                                </svg>
                            </span>
                            Dashboard
                        </Link>
                    </li>
                    <li className="menu_item">
                        <Link to="/admin/c/productos">
                            <span>
                                <svg
                                    id="catalog_icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30.289 33.164"
                                >
                                    <g transform="translate(-2.855 -1.455)">
                                        <path className="a" d="M24.75,14.1,11.25,6.315" />
                                        <path
                                            className="a"
                                            d="M31.5,24V12A3,3,0,0,0,30,9.4l-10.5-6a3,3,0,0,0-3,0L6,9.4A3,3,0,0,0,4.5,12V24A3,3,0,0,0,6,26.595l10.5,6a3,3,0,0,0,3,0l10.5-6A3,3,0,0,0,31.5,24Z"
                                        />
                                        <path
                                            className="a"
                                            d="M4.905,10.44,18,18.015,31.095,10.44"
                                        />
                                        <path className="a" d="M18,33.12V18" />
                                    </g>
                                </svg>
                            </span>
                            Catalogo
                        </Link>
                        <div className="menu_submenu">
                            <ul>
                                <HeaderLink link="/admin/c/productos" name="Productos" />
                                <HeaderLink link="/admin/c/categorias" name="Categorias" />
                                <HeaderLink link="/admin/c/marcas" name="Marcas" />
                                <HeaderLink link="/admin/c/colores" name="Colores" />
                                <HeaderLink
                                    link="/admin/c/tabla-de-talles"
                                    name="Tabla de talles"
                                />
                            </ul>
                        </div>
                    </li>
                    <li className="menu_item">
                        <Link to="/admin/clientes">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 30.131">
                                    <g transform="translate(0 -2.869)">
                                        <path
                                            className="a"
                                            d="M25.5,31.5v-3a6,6,0,0,0-6-6H7.5a6,6,0,0,0-6,6v3"
                                        />
                                        <path
                                            className="a"
                                            d="M19.5,10.5a6,6,0,1,1-6-6,6,6,0,0,1,6,6Z"
                                        />
                                        <path className="a" d="M34.5,31.5v-3A6,6,0,0,0,30,22.7" />
                                        <path className="a" d="M24,4.7A6,6,0,0,1,24,16.32" />
                                    </g>
                                </svg>
                            </span>
                            Clientes
                        </Link>
                    </li>
                    <li className="menu_item">
                        <Link to="/admin/employees/list">
                            <span>
                                <svg
                                    id="cms_icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30.289 33.164"
                                >
                                    <g transform="translate(-2.855 -1.455)">
                                        <path
                                            className="a"
                                            d="M31.5,24V12A3,3,0,0,0,30,9.4l-10.5-6a3,3,0,0,0-3,0L6,9.4A3,3,0,0,0,4.5,12V24A3,3,0,0,0,6,26.595l10.5,6a3,3,0,0,0,3,0l10.5-6A3,3,0,0,0,31.5,24Z"
                                        />
                                        <path
                                            className="a"
                                            d="M4.905,10.44,18,18.015,31.095,10.44"
                                        />
                                        <path className="a" d="M18,33.12V18" />
                                    </g>
                                </svg>
                            </span>
                            Administradores
                        </Link>
                        <div className="menu_submenu">
                            <ul>
                                <HeaderLink link="/admin/employees/list" name="Empleados" />
                                <HeaderLink link="/admin/employees/crear-rol" name="Roles" />
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
