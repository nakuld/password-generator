import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  //useRef Hook
  const passwordRef = useRef(null)

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!@#$%^&*()+=_{},~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [setPassword, length, numberAllowed, charAllowed]);

  const copytoClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-gray-500 h-screen w-full">
      <div className="w-[600px] m-auto bg-blue-500 top-10 relative p-7 rounded-xl shadow-md">
        <div className="flex">
          <input
            type="text"
            value={password}
            placeholder="password generator"
            className="w-full px-3 py-3 rounded-md"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copytoClipboard} className="px-3 py-3 rounded-md bg-green-500">COPY</button>
        </div>

        <div className="flex justify-between mt-4">
          <div className="relative flex gap-x-3">
            <input
              type="range"
              min="6"
              max="50"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              value={length}
            />
            <div className="text-md leading-6">
              <label htmlFor="comments" className="font-medium text-gray-900">
                Length {length}
              </label>
            </div>
          </div>

          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>
            <div className="text-md leading-6">
              <label className="font-medium text-gray-900">Numbers</label>
            </div>
          </div>
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
            </div>
            <div className="text-md leading-6">
              <label className="font-medium text-gray-900">Charactors</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
