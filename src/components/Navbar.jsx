import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around items-center w-full h-15 bg-slate-700 text-white'>
        <div className=" text-xl ">iTask-Planner</div>
        <ul className="flex gap-8 text-xl  ">
            <li>Home</li>
            <li>Task Planner</li>
        </ul>
    </nav>
  )
}

export default Navbar
