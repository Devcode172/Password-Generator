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
  <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
    <div className='bg-blue-300 w-full max-w-lg px-6 sm:px-8 py-8 sm:py-10 text-center rounded-lg shadow-lg'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-6'>Password Generator</h1>

      <input type="text" placeholder='password' value={password} readOnly = {true} ref={passwordInputRef} className='border-2 border-black w-full p-3 rounded-lg mt-4 outline-none text-base sm:text-lg font-mono' />

      <div className='mt-6 flex flex-col sm:flex-row justify-center items-center gap-4'>
        <span className='text-base sm:text-lg font-semibold'>Range: {passwordRange}</span>
        <input type="range" min={8} max={100} value={passwordRange} className='w-full sm:flex-1 cursor-pointer h-2' onChange={(e)=>(setPasswordRange(e.target.value))} />
      </div>

      <div className='flex flex-col gap-4 mt-6 space-y-2'>
        <label htmlFor="n" className='cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2'>
          <input type="checkbox" name="" id="n" checked = {isNumberAllowed} onChange={(e)=>(setIsNumberAllowed(e.target.checked))} className='w-5 h-5' />
          Include Numbers
        </label>

        <label htmlFor="sc" className='cursor-pointer text-base sm:text-lg flex items-center justify-center gap-2'>
          <input type="checkbox" name="" id="sc" checked = {isSpecialCharacterAllowed} onChange={(e)=>(setIsSpecialCharacterAllowed(e.target.checked))} className='w-5 h-5' />
          Include Special Characters
        </label>
      </div>

      <div className='flex flex-col md:flex-row justify-center gap-4 mt-8'>
        <button className='bg-black/20 px-6 py-3 rounded-lg cursor-pointer hover:bg-black/30 transition text-base sm:text-lg font-semibold flex-1 md:flex-none' onClick={generatePassword}>Generate Password</button>

        <button className='bg-black/20 px-6 py-3 rounded-lg cursor-pointer hover:bg-black/30 transition text-base sm:text-lg font-semibold flex-1 md:flex-none' onClick={copyPassword}>Copy Password</button>

        <button className='bg-black/20 px-6 py-3 rounded-lg cursor-pointer hover:bg-black/30 transition text-base sm:text-lg font-semibold flex-1 md:flex-none' onClick={resetPasswordSettings}>Reset Settings</button>
      </div>
    </div>
  </div>
  </>
  )
}

export default App
