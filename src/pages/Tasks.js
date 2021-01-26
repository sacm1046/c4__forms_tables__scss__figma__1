import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Button from '../components/buttons/Button';
import FormInput from '../components/forms/FormInput';
import Form from '../components/forms/Form';
import Table from '../components/tables/Table';
import SVGEdit from '../components/icons/SVGEdit';
import SVGDelete from '../components/icons/SVGDelete';

const Home = () => {

    /* estado que representa las tareas existentes */
    const [tasks, setTasks] = useState([
        { id: 1, responsable: "Andrés", description: "Limpiar" },
        { id: 2, responsable: "Javiera", description: "Cocinar" }
    ])

    /* estado que representa el id de la tarea seleccionada para editar */
    const [taskId, setTaskId] = useState(null)

    /* estado que representa la actual tarea que se crea o se edita */
    const [form, setForm] = useState({
        responsable: "",
        description: ""
    })
    /* Efecto que carga la currentTask con la información correspondiente a la tarea a editar, si se va a crear una tarea (task) este efecto no hace nada. */
    useEffect(() => {
        const selected = tasks.filter(task => task.id === taskId)
        taskId && setForm(selected[0])
    }, [taskId, tasks])

    /* Función para validar elementos del formulario */
    const formValidation = (task, success) => {
        const { responsable, description } = task
        if (responsable.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Algo anda mal',
                text: 'Nombre debe tener al menos 3 letras!'
            })
        } else if (description.length < 5) {
            Swal.fire({
                icon: 'error',
                title: 'Algo anda mal',
                text: 'Descripción debe tener al menos 5 letras!'
            })
        } else {
            success()
        }
    }

    /* Función para agregar un nueva tarea (task) al listado de tareas (tasks) */
    const addTask = async () => {
        /* Forma de generar id, pero puede generar duplicidad */
        /* const id = tasks.length + 1; */
        const id = tasks.length > 0 ? (tasks[tasks.length - 1].id) + 1 : 1;
        const newTask = { ...form, id }
        setTasks([...tasks, newTask])
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'Tarea creada con éxito!'
        }).then(() => resetForm())

    }
    /* Función para editar una tarea existente (task) al listado de tareas (tasks), mediante la búsqueda del índice. */
    const editTask = async () => {
        /* forma menos eficiente de obtener el index */
        /* let index = null;
        tasks.map((task, i) => {
            if (task.id === taskId) {
                index = i
            }
            return null;
        }) */

        const index = tasks.findIndex(task => task.id === taskId)
        tasks[index].responsable = form.responsable;
        tasks[index].description = form.description;
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones',
            text: 'Tarea modificada con éxito!'
        }).then(() => resetForm())
    }
    /* Función que resetea el currentTask */
    const resetForm = () => {
        setForm({
            responsable: "",
            description: ""
        })
        setTaskId(null)
    }
    /* Función para manejar el evento change que genera cada input del formulario */
    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    /* Función para manejar el evento submit que genera el formulario */
    const handleSubmit = () => {
        if (!taskId) {
            formValidation(form, addTask)
        } else {
            formValidation(form, editTask)
        }
    }

    /* Representa las cabezeras de las tablas */
    const headers = ["id,1", "Responsable,3", "Descripción,4", "Opciones,2"]

    /* Función para eliminar una tarea existente, utilizando el id de la tarea a eliminar */
    const deleteTask = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "El siguiente registro será eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.isConfirmed) {
                const result = tasks.filter(task => task.id !== id)
                setTasks(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Felicitaciones',
                    text: 'Tarea eliminada con éxito!'
                })
            }
        })


    }

    return (
        <main className="main">
            {/* Formulario */}
            <div className="main__form">
                <Form onSubmit={handleSubmit} title={`${taskId ? "Edición" : "Creación"} de Tarea`}>
                    <FormInput
                        label="Responsable"
                        id="responsableInput"
                        value={form.responsable}
                        handleChange={handleChange}
                        name="responsable"
                    />
                    <FormInput
                        type="textArea"
                        label="Descripción"
                        id="descriptionInput"
                        value={form.description}
                        handleChange={handleChange}
                        name="description"
                    />
                    <Button
                        type="submit"
                        color={taskId ? "success" : "primary"}
                        text={`${taskId ? "Editar" : "Crear"} Tarea`}
                    />
                    {
                        taskId && <Button
                            color="danger"
                            text="Cancelar"
                            onClick={resetForm}
                        />
                    }
                </Form>
            </div>
            {/* Tabla */}
            <div className="main__table">
                <Table headers={headers}>
                    {
                        tasks.length > 0 &&
                        tasks.map(task => (
                            <tr key={task.id}>
                                <th className="table__row__1">{task.id}</th>
                                <td className="table__row__3">{task.responsable}</td>
                                <td className="table__row__4">{task.description}</td>
                                <td className="table__row__2">
                                    <div>
                                        <span onClick={() => setTaskId(task.id)}>
                                            <SVGEdit size={15} color={(taskId && task.id === taskId) ? "#80a842" : undefined} />
                                        </span>
                                        <span onClick={() => deleteTask(task.id)} className={taskId && "d-none"}>
                                            <SVGDelete size={23} color="crimson" />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </div>

        </main>
    )
}

export default Home
