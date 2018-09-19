import * as types from './mutation-types'

export default {
   [types.SHOWLOADING](state) {
        state.showLoading = true;
    }, [types.HIDELOADING](state) {
        state.showLoading = false;
    },
}
