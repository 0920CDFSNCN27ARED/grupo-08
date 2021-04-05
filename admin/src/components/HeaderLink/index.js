import { Link } from 'react-router-dom';

const HeaderLink = (props) => {
    return (
        <li>
            <Link to={props.link}>{props.name}</Link>
        </li>
    );
};

export default HeaderLink;
