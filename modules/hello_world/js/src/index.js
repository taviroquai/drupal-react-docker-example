import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

/**
 * Load articles
 * TODO: extract endpoint to environment variables
 */
const endpoint = '/jsonapi'
const fetchOptions = { credentials: 'include' }
function getData(uri, options = {}) {
  return fetch(endpoint + uri, { ...fetchOptions, ...options })
    .then(res => res.json())
}
 
const Root = () => {
  
  /**
   * Hold articles
   */
  const [articles, setArticles] = useState([]);
  
  /**
   * Load articles on mount
   */
  useEffect(() => {
    getData('/node/article')
    .then(res => setArticles(res.data))
    .catch(err => console.log(err));
  }, []);

  /**
   * Render react app
   */
  return (
    <div>
      Hello React!
      { articles.map(item => 
        <h1 key={item.id}>{ item.attributes.title }</h1>
      )}
    </div>
  )
}
 
render(<Root/>, document.querySelector('#hello-world-react'));