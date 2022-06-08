import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
import './styles/styles.scss';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
