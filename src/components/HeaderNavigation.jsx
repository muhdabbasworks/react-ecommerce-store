import { NavLink, Link } from "react-router-dom"
export default function HeaderNavigation () {

    return (
        <header>
            <div className="container header-flex">


                <Link to='/' className="logo">SHOPLAZA</Link>
                <nav>
                    <ul className="nav-large">
                        <li>
                            <NavLink to='/products'>Products</NavLink>
                        </li>
                        <li>
                            <NavLink to='/cart'>Cart</NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    )
}