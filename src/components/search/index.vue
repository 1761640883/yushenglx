<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="mysearch">
            </div>					
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="data in datalist" :key="data.id">
                    <div class="img"><img :src="data.img.replace('w.h', '126.180')"></div>
                    <div class="info">
                        <p><span class="title">{{data.nm}}</span><span v-if="data.sc">{{data.sc}}</span><span v-else>暂无评价</span></p>
                        <p class="title" v-if="data.enm">{{data.enm}}</p>
                        <p v-else>暂无翻译</p>
                        <p>{{data.cat}}</p>
                        <p>{{data.rt}}上映</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data(){
        return {
            mysearch: '',
            datalist: []
        }
    },
    methods: {
        cancelRequest () { // axios防抖动定义的函数（需要复制）
            if (typeof this.source === 'function') {
                this.source('终止请求')
            }
        }
    },
    watch: {
        mysearch(newVal){
            var that = this// axios防抖动（从这里开始复制）
            this.cancelRequest()
            if(newVal === ''){
                this.datalist = '';
            }else{
                this.axios.get(`/ajax/search?kw=${newVal}&cityId=10&stype=-1`, { // 但是这个函数实参不是自定义的，需要复制（开始）
                    cancelToken: new this.axios.CancelToken(function (c) {
                        that.source = c
                    })
                }).then((res)=>{
                    this.datalist = res.data.movies.list;
                    console.log(this.datalist);
                }).catch((err) => { // catch不是自定义
                    if (this.axios.isCancel(err)) {
                        console.log('Rquest canceled', err.message) // 请求如果被取消，这里是返回取消的message
                    } else {
                        console.log(err)
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1){display: flex; justify-content: space-between;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; max-width: 200px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
.search_body .search_result .title{overflow: hidden; white-space: nowrap; text-overflow:ellipsis;max-width: 200px;}
</style>