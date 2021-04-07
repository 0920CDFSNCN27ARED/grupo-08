import './styles.scss';

const CardMini = (props) => {
    return (
        <div className="cardMini">
            <div className="cardMini-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                    <g transform="translate(-52 82)">
                        <rect width="44" height="44" transform="translate(52 -82)" fill="none" />
                        <g transform="translate(56.5 -78)">
                            <path
                                d="M1.5,18S7.5,6,18,6,34.5,18,34.5,18,28.5,30,18,30,1.5,18,1.5,18Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                            />
                            <path
                                d="M22.5,18A4.5,4.5,0,1,1,18,13.5,4.5,4.5,0,0,1,22.5,18Z"
                                fill="none"
                                stroke="#000"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                            />
                        </g>
                    </g>
                </svg>
            </div>
            <div className="cardMini-data">
                <h4>{props.title}</h4>
                <p>{props.value}</p>
            </div>
        </div>
    );
};

export default CardMini;
