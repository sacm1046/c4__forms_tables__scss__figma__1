const FormInput = ({ id, label, value, handleChange, name, type = "text" }) => {
    return (
        <div className="form__group">
            <label
                htmlFor={id}
            >
                {label}
            </label>
            {
                type === "textArea" &&
                <textarea
                    value={value}
                    onChange={handleChange}
                    name={name}
                    id={id}
                />
            }
            {
                type !== "textArea" &&
                <input
                    value={value}
                    onChange={handleChange}
                    type={type}
                    name={name}
                    id={id}
                />
            }
        </div>
    )
}

export default FormInput
