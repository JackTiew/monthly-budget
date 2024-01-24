import { useState, useEffect } from 'react'
import { Constants } from './Constants';

const DEFAULT_COUNT = 500;

export default function App() {

  const [ count, setCount ] = useState(500);

  useEffect(() => {
    if (!localStorage.getItem('currentCount')) {
      localStorage.setItem('currentCount', DEFAULT_COUNT);
      setCount(DEFAULT_COUNT);
    } else {
      setCount(localStorage.getItem('currentCount'));
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('currentCount', count);
  }, [count] )

  const decrement = () => {
    setCount(count => count - 1);
  };

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
      <div className='count' style={{ color: getCountColor()}}>{count}</div>
      <div style={{ position: 'absolute', bottom: 50 }}>
        <button className='resetButton' onClick={reset}>
          RESET
        </button>
      </div>
    </div>
  );
}
