<template>
    <div>
        <el-table :data="nowDatelist" border style="width: 100%" :key="nowDatelist.length">
            <el-table-column label="用户头像" width="100">
                <template slot-scope="scope">
                     <img class="userHead" :src="scope.row.userHead" alt="图片加载失败">
                 </template>
            </el-table-column>
            <el-table-column prop="data" label="注册时间"></el-table-column>
            <el-table-column prop="username" label="用户姓名"></el-table-column>
            <el-table-column prop="email" label="用户邮箱"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleToFreeze(scope.$index ,scope.row)" size="small">{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
                    <el-button size="small" type="danger" @click="handleToDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="datalist.length" class="page" :page-size="5" :current-page.sync="currentPage"></el-pagination>
    </div>    
</template>

<script>
export default {
    name: 'users',
    data(){
        return {
            datalist: [],
            currentPage: 1
        }
    },
    computed: {
        nowDatelist(){
            return this.datalist.slice((this.currentPage - 1) * 5, (this.currentPage) * 5)
        }
    },
    methods: {
        handleToFreeze(index, row){
            this.axios.post('/api2/admin/updateFreeze', {
                email: row.email,
                isFreeze: !row.isFreeze
            }).then(res=>{
                if(res.data.status === 0){
                    this.$alert('冻结操作成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.nowDatelist[index].isFreeze = !row.isFreeze
                        }
                    });
                }else{
                    this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            })
        },
        handleToDelete(index, row){
            this.axios.post('/api2/admin/deleteUser', {
                email: row.email
            }).then(res=>{
                if(res.data.status === 0){
                    this.$alert('删除操作成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.nowDatelist.splice(index, 1)
                        }
                    });
                }else{
                    this.$alert('删除操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            })
        }
    },
    mounted(){
        this.axios.get('/api2/admin/usersList').then(res=>{
            if(res.data.status === 0){
                this.datalist = res.data.data.usersList;
            }
        })
    }
}
</script>

<style scoped>
.userHead{width: 60px;height: 60px;border-radius: 50%;margin:  0 auto;}
.page{margin-top: 30px;}
</style>