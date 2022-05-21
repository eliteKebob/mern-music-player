import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/global.css"
import App from "./App"
import { AppLevelProvider } from "./context/AppLevelContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AppLevelProvider>
      <App />
    </AppLevelProvider>
  </React.StrictMode>
)
