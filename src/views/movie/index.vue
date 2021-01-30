<template>
    <div id="main">
        <heaod title="鱼生电影"></heaod>
        <div id="content">
			<div class="movie_menu">
				<router-link class="city_name" tag="div" to="/movie/city">
					<span>{{this.$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link class="hot_item" tag="div" to="/movie/nowplaying">正在热映</router-link>
					<router-link class="hot_item" tag="div" to="/movie/comingsson">即将上映</router-link>
				</div>
				<router-link to="/movie/search" tag="div" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
        <tabbar></tabbar>
		<router-view name="detail"></router-view>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS'

export default {
	name: 'movie',
	mounted(){
		var This = this;
		var citynm = this.$store.state.city.nm;
		setTimeout(()=>{
			messageBox({
				title: '定位',
				content: citynm,
				ok: '取消',
				cancel: '切换定位',
				handleCancel(){
					This.$router.push('/movie/city')
				}
			})
		}, 1500)
		
	}
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>