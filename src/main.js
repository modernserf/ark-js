import "babel-polyfill"
import "whatwg-fetch"
import React from "react"
import DOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import App from "./views"
import { reducer, sagas } from "./data"

const store = createStore(
    reducer,
    applyMiddleware(createSagaMiddleware(...sagas)))

document.addEventListener("DOMContentLoaded", () => {
    DOM.render(React.createElement(App, { store }),
        document.getElementById("app"))
})
