import Navbar from './components/Navbar'
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString= localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  const toggleFinished=(params) => {
    setshowFinished(!showFinished)
  }
  
  const saveToLS =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))

  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS();
  }
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    saveToLS();

  }
  const handleDelete=(e,id)=>{
      
      let newTodos=todos.filter(item=>{
        return item.id!==id;
      })
      setTodos(newTodos);
      saveToLS();

  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox=(e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos]
    newTodos[index].isCompleted=! newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();

  }
  
  return (
    <>
      <Navbar />
      <div className="container flex justify-around mx-auto mt-7 rounded-xl bg-violet-100 w-11/12 min-h-[80vh]	">
        
        <div className="left  w-2/12 bg-violet-100 rounded-xl">
            <div className="home flex mt-5 justify-around  align-middle ">
             
                <img src="image.png" className='h-14 rounded-full' alt="" />
                
                <div>
                    <h1>Do-it</h1>
                    <h2>iTask-Planner</h2>
                </div>
            </div>
            <div className="line w-11/12 h-1 m-5  rounded-full bg-blue-400"></div>
        </div>
        <div className="right w-9/12	">
          <div className=" my-2 rounded-xl bg-blue-400 p-5 min-h-[80vh] text-center" >
            <div className="addTodo p-1">
              <h1 className='text-2xl font-bold p-3'>iTask - Planner Manage your todos at once place</h1>
              <input  onChange={handleChange}  value={todo} type="text" className='w-2/3 h-10 rounded-xl 	' placeholder='🔴🟠🟡 What is your next task' />
              <button  onClick={handleAdd} disabled={todo.length<=3}  className='rounded-xl w-[90px] h-10 bg-violet-700 disabled:bg-violet-700 text-white hover:font-bold py-1 mx-6'>Save</button>
            </div>
              <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
            <h2 className='text-lg font-bold'>Your Todos</h2>
                      
            <div className="todos">
              {todos.length===0 && <div className='flex '> No todos are available</div>}
            {todos.map(item=>{
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-3/4 justify-between my-5">
                        <div className='flex items-center gap-5'>
                        <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} id="" />
                        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                        </div>
                        <div className="buttons flex h-full ">
                          <button onClick={(e)=>{handleEdit(e,item.id)}} className='rounded-xl  text-2xl bg-violet-700 text-white hover:font-bold p-2  py-1 '  ><FaEdit />
                          </button>
                          <button  onClick={(e)=>{handleDelete(e,item.id)}} className='rounded-xl  text-2xl bg-violet-700  text-white hover:font-bold  py-1 mx-3'><MdDeleteOutline /></button>
                        </div>
                      </div>
            })}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
