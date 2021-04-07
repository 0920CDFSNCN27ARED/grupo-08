import './styles.scss';

import iconito from '../../../assets/images/pw_show.svg';

const CardMini = (props) => {
    return (
        <div className="cardMini">
            <div className="cardMini-icon">
                <img src={iconito} alt="algo"/>
            </div>
            <div className="cardMini-data">
                <h4>{props.title}</h4>
                <p>{props.value}</p>
            </div>
        </div>
    );
};

export default CardMini;
