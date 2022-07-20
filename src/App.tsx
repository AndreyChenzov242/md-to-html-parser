import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { customRenderer } from './customRenderer';
const readmePath = require('./md.md');

export function App(): JSX.Element {
  const [markedHtml, setMarkedHtml] = useState<string>();

  marked.use({
    renderer: customRenderer,
  });

  useEffect(() => {
    fetch(readmePath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setMarkedHtml(marked.parse(text));
      });
  }, []);

  return (
    <div
      className="App"
      dangerouslySetInnerHTML={{ __html: markedHtml! }}
    ></div>
  );
}
