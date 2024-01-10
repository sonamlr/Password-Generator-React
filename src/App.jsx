
import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ''
  
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "1234567890"
    if(charAllow) str += "!@#$%&*"
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllow,setPassword])
  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllow])

  // useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,19);
      window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <div className='main'>
       <div className='main-wrapper'>
          <h1>Password Generator</h1>
          <div>
            <input type="text" value={password} placeholder='Password' className='text-black' readOnly ref={passwordRef} />
            <button onClick={copyPasswordToClipBoard}>copy</button>
          </div>
          <div>
            <div>
              <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) =>{setLength(e.target.value)}} />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div>
              <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() =>{setNumberAllow((prev) => !prev);}} />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div>
              <input type="checkbox" defaultChecked={charAllow} id='charInput' onChange={() =>{setCharAllow((prev) => !prev);}} />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>

      </div>
    </div>
   
  )
}

export default App
