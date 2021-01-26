const Button = ({ type = 'button', color, text, onClick }) => {
    return (
        <div className="btn__container">
            <button
                type={type}
                className={`btn__${color}`}
                onClick={type === 'submit' ? () => console.log('Pressing...') : onClick}
            >
                {text}
            </button>
        </div>
    )
}

export default Button
