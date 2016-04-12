import { take, put, select } from "redux-saga/effects"
import {
    select_started, select_ended, mouse_moved, object_moved,
} from "constants"

export function * dragProcess () {
    while (true) {
        const { payload: { id, x, y } } = yield take(select_started)
        const target = yield select((state) => state.entities[id])
        const offsetX = x - target.pos.x
        const offsetY = y - target.pos.y

        while (true) {
            const { type, payload } = yield take([mouse_moved, select_ended])
            if (type === select_ended) { break } // to outer loop
            const { x, y } = payload
            yield put({
                type: object_moved,
                payload: { id, x: x - offsetX, y: y - offsetY },
            })
        }
    }
}
