const HomeLayout = (props) => {
    return (
        <>
            <div id="HomeLayout" className="layouts">
                {props.children}
            </div>
        </>
    );
};

export default HomeLayout;
