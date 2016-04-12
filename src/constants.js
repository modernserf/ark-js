export const stateVersion = "ark-1"

// Actions (type, payload)

export const select_started = "select_started" // { id, x, y }
export const mouse_moved = "mouse_moved" // { x, y }
export const select_ended = "select_ended"
export const object_moved = "object_moved" // { id, x , y }

export const load_entities = "load_entities" // entities data
export const reset_entities = "reset_entities"
