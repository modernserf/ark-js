import localForage from "localforage"
import { take, put, fork, call, select } from "redux-saga/effects"
import { sleep } from "util/sleep"
import {
    load_entities, reset_entities, stateVersion,
} from "constants"

export function * persistenceProcess () {
    // handle resets
    yield fork(function * () {
        while (true) {
            yield take(reset_entities)
            yield call([localForage, localForage.removeItem], stateVersion)
        }
    })

    try {
        const data = yield call([localForage, localForage.getItem], stateVersion)
        if (data) {
            const payload = JSON.parse(data)
            yield put({ type: load_entities, payload })
        } else {
            yield put({ type: reset_entities })
        }
    } catch (e) {
        yield put({ type: reset_entities })
    } finally {
        while (true) {
            yield call(sleep, 5000)
            const entities = yield select((state) => state.entities)
            const data = JSON.stringify(entities)
            yield call([localForage, localForage.setItem], stateVersion, data)
        }
    }
}
