import './styles.scss';

import { Link } from 'react-router-dom';

const DataListItem = (props) => {
    return (
        <li>
            <Link to={props.link}>{props.name}</Link>
        </li>
    );
};

const DataList = (props) => {
    console.log(props.data);
    return (
        <div className="data_list">
            <h4>{props.title}</h4>
            <ul>
                {props.data.map((item, i) => {
                    return <DataListItem key={i} id={item.id} name={item.roleName} link="#" />;
                })}
            </ul>
        </div>
    );
};

export default DataList;
