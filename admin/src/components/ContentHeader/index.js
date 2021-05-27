import './styles.scss';

const ContentHeader = (props) => {
    return (
        <section className="content_header">
            <h1>{props.title}</h1>

            <div className="content_header_navigation">
                <a href={props.link} className="button_main_action">
                    {props.linkName}
                </a>
            </div>
        </section>
    );
};

export default ContentHeader;
