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
				<view class="garden-title1">{{buildinginfo.name}}</view>
				<view class="garden-title2">可租{{buildinginfo.waittingrentcount}}套</view>
			</view>
			<view class="garden-info">{{buildinginfo.address}}</view>
			<view class="garden-info">{{buildinginfo.buildingaddress}}</view>
			<view class="garden-info">{{buildinginfo.unitprice}}</view>
			<view class="garden-info">{{buildinginfo.areas}}</view>
			<view class="garden-company">
				<view class="garden-title2">入住企业</view>
				<!-- <view class="">{{gardeninfo.company}}</view> -->
				<view class="garden-info">{{buildinginfo.intro}}</view>
			</view>
			<view class="garden-characteristic">
				<view class="garden-title2">园区特点</view>
				<!-- <view class="">{{gardeninfo.characteristic}}</view> -->
				<view class="garden-info">{{buildinginfo.characteristics}}</view>
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
				
				<view class="garden-rooms">
					<view class="garden-room"
					:data-roomid="101"
					:data-buildingId = "buildinginfo.Id"
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
			<view class="building-intro">
				<view class="building-title">楼盘简介</view>
				<view class="building-info">
					<view class="building-info">总楼层</view>
					<view class="">建筑面积</view>
					<view class="">标准层高</view>
					<view class="">开发商</view>
					<view class="">物业公司</view>
				</view>
				<view class="building-text">楼盘介绍</view>
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
				buildinginfo: []
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
			var buildingid = params.buildingId;
			let headers = {};
			uni.request({
			  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
				// url: 'http://106.15.235.217:8001/renren-api/api/garden/info/'+`${id}`, //仅为示例，并非真实接口地址。
				url: this.serverUrl + '/api/building/info/'+`${buildingid}`,
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
						this.buildinginfo = data.building;
					} else {
						// this.$api.msg(result.data.msg);
					}
				},
				fail: () => {
					uni.hideLoading();				
					// uni.navigateBack();  	
					// this.$api.msg('网络连接失败');
				},
				complete: () => {},			   
			});	
			// debugger;
		},
		methods: {
			showRoomDetail(e) {
				var roomid = e.currentTarget.dataset.roomid;		//变量小写
				var gardenId = e.currentTarget.dataset.gardenid;			//变量小写
				
				// var gardenId = 1;
				// 页面跳转接口api
				uni.navigateTo({
					// url:"../garden_room/garden_room?roomnumber=" + roomNumber + '&gardenId='+gardenId,
					url:"../garden_room/garden_room?roomid=" + roomid
				})
			},
		}
	}
</script>

<style>
@import url("garden_details.css");
</style>
