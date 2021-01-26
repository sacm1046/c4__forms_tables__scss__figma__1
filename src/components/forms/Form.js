const Form = ({ onSubmit = () => console.log('Submiting...'), children, title = 'Formulario' }) => {

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h5>{title}</h5>
            {children} 
        </form>
    )
}

export default Form
