import React, {useState} from 'react';
import {firebase} from './firebase'


function App() {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState("")

  React.useEffect (()=> {
    const obtenerDatos = async () => {
      const db = firebase.firestore()
      try {
        const data = await db.collection('tareas').get()
        //console.log(data);
        const arrayData = data.docs.map(doc => ({id:doc.id,...doc.data() }))
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
        
      }
    }
    obtenerDatos()
  },[])

  const agregarTarea = async (e) => {
    e.preventDefault()
    if(!tarea.trim()) {
      console.log("Escribe algo.....")
      return
    }
    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        name:tarea,
        fecha:Date.now()
      }
      const data = db.collection('tareas').add(nuevaTarea)
      setTareas([
        ...tareas,
        {id:data.id, ...nuevaTarea}
      ])
      setTarea("")
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarTarea = async (id) => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('tareas').doc(id).delete()
      const arrayFiltrado = tareas.filter(item=>item.id!==id)
      setTareas(arrayFiltrado)

    } catch (error) {
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">FIREBASE</h2>
      <div className="row mt-2">
      <div className="col-7">
        <h4 className="text-center">Lista de tareas</h4>
        <ul className="list-group">
          {
              tareas.map(item=>
            <li className="list-group-item" key={item.id}>
              <span>{item.name}</span>
              <button 
                className="btn btn-danger float-end mx-2"
                onClick={()=>eliminarTarea(item.id)}
                >
                Eliminar
              </button>
              <button className="btn btn-warning float-end">Editar</button>

            </li>
                
                )
          }
        </ul>
      </div>
      <div className="col-5">
      <h4 className="text-center">Agregar tareas</h4>
          <form onSubmit={agregarTarea}>
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Introduce la tarea"
              value={tarea}
              onChange={e=>setTarea(e.target.value)}
            />
            <button className="btn btn-dark w-100">Agregar</button>
          </form>
      </div>
      </div>
    </div>
  );
}

export default App;
