import './index.css'
import { createRoot } from 'react-dom/client';

// @ts-ignore
import React from 'react' 
import App from './App'

const container = document.getElementById('root');
if (!container) throw new Error('No root element');

const root = createRoot(container);
root.render(<App />);
