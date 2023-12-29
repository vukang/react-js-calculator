import { useState } from 'react';

import './App.css';

const Pad = (props) => {
  const handleClick = (id, sign) => {
    switch (id) {
      case 'clear':
        props.clear();
        break;

      case 'decimal':
        props.addDecimal();
        break;

      case 'equals':
        if (props.firstOperand && props.nextOperand) {
          console.log(
            `We are calculating ${props.firstOperand} ${props.operator} ${props.nextOperand}`
          );
          props.calculateResult();
        } else {
          console.error('nextOperand missing!');
        }

        break;

      case 'add':
        if (props.nextOperand) props.calculateResult();
        props.setOperator('+');
        break;
      case 'subtract':
        if (props.nextOperand) props.calculateResult();
        if (props.operator === '+') {
          props.setOperator('-');
        } else {
          props.setOperator((prevOperator) => {
            return prevOperator.concat('-');
          });
        }
        break;
      case 'multiply':
        if (props.nextOperand) props.calculateResult();
        props.setOperator('*');
        break;
      case 'divide':
        if (props.nextOperand) props.calculateResult();
        props.setOperator('/');
        break;

      default:
        // handling special Zero case
        if (props.id == 'zero') {
          if (
            props.firstOperand.length < 1 ||
            (props.operator && props.nextOperand.length < 1)
          ) {
            console.error('cant add "zero" as first number buddy...');
            break;
          }
        }

        // add number to display
        if (!props.operator) {
          props.setFirstOperand((prevState) => prevState.concat(props.children));
        } else {
          props.setNextOperand((prevState) => prevState.concat(props.children));
        }

        break;
    }
  };

  return (
    <div
      id={props.id}
      className={props.className}
      onClick={() => {
        handleClick(props.id, props.children);
      }}
    >
      {props.children}
    </div>
  );
};

function App() {
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState('');
  const [firstOperand, setFirstOperand] = useState('');
  const [nextOperand, setNextOperand] = useState('');

  function clear() {
    setResult(0);
    setFirstOperand('');
    setNextOperand('');
    setOperator('');
  }

  function addDecimal() {
    if (operator) {
      if (!nextOperand.includes('.'))
        setNextOperand((prevState) => prevState.concat('.'));
    } else {
      if (!firstOperand.includes('.'))
        setFirstOperand((prevState) => prevState.concat('.'));
    }
  }

  function calculateResult() {
    setFirstOperand(String(eval(`${firstOperand} ${operator} ${nextOperand}`)));
    setResult(eval(`${firstOperand} ${operator} ${nextOperand}`));
    setOperator('');
    setNextOperand('');
  }
  return (
    <div className='App'>
      {/* <div id='inputDisplay' className='inputDisplay'>
        Input:
        <br /> {firstOperand} {operator} {nextOperand}
      </div> */}
      <div className='display' id='display'>
        {!firstOperand ? result : `${firstOperand} ${operator} ${nextOperand}`}
      </div>
      <div id='calculator'>
        <div className='wrapper'>
          <div id='num-pad'>
            <Pad
              className='num'
              id='nine'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              9
            </Pad>
            <Pad
              className='num'
              id='eight'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              8
            </Pad>
            <Pad
              className='num'
              id='seven'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              7
            </Pad>
            <Pad
              className='num'
              id='six'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              6
            </Pad>
            <Pad
              className='num'
              id='five'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              5
            </Pad>
            <Pad
              className='num'
              id='four'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              4
            </Pad>
            <Pad
              className='num'
              id='three'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              3
            </Pad>
            <Pad
              className='num'
              id='two'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              2
            </Pad>
            <Pad
              className='num'
              id='one'
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              1
            </Pad>
            <Pad
              className='num'
              id='zero'
              firstOperand={firstOperand}
              nextOperand={nextOperand}
              setFirstOperand={setFirstOperand}
              setNextOperand={setNextOperand}
              operator={operator}
            >
              0
            </Pad>
            <Pad className='num' id='decimal' addDecimal={addDecimal}>
              .
            </Pad>
            <Pad
              className='num'
              id='equals'
              firstOperand={firstOperand}
              nextOperand={nextOperand}
              calculateResult={calculateResult}
              operator={operator}
            >
              =
            </Pad>
          </div>
          <div id='op-pad'>
            <Pad className='operator' id='clear' clear={clear}>
              CLEAR
            </Pad>
            <Pad
              className='operator'
              id='add'
              setOperator={setOperator}
              nextOperand={nextOperand}
              calculateResult={calculateResult}
            >
              +
            </Pad>
            <Pad
              className='operator'
              id='subtract'
              setOperator={setOperator}
              nextOperand={nextOperand}
              calculateResult={calculateResult}
            >
              -
            </Pad>
            <Pad
              className='operator'
              id='divide'
              setOperator={setOperator}
              nextOperand={nextOperand}
              calculateResult={calculateResult}
            >
              /
            </Pad>
            <Pad
              className='operator'
              id='multiply'
              setOperator={setOperator}
              nextOperand={nextOperand}
              calculateResult={calculateResult}
            >
              *
            </Pad>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
