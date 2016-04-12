export const stateVersion = "1"

// Actions (type, payload)

export const critter_requested = "critter_requested" // profile
export const critter_created = "critter_created" // { id, profile, position }

export const critter_moved = "critter_moved" // { id, pos: {x, y, th } }
export const critter_pooped = "critter_pooped" // { x, y }
export const critter_eat_req = "critter_eat_req" // { critter_id, food_id }
export const food_eaten = "food_eaten" // { critter_id, food_id, food_value }
// meta actions
export const state_loaded = "state_loaded" // whole reducer state
export const state_cleared = "state_cleared"

// Entity types
export const critter = "critter"
export const food_bowl = "food_bowl"
