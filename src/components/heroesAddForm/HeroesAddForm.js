
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { heroesPost } from '../../actions';
import { useEffect, useState } from "react";
const { v4: uuidv4 } = require('uuid');

const HeroesAddForm = () => {
    const dispatch = useDispatch(); 
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/filters")
            .then(data => data.json())
            .then(data => setFilters(data))
    }, [])

    const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          element: "",
        },
        onSubmit: async (values, {resetForm}) => {
            const id = uuidv4()
            // dispatch(heroesFetching())
            await fetch("http://localhost:3001/heroes", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({...values, id})
            })
            dispatch(heroesPost({...values, id}))
            resetForm()
        },
      });

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={formik.handleChange}
                    value={formik.values.element}>
                    <option>Я владею элементом...</option>
                    {filters.slice(1).map((item, i) => <option key={i} value={item[0]}>{item[1]}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;