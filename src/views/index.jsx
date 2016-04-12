import "./reset.css"
import "./style.css"
import React from "react"
import h from "react-hyperscript"
import { connect, Provider } from "react-redux"
import { select_started, select_ended, mouse_moved } from "constants"

export default class App extends React.Component {
    render () {
        return h(Provider, this.props, [
            h(Multiverse),
        ])
    }
}

const Multiverse = connect()(
class Multiverse extends React.Component {
    render () {
        const { dispatch } = this.props
        return h("div", {
            onMouseMove: (e) => dispatch({
                type: mouse_moved,
                payload: { x: e.clientX, y: e.clientY },
            }),
            onMouseUp: () => dispatch({ type: select_ended }),
        }, [
            h(Renderable, { id: 1 }),
        ])
    }
})

class Scene extends React.Component {
    render () {
        const { id, name, childIDs,
            pos: { x, y, width, height } } = this.props

        return h(Positionable, { x, y }, [
            h(Draggable, {
                id,
                style: { position: "absolute", zIndex: 1 },
            }, name),
            h("div",
                { style: { width, height } },
                childIDs.map((id) => h(Renderable, { id }))),
        ])
    }
}

const Renderable = connect((state, { id }) => (state.entities[id] || {}))(
class Renderable extends React.Component {
    render () {
        const { type } = this.props
        if (!type) { return null }

        return h(types[type], this.props)
    }
})

const Draggable = connect(() => ({}))(
class Draggable extends React.Component {
    onMouseDown (e) {
        const { dispatch, id } = this.props
        e.preventDefault()
        dispatch({
            type: select_started,
            payload: { id, x: e.clientX, y: e.clientY },
        })
    }
    render () {
        return h("div", {
            style: this.props.style,
            onMouseDown: (e) => this.onMouseDown(e),
        }, this.props.children)
    }
})

class Positionable extends React.Component {
    render () {
        const { x, y, children } = this.props
        return h("div", {
            style: {
                position: "absolute",
                transform: `translate3d(${x || 0}px,${y || 0}px, 0)`,
            },
        }, children)
    }
}

const types = { Scene }
