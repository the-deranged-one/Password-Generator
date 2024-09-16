import { useCallback, useEffect, useState } from "react"

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str = str + "0123456789"
    if (characterAllowed) str = str + "!@#$%^&*()"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass = pass + str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    }
    catch (error) {
      alert("Failed to copy password.");
    }
  }
  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-white bg-gray-800">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full py-1 px-3 text-black"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 px-3 mx-1 rounded-md shrink-0"
            onClick={copyToClipboard}>copy</button>
        </div>
        <div className="flex text-sm">
          <div className="flex  gap-x-3">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
            />
            <label>Length:{length}</label>

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label>numbers{numberAllowed}</label>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label>characters{characterAllowed}</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
