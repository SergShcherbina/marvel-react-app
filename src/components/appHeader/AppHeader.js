import { Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end        //'end' отвечает за строгое сравнение ссылки
                                style={({isActive})=> (isActive ? {'color': '#fff', 'background': '#e62429' } : {'color': 'inherit'})}
                                to="/">Characters</NavLink></li>

                    <li><NavLink            //!если убрать 'end', то всем ссылкам содержащим '/comics' применится этот style
                                style={({isActive})=> (isActive ? {'color': '#fff', 'background': '#e62429' } : {'color': 'inherit'})}
                                to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;