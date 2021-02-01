const state = {
    name: localStorage.getItem('name'),
    admin: localStorage.getItem('admin') || false,
    userHead: ''
};

const mutations = {
    USER_NAME(state, data){
        state.name = data.name,
        state.admin = data.admin,
        state.userHead = data.userHead
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}