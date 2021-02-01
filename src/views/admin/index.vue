<template>
    <div>
        <el-container>
            <el-header>鱼生网管理后台，欢迎：{{$store.state.user.name}}</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <router-link tag="span" to="/admin/users" slot="title">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <router-link tag="span" to="/admin/movie" slot="title">电影管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <router-link tag="span" to="/admin/cinema" slot="title">影院管理</router-link>
                    </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'admin',
    beforeRouteEnter (to, from, next){
        axios.get('/api2/admin').then(res=>{
            if(res.data.status === 0){
                next();
            }else{
                next('/mine/login')
            }
        })
    } 
}
</script>

<style scoped>
.el-header {
background-color: #B3C0D1;
color: #333;
text-align: left;
line-height: 60px;
padding-left: 100px;
font-size: 20px;
}

.el-aside {
background-color: #D3DCE6;
color: #333;
text-align: center;
line-height: 200px;
}

.el-main {
background-color: #E9EEF3;
color: #333;
text-align: center;
}

body > .el-container {
margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}
</style>