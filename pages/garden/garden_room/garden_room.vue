<template>
	<view class="page">
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
		
			<swiper-item v-for="carousel in carouselList">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + carousel.movieId">
					<image :src="carousel.image" class="carousel"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList:[
					{
						image:"../../../static/carousel/batmanvssuperman.png"
					},{
						image:"../../../static/carousel/spiderman.png"
					},{
						image:"../../../static/carousel/batmanvssuperman.png"
					},{
						image:"../../../static/carousel/spiderman.png"
					},{
						image:"../../../static/carousel/batmanvssuperman.png"
					}
				]
			}
		},
		onLoad(params) {
			// debugger;
			
			var room_number = params.roomnumber;			
			let headers = {};
			uni.request({
			  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
				// url: 'http://106.15.235.217:8001/renren-api/api/garden/info/'+`${id}`, //仅为示例，并非真实接口地址。
				url: this.serverUrl + '/api/garden/room='+`${room_number}`+ '&garden_id='+ '${gardenID}',
				method: 'POST',//get或post
				headers: headers,
				data: {
					// params: 1,
				},
				success: result => {
					console.log(result);									
					//返回的基本信息做本地缓存
					let data = result.data;
					if (data.code === 0) {									
						// this.$api.msg('加载成功');
						// let gardeninfo = data.garden;
						this.gardeninfo = data.garden;
					} else {
						this.$api.msg(result.data.msg);
					}
				},
				fail: () => {
					uni.hideLoading();				
					// uni.navigateBack();  	
					this.$api.msg('网络连接失败');
				},
				complete: () => {},			   
			});	
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("garden_room.css");
</style>
