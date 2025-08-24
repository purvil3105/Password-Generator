import { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}~";

    for (let i = 0; i < length; i++) { 
      let char = Math.floor(Math.random() * str.length); 
      pass += str.charAt(char); 
    }

    setPassword(pass); 
  }, [length, charAllowed, numAllowed, setPassword]);

  const CopypasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-700">
        <h1 className="text-white text-center font-bold my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-1 px-3 bg-white border-s-4-white font-medium"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-500' onClick={CopypasswordToClipboard}>Copy</button>
        </div>
        <div className="mb-4">
          <label className=" mr-2 font-medium">Password Length: ({length})  </label>
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer"
            />
            
        </div>
        <div className="mb-4 font-medium">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className='cursor-pointer'
            />
           <label className="mr-2"> Include Special Characters
          </label>
        </div>
        <div className="mb-4 font-medium">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed(!numAllowed)}
              className='cursor-pointer'
            />
             <label className=" mr-2 cursor-pointer"> Include Numbers
          </label>
        </div>

      </div>
    </>
  );
}

export default App;
