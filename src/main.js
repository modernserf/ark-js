import "babel-polyfill"
import "whatwg-fetch"
import React from "react"
import DOM from "react-dom"
import App from "./views"
import { createStore } from "redux"
import { updateIn } from "util/collection"

const initState = {
    environment: {
        selected: null,
    },
    entities: {
        1: {
            id: 1,
            type: "Scene",
            name: "Multiverse",
            pos: { x: 0, y: 0, width: 500, height: 500 },
            childIDs: [2],
        },
        2: {
            id: 2,
            type: "Scene",
            name: "Hello, World!",
            pos: { x: 30, y: 30, width: 100, height: 20 },
            childIDs: [],
        },
    },
}

function reducer (state = initState, { type, payload }) {
    switch (type) {
    case "select_started":
        return updateIn(state, ["environment", "selected"], () => payload)
    case "mouse_moved":
        if (state.environment.selected) {
            return updateIn(state,
                ["entities", state.environment.selected, "pos"],
                (pos) => ({ ...pos, ...payload }))
        } else {
            return state
        }
    case "select_ended":
        return updateIn(state, ["environment", "selected"], () => null)
    }

    return state
}

const store = createStore(reducer)

document.addEventListener("DOMContentLoaded", () => {
    DOM.render(React.createElement(App, { store }),
        document.getElementById("app"))
})
