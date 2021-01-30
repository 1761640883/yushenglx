<template>
    <div class="cinema_body">
        <ul>
            <li v-for="data in datalist" :key="data.cinemaId">
                <div>
                    <span>{{data.name}}</span>
                    <span class="q"><span class="price">{{data.lowPrice / 100}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{data.address}}</span>
                    <span>距离未知</span>
                </div>
                <div class="card">
                    <div>小吃</div>
                    <div>折扣卡</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'clist',
    data(){
        return {
            datalist: [],
            prevcityId: 0
        }
    },
    activated(){
        var cityId = this.$store.state.city.id;
        if(cityId === this.prevcityId){
            return;
        }
        var config = {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16095037913302396058927105","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }
        this.axios.get(`https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=4273921`, config).then(res=>{
            if(res.data.msg === "ok"){
                this.datalist = res.data.data.cinemas;
                console.log(this.datalist);
                this.prevcityId = cityId;
            }
        })
    }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body li div:nth-of-type(1){display: flex;justify-content: space-between;}
.cinema_body li div:nth-of-type(1) span:nth-of-type(1){max-width: 200px;overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(1){max-width: 250px;overflow: hidden; white-space: nowrap; text-overflow:ellipsis;display: inline-block;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>