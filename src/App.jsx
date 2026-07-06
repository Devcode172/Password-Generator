import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
   const [isSpecialCharacterAllowed, setIsSpecialCharacterAllowed] = useState(false)
   const [passwordRange, setPasswordRange] = useState(8)  // initial value 8
   // to copy password
   const passwordInputRef = useRef(null)

  let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  if(isNumberAllowed) string += "0123456789"

  if(isSpecialCharacterAllowed) string += "§!%&/*#@ß?"

  function generatePassword(){
    let passwordString = ""
    // running loop for passwordRange times
    for(let i = 1; i <= passwordRange; i++ ){
      // index must be (0 - string length)
      let index = Math.floor(Math.random() * string.length)
     passwordString += string[index]
    }
    setPassword(passwordString)
  }

  function resetPasswordSettings(){
    setIsNumberAllowed(false)
    setIsSpecialCharacterAllowed(false)
    setPasswordRange(8)
    setPassword("")
  }

  const copyPassword = () => {
     passwordInputRef.current.select()
     passwordInputRef.current.setSelectionRange(0, 100);
     navigator.clipboard.writeText(passwordInputRef.current.value);
  }

  return (
  <>
  <div className='bg-blue-300 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 py-4 text-center rounded-[10px] my-4'>
  <h1 className='text-2xl sm:text-3xl font-bold'>Password Generator</h1>

  <input type="text" placeholder='password' value={password} readOnly = {true} ref={passwordInputRef} className='border border-black w-full p-2 rounded-[10px] mt-4 outline-none' />

<div className='mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3'>
<span className='text-sm sm:text-base'>Range : {passwordRange}</span>
<input type="range" min={8} max={100} value={passwordRange} className='w-full sm:w-48 cursor-pointer' onChange={(e)=>(setPasswordRange(e.target.value))} />
</div>
<div className='flex flex-col gap-3 mt-4'>

  <label htmlFor="n" className='cursor-pointer text-sm sm:text-base'>
    <input type="checkbox" name="" id="n" checked = {isNumberAllowed} onChange={(e)=>(setIsNumberAllowed(e.target.checked))} />
    Include Numbers
  </label>

  <label htmlFor="sc" className='cursor-pointer text-sm sm:text-base'>
    <input type="checkbox" name="" id="sc" checked = {isSpecialCharacterAllowed} onChange={(e)=>(setIsSpecialCharacterAllowed(e.target.checked))} />
    Include Special Characters
  </label>

</div>

<div className='flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 md:gap-8 mt-4 flex-wrap'>

<button className='bg-black/20 p-2 rounded-[5px] cursor-pointer mt-2 hover:bg-black/25 text-sm sm:text-base' onClick={generatePassword}>Generate Password</button>

<button className='bg-black/20 p-2 rounded-[5px] cursor-pointer mt-2 hover:bg-black/25 text-sm sm:text-base' onClick={copyPassword} >Copy Password</button>

<button className='bg-black/20 p-2 rounded-[5px] cursor-pointer mt-2 hover:bg-black/25 text-sm sm:text-base' onClick={resetPasswordSettings}>Reset Settings</button>
</div>

  </div>
  </>
  )
}

export default App
