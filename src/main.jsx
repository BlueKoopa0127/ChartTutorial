import React from 'react'
import {createRoot} from "react-dom/client";
import App from './App'
import {Test} from './Presenter'

createRoot(document.querySelector("#content")).render(<App />);
//createRoot(document.querySelector("#content")).render(<Test />);