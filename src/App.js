import React, { useState, useEffect } from 'react'
import data from './data'
import Button from 'react-bootstrap/Button'

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    setText(data.slice(0, amount))
  }

  const refreshLorem = () => {
    setCount(0);
    setText([])
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <section className='container text-center py-4'>
      <h1 className='py-3'>Tired of boring lorem ipsum?</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='amount'>Number of paragraphs:</label>
        <input type='number'
          min='1' max='10'
          id='amount'
          name='amount'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <Button type='submit' variant="outline-info"
          id="generate-btn">Generate</Button>
      </form>

      <article className='pt-3'>
        {text.map((paragraph, index) => {
          return <p key={index}
            onClick={() => {
              setAlert(true)
              navigator.clipboard.writeText(text)
            }}
            className={alert ? 'alert-paragraph' : 'regular-paragraph'}
          >{paragraph}</p>
        })}

        {alert && <h2>Copied to clipboard</h2>}

        {count > 0 && <Button onClick={refreshLorem} variant="info"
          className="my-3">Refresh</Button>}
      </article>
    </section>
  );
}

export default App;
