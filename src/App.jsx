/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumber] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) str += "0123456789";
    if (includeChar) str += "~@#$%^&*()_+{}[]";

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, includeNumbers, includeChar, setPassword]);

  const copyToClipboard = useCallback(()=>{
          passwordRef.current?.select();
          window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeChar, passwordGenerator]);
  return (
    <>
      <div className='w-full max-w-lg mx-auto rounded-lg bg-[#092635] shadow-md p-4 m-10'>
        <h1 className='text-2xl bold text-white text-center '>Password Generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4 mt-4 text-center '>
          <input
            type='text'
            placeholder='Password'
            value={password}
            readOnly
            ref={passwordRef}
            className='outline-none w-full py-1 px-3'
          />
          <button onClick={copyToClipboard} className='outline-none  bg-blue-700 hover:bg-blue-800 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2 text-white'>
          <div className='flex items-center gap-x-1 '>
            <input
              type='range'
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="font-semibold  ">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1 '>
            <input
              type='checkbox'
              defaultChecked={includeChar}
              name='charInput'
              id='charInput'
              className="cursor-pointer"
              onChange={() => {
                setIncludeChar((prev) => !prev);
              }}
            />
            <label htmlFor='charInput' className="cursor-pointer">Special Characters</label>
          </div>

          
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={includeNumbers}
              name='numberInput'
              id='numberInput'
              className="cursor-pointer"
              onChange={() => {
                setIncludeNumber((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' className="cursor-pointer">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
