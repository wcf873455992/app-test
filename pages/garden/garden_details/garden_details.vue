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
		<!-- 园区信息 -->
		<view class="garden-desc">
			<view class="garden-title">
				<view class="garden-title1">{{gardeninfo.gardenName}}</view>
				<view class="garden-title2">可租{{gardeninfo.vacantRoom}}套</view>
			</view>
			<view class="garden-info">{{gardeninfo.location}}</view>
			<view class="garden-info">{{gardeninfo.address}}</view>
			<view class="garden-info">{{gardeninfo.prices}}</view>
			<view class="garden-info">{{gardeninfo.acreage}}</view>
			<view class="garden-company">
				<view class="garden-title2">入住企业</view>
				<!-- <view class="">{{gardeninfo.company}}</view> -->
				<view class="garden-info">{{gardeninfo.intro}}</view>
			</view>
			<view class="garden-characteristic">
				<view class="garden-title2">园区特点</view>
				<!-- <view class="">{{gardeninfo.characteristic}}</view> -->
				<view class="garden-info">{{gardeninfo.characteristics}}</view>
			</view>			
		</view>
		<view class="garden-room-status">
			<view class="garden-title">
				<view class="garden-title1">房源销控图</view>
				<view class="garden-title2">房源清单</view>
			</view>
			<view class="garden-info">更新时间:2019年7月20日------待租、已收定、已租</view>
			<view class="garden-floor">
				<view class="garden-floorname">17F</view>
				
				<view class="garden-rooms"				
				
				>
					<view class="garden-room"
					:data-roomNumber="101"
					:data-gardenId = "gardeninfo.gardenId"
					@click="showRoomDetail"
					>
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
				</view>
			</view>
			
			<view class="garden-floor">
				<view class="garden-floorname">17F</view>
				<view class="garden-rooms">
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
					<view class="garden-room">
						<view class="garden-info">1701</view>
						<view class="garden-info">200㎡|3.5元</view>
					</view>
				</view>
			</view>
		</view>
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
				],
				gardeninfo: []
			}
		},
		onLoad(params){
			// debugger;
			//接收传值,id里面放的是标题，因为 测试数据并没写id 
			// let id = options.id;
			let id = 1;
			if(id){
				// this.$api.msg(`点击了${id}`);
			}
			// this.shareList = await this.$api.json('shareList');
			var gardenid = params.gardenId; 
			let headers = {};
			uni.request({
			  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
				// url: 'http://106.15.235.217:8001/renren-api/api/garden/info/'+`${id}`, //仅为示例，并非真实接口地址。
				url: this.serverUrl + '/api/garden/info/'+`${gardenid}`,
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
			showRoomDetail(e) {
				var roomNumber = e.currentTarget.dataset.roomnumber;		//变量小写
				var gardenId = e.currentTarget.dataset.gardenid;			//变量小写
				
				// var gardenId = 1;
				// 页面跳转接口api
				uni.navigateTo({
					url:"../garden_room/garden_room?roomnumber=" + roomNumber + '&gardenId='+gardenId
				})
			},
		}
	}
</script>

<style>
@import url("garden_details.css");
</style>
