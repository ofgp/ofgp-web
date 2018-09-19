import * as types from './mutation-types';

export default {
    [types.SHOWLOADING]: ({commit}) => {
        commit(types.SHOWLOADING)
    },
    [types.HIDELOADING]: ({commit}) => {
        commit(types.HIDELOADING)
    },
}
