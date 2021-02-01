<template>
    <div>
        <div>个人中心</div>
        <div class="img"><img :src="$store.state.user.userHead" alt="头像加载失败"></div>
        <div>当前用户：<span class="name">{{$store.state.user.name}}</span> <a href="#" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.admin">用户身份：管理员 <a href="/admin" target="_blank">进入管理员界面</a></div>
        <div v-else>用户身份： 普通会员</div>
        <div><input type="file" @change="handleToUpload" name="file"></div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'center',
    methods: {
        handleToLogout(){
            axios.get('/api2/users/logout').then(res=>{
                if(res.data.status === 0){
                    localStorage.removeItem('name'),
                    localStorage.removeItem('admin'),
                    this.$store.commit('user/USER_NAME', {name: '',admin: false, userHead: ''})
                    this.$router.push('/mine/login')
                }
            })
        },
        handleToUpload(ev){
            var file = ev.target.files[0];
            var param = new FormData();
            param.append('file', file, file.name);
            var config = {
                headers: {
                    'Content-Type': 'multipart/from-data'
                }
            }
            axios.post('/api2/users/uploadUserHead', param, config).then(res=>{

            })
        }
    },
    beforeRouteEnter(to, from, next){
        axios.get('/api2/users/getUser').then(res=>{
            if(res.data.status === 0){
                next(vm=>{
                    localStorage.setItem('name', res.data.data.username),
                    localStorage.setItem('admin', res.data.data.isAdmin),
                    vm.$store.commit('user/USER_NAME', {
                        name: res.data.data.username,
                        admin: res.data.data.isAdmin,
                        userHead: res.data.data.userHead
                    })
                });
            }else{
                next('/mine/login');
            }
        })
    }
}
</script>

<style scoped>
.img{height: 100px;width: 100px;border-radius: 50%;overflow: hidden;}
.img img{height: 100px;width: 100px;}
.name{color: cornflowerblue;}
</style>