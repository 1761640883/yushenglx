const state = {
    nm : localStorage.getItem('cityName') || '北京',
    id : localStorage.getItem('cityId') || '110100'
}

const mutations = {
    CITY_INFO(state, data){
        state.nm = data.name;
        state.id = data.id;
    }
}

const actions = {
    
}

export default {
    namespaced: true,// 有名字区分出来是哪个状态管理下的数据（命名空间）
    state,
    mutations,
    actions
}