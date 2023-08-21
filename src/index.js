import {createRoot} from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss";


 const rootElement = document.getElementById('root');
 createRoot(rootElement).render(<App/>);