import { updateIn } from "util/collection"
import {
    select_started, select_ended, object_moved, load_entities, reset_entities,
} from "constants"
import { dragProcess } from "./drag"
import { persistenceProcess } from "./persistence"

const initState = {
    environment: {
        dragging: false,
    },
    entities: {},
}

const defaultEntities = {
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
}

export function reducer (state = initState, { type, payload }) {
    switch (type) {
    case load_entities:
        return updateIn(state, ["entities"], () => payload)
    case reset_entities:
        return updateIn(state, ["entities"], () => defaultEntities)
    case select_started:
        return updateIn(state, ["environment", "dragging"], () => true)
    case select_ended:
        return updateIn(state, ["environment", "dragging"], () => false)
    case object_moved:
        return updateIn(state,
            ["entities", payload.id, "pos"],
            (pos) => ({ ...pos, x: payload.x, y: payload.y }))
    }
    return state
}

export const sagas = [dragProcess, persistenceProcess]
