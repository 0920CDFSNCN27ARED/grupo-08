import './styles.scss';

const FormInput = ({ label, handleChange, ...otherProps }) => {
    return (
        <>
            <div className="form_row">
                {label && <label className="form_label">{label}</label>}

                <input onChange={handleChange} {...otherProps} />
            </div>
        </>
    );
};

export default FormInput;
