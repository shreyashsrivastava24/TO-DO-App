import React, { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

const Navbar = () => {
  const [theme, setTheme] = useState(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'))

  useEffect(()=>{
    try{
      localStorage.setItem('theme', theme)
    }catch(e){}
  },[theme])

  const toggleTheme = () => {
    if(document.documentElement.classList.contains('dark')){
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  return (
    <nav className='flex justify-between items-center px-4 bg-indigo-900 text-white py-2 dark:bg-slate-800'>
        <div className="logo">
            <span className='font-bold text-xl mx-2'>iTask</span>
        </div>
      <ul className="flex gap-8 mx-9 items-center">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        <li>
          <button onClick={toggleTheme} aria-label="Toggle theme" className='p-2 rounded-full hover:opacity-90'>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar