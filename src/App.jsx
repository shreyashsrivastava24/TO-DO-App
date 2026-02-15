import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let stored = JSON.parse(localStorage.getItem("todos"))
      setTodos(stored)
    }
  }, [])


  const saveToLS = (items) => {
    let toSave;
    if (items) {
      toSave = items;     // agar items mila
    } else {
      toSave = todos;     // warna current todos
    }
    localStorage.setItem("todos", JSON.stringify(toSave))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveToLS(newTodos)
  }

  const clearAll = () => {
    const empty = []
    setTodos(empty)
    saveToLS(empty)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const totalTasks = todos.length
  const leftTasks = todos.filter(t => !t.isCompleted).length
  const completedTasks = todos.filter(t => !!t.isCompleted).length


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 dark:bg-slate-800 text-black dark:text-white min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your Tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">

            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 bg-white text-black placeholder-gray-500 dark:bg-slate-700 dark:text-white dark:placeholder-gray-300' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 mx-2 rounded-2xl hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
            <button onClick={clearAll} disabled={todos.length === 0} className='bg-red-600 mx-2 rounded-2xl hover:bg-red-800 disabled:bg-red-300 p-4 py-2 text-sm font-bold text-white'>Clear All</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 dark:bg-white dark:opacity-20 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className='flex gap-3 items-center my-2'>
          <div className='px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 dark:bg-slate-700 dark:text-gray-100'>Total: {totalTasks}</div>
          <div className='px-3 py-1 rounded-full bg-yellow-200 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>Completed: {completedTasks}</div>
          <div className='px-3 py-1 rounded-full bg-emerald-200 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'>Left: {leftTasks}</div>
        </div>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
      <Footer />
    </>
  )
}

export default App