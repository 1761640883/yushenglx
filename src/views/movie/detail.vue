<template>
    <div id="detailContrainer" class="slide-emter-active">
        <heaod title="影片详情"><i class="iconfont icon-right" @click="handleToBack"></i></heaod>
        <loading v-if="isLoading"></loading>
        <div id="content" class="contentDetail" v-else>
            <div class="detail_list">
                <div class="detail_list_bg"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="datalist.poster" alt="图片加载失败">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{datalist.name}}</h2>
                        <p v-if="datalist.grade">{{datalist.grade}}</p>
                        <p v-else>暂无评分</p>
                        <p>{{datalist.filmType.name}}</p>
                        <p>{{datalist.category.replace(/\|/g, ' | ')}}</p>
                        <p>{{datalist.nation}}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{datalist.synopsis}}</p>
            </div>
            <div class="detail_player swiper-container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for="(data, index) in datalist.actors" :key="index">
                        <div>
                            <img :src="data.avatarAddress" alt="图片加载失败">
                        </div>
                        <p>{{data.name}}</p>
                        <p>{{data.role}}</p>
                    </li>
                </ul>
            </div>
        </div> 
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper.min.css'

export default {
    name: 'detail',
    props:['id'],
    data(){
        return {
            datalist: {},
            isLoading: true
        }
    },
    methods: {
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        var config = {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }
        this.axios.get(`https://m.maizuo.com/gateway?filmId=${this.id}&k=339907`, config).then(res=>{
            if(res.data.msg === 'ok'){
                this.datalist = res.data.data.film;
                console.log(this.datalist);
                this.isLoading = false;
                this.$nextTick(()=>{
                    new Swiper('.detail_player',{
                        slidesPerView: 'auto',
                        freeMode: true,
                        freeModeSticky: true
                    })
                })
            }
        })
    }
}
</script>

<style scoped>
#detailContrainer{position: absolute;left: 0;top: 0;z-index: 10;min-height: 100%;width: 100%;background: white;}
#detailContrainer.slide-emter-active{animation: .5s slideMove;}
	@keyframes slideMove{
		0%{transform: translateX(100%);}
		100%{transform: translateX(0);}
	}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/img/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:80px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide div{width: 80px;height: 100px;overflow: hidden;}
.detail_player .swiper-slide img{ width:80px; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>