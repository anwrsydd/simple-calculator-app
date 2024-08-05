import "./App.css";
import { useState } from "react";

const keyList = ["C", "Del", "%", "÷", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "C", "0", ".", "="];
function App() {
    let [val, setVal] = useState("");
    const [history, setHistory] = useState([]);
    const clicked = function (value) {
        switch (value) {
            case "C":
                setVal("");
                break;
            case "Del":
                setVal(val.slice(0, val.length - 1));
                break;
            case "%":
                setVal(val + "%");
                break;
            case "÷":
                setVal(val + "÷");
                break;
            case "x":
                setVal(val + "x");
                break;
            case "-":
                setVal(val + "-");
                break;
            case "+":
                setVal(val + "+");
                break;
            case ".":
                setVal(val + ".");
                break;
            case "=":
                calculateValue();
                break;
            default:
                if (!isNaN(value)) {
                    setVal(val + value);
                }
        }
    };
    const calculateValue = function () {
        try {
            const result = eval(val.replaceAll("x", "*").replaceAll("÷", "/"));
            setVal(String(result));
            if (String(result) !== val) {
                setHistory([...history, val + "=" + result]);
            }
        } catch {
            setVal(val);
        }
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Simple Calculator App</h1>
            <h2 className="text-sm font-medium">Using ReactJS and TailwindCSS</h2>
            <div className="bg-gray-300 w-3/4 md:w-fit p-2 space-y-2 rounded-lg drop-shadow-2xl">
                <div className="h-[13rem] overflow-auto">
                    {history.map((h, i) => (
                        <p className="text-right text-sm text-gray-400">{h}</p>
                    ))}
                </div>
                <input
                    className="bg-gray-200 text-lg p-1 rounded-md w-full text-right"
                    type="text"
                    id="result"
                    readonly
                    value={val}
                />
                <div className="grid grid-cols-4 gap-3">
                    {keyList.map((k, i) => (
                        <button
                            className={`bg-gray-200 p-2 md:p-3 rounded-xl ${isNaN(k) && k !== "." ? "text-red-500" : ""} font-medium`}
                            onClick={() => clicked(k)}
                            key={k}
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
