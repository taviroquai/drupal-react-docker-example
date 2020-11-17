import React, { useEffect, useState } from 'react'

/**
 * Load articles
 * TODO: extract endpoint to environment variables
 */
const endpoint = '/jsonapi'
const fetchOptions = { credentials: 'include' }
function getData(uri, options) {
  return fetch(endpoint + uri, { ...fetchOptions, ...options })
}
 
const Block = ({ uri = '/node/article' }) => {
  
  /**
   * Hold articles
   */
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  
  /**
   * Load articles on mount
   */
  useEffect(() => {
    setError('');
    const controller = new AbortController();
    const signal = controller.signal;
    let req = getData(uri, { signal });
    req.then(res => {
        if (res.status !== 200) return setError('Ops');
        return res.json()
      })
      .then(res => {
        if (!res) return setError('Ops');
        setArticles(res.data);
      })
      .catch(err => {
        console.log(err.code);
      });
    return () => {
      controller.abort();
    }
  }, []);

  /**
   * Render react app
   */
  return (
    <div>
      <div data-testid="welcome">Hello React!</div>
      <div data-testid="articles">
        { articles.map(item => 
          <h1 key={item.id}>{ item.attributes.title }</h1>
        )}
      </div>
      <div data-testid="error">{ error }</div>
    </div>
  )
}

export default Block;
