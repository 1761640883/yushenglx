<template>
    <div class="movie_body" ref="myDiv">
        <loading v-if="isloading"></loading>
        <ul ref="myUl" v-else>
            <li v-for="data in datalist" :key="data.filmId" @click="handleToDetail(data.filmId)">
                <div class="pic_show"><img :src="data.poster"></div>
                <div class="info_list">
                    <div class="filmType"><h2>{{data.name}}</h2><div>{{data.filmType.name}}</div></div>
                    <p v-if="data.grade">观众评分 <span class="grade">{{data.grade}}</span></p>
                    <p v-else>暂无评分</p>
                    <p v-if="data.actors">主演: <span v-for="(actorsname, index) in data.actors" :key="index">{{actorsname.name}},</span></p>
                    <p v-else>暂无主演</p>
                    <p>{{data.category.replace(/\|/g, ' | ')}}</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'nowplaying',
    data(){
        return {
            datalist: [],
            count: 1,
            isTime: true,
            total: 0,
            count: 1,
            cityId: 0,
            prevCityId: 0,
            isloading: true
        }
    },
    methods: {
        load () {
            if(this.datalist.length === this.total){
                return;
            }
            if(this.isTime){
                var divScroll = this.$refs.myDiv.scrollTop + this.$refs.myDiv.offsetHeight;
                var ulHeight = this.$refs.myUl.offsetHeight - 10;
                if(divScroll > ulHeight){
                    this.isTime = false;
                    this.count++;
                    var config = {
                        headers: {
                            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${this.cityId}"}`,
				            'X-Host': 'mall.film-ticket.film.list'
                        }
                    };
                    this.axios.get(`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.count}&pageSize=10&type=1&k=1606497`, config).then(res=>{
                        this.datalist = [...this.datalist, ...res.data.data.films]
                    });
                    setTimeout(()=>{
                        this.isTime = true;
                    }, 1000)
                }
            }else{
                return;
            } 
        },
        handleToDetail(id){
            this.$router.push(`/movie/detail/1/${id}`)
        }
    },
    activated(){
        this.cityId = this.$store.state.city.id
        if(this.cityId === this.prevCityId){
            return;
        }
        var config = {
            headers: {
				'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"${this.cityId}"}`,
				'X-Host': 'mall.film-ticket.film.list'
			}
        }
		this.axios.get(`https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=1606497`, config).then((res)=>{
            if(res.data.msg === 'ok'){
                console.log(res.data.data.films);
                this.datalist = res.data.data.films;
                this.total = res.data.data.total;
                this.prevCityId = this.cityId;
                this.isloading = false;
                this.$nextTick(()=>{
                    this.$refs.myDiv.onscroll = this.load;
                })
            }
        })
	}
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;overflow: hidden;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list .filmType{display: flex;align-items: center;}
.movie_body .filmType div{width: 25px;height: 16px;font-size: 14px;background:#509fc9;color: white;line-height: 16px;border-radius: 4px;text-align: center;margin-left: 3px;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; max-width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>