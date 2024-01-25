import { useState, useEffect, useCallback } from 'react'
import { Constants } from './Constants';
import CommonHelper from './CommonHelper';

const DEFAULT_COUNT = 500;

export default function App() {
  
  const [ count, setCount ] = useState(500);
  const [ date , setDate ] = useState(new Date());
  const [ isShowSessionCount , setIsShowSessionCount ] = useState(false);
  const [ sessionCount, setSessionCount ] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('currentCount')) {
      localStorage.setItem('currentCount', DEFAULT_COUNT);
      setCount(DEFAULT_COUNT);
    } else {
      setCount(localStorage.getItem('currentCount'));
    }

    let timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clean up code
    return () => {
      clearInterval(timer);
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('currentCount', count);
  }, [count] )

  
  const decrement = () => {
    setCount(count => count - 1);
    setSessionCount(count => count + 1);

    setIsShowSessionCount(true);
    runSessionTimer();
  };

  const runSessionTimer = useCallback(debounce(() => {
    setIsShowSessionCount(false);
    setSessionCount(0);
  }), []);
  
  function debounce(func){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, 5000);
    };
  }

  const updateCount = (e) => {
    setCount(e.target.value);
    setSessionCount(0);
    setIsShowSessionCount(false);
  }

  const reset = (e) => {
    e.stopPropagation();
    setCount(DEFAULT_COUNT);
  }

  const getCountColor = () => {
    if (count >= (DEFAULT_COUNT * 0.7)) {
      return Constants.GOOD;
    }

    if ( count >= (DEFAULT_COUNT * 0.5)) {
      return Constants.MODERATE;
    }

    if (count >= (DEFAULT_COUNT * 0.3)) {
      return Constants.WARNING;
    }

    if (count >= (DEFAULT_COUNT * 0.1)) {
      return Constants.DANGER;
    }
  }

  return (
    <div className='container' onClick={decrement}>
      <div className='timeSection'>
        <div>{`${new CommonHelper().getDay(date.getDay())}`}</div>
        <div>{`${new CommonHelper().getDate(date.getDate(), date.getMonth(), date.getFullYear())}`}</div>
        <div style={{ letterSpacing: 10 }}>{`${new CommonHelper().getTime(date.getSeconds(), date.getMinutes(), date.getHours())}`}</div>
      </div>
      {
        isShowSessionCount &&
        <div className='sessionCount'>
          -{sessionCount}
        </div>
      }
      <div className='count' style={{ color: getCountColor()}}>{count}</div>
      <div style={{ position: 'absolute', bottom: 50 }}>
        <button className='resetButton' onClick={reset}>
          RESET
        </button>
      </div>
      <div className='countInput'>
        <input type='number' onClick={e => e.stopPropagation()} onChange={updateCount}></input>
      </div>
    </div>
  );
}
