import React, { useState } from 'react';
import './App.css';
import Display from './display.js';
import Button from './button.js';

function App() {
  
  const[prevNum, setPrevNum] = useState("");
  const[operator, setOperator] = useState("");
  const[currNum, setCurrNum] = useState("");

  const calculate = (symbol, prev, curr) => {
    const prevFloat = parseFloat(prev) || 0;
    const currFloat = parseFloat(curr) || 0;
  
    switch (symbol) {
      case "+":
        return prevFloat + currFloat;
      case "-":
        return prevFloat - currFloat;
      case "*":
        return prevFloat * currFloat;
      case "/":
        return currFloat !== 0 ? prevFloat / currFloat : "Error"; // Prevent NaN from division by zero
      default:
        return 0;
    }
  };
  
  const handleClick = (symbol) => {
    if (!isNaN(symbol) || symbol === ".") {
      if (symbol === "." && currNum.includes(".")) return; 
      setCurrNum(c => {
        if (c === "0" && symbol !== ".")
        {
          return symbol;
        }
        return c + symbol
      });
    } else if (symbol === "Clear") {
      setCurrNum("");
      setPrevNum("");
      setOperator("");
    }
    else if (symbol === "-")
    {
      if (!currNum)
      {
        setCurrNum(c => symbol + c)

      }
      else 
      {
        if (currNum) {
          if (prevNum) {
            setPrevNum(calculate(operator, prevNum, currNum).toString());
          } else {
            setPrevNum(currNum);
          }
        }
        setCurrNum("");
        setOperator(symbol);

      }

    
    } else if (["+", "/", "*"].includes(symbol)) {
      if (currNum) {
        if (prevNum) {
          setPrevNum(calculate(operator, prevNum, currNum).toString());
        } else {
          setPrevNum(currNum);
        }
      }
      setCurrNum("");
      setOperator(symbol);
    } else if (symbol === "=") {
      if (currNum && prevNum && operator) {
        const result = calculate(operator, prevNum, currNum);
        setCurrNum(result.toString()); 
        setPrevNum("");
        setOperator("");
      }
    }
  };
  

  return (
    <div className="container">
      <div className="body">
        <Display value={currNum ||prevNum || "0"}/>
        <div className="row">
          {
            ["1", "2", "3", "+"].map((symbol) => (
              <Button key={symbol} symbol={symbol} onClick={() => handleClick(symbol)} />
            )
            )
          }

        </div>
        <div className="row">
          {
            ["4", "5", "6", "-"].map((symbol) => (
              <Button key={symbol} symbol={symbol} onClick={() => handleClick(symbol)} />
            )
            )
          }

        </div>
        <div className="row">
          {
            ["7", "8", "9", "*"].map((symbol) => (
              <Button key={symbol} symbol={symbol} onClick={() => handleClick(symbol)} />
            )
            )
          }

        </div>
        <div className="row">
          {
            ["0", ".", "=", "/"].map((symbol) => (
              <Button key={symbol} symbol={symbol} onClick={() => handleClick(symbol)} />
            )
            )
          }

        </div>
        <div className="row">
          {
            <Button symbol={"Clear"} onClick={() => handleClick("Clear")} />
            
          }

        </div>
        
        
      </div>
    </div>
  );
}

export default App;
