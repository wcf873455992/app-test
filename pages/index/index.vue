<template>
	<view class="page">

		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" />
		</view>
		<view class="garden-list page-block">
			<!-- <image src="http://122.152.205.72:88/superhero/DC/GreenLantern/cover.jpg" class="image-garden"></image> -->
			<!-- H5控制层填加@CrossOrigin -->
			<view class="single-garden" v-for="(buildinginfo,index) in buildingList" :key="index"
			:data-buildingId="buildinginfo.id"
			@click="showGardenDetail"
			>
				<image :src="buildinginfo.coverpic" class="image-garden"></image>

				<view class="garden-desc">					
					<view class="garden-title">
						<view class="garden-title1">{{buildinginfo.name}}</view>
						<view class="garden-title2">可租{{buildinginfo.waittingrentcount}}套</view>
					</view>					
					<view class="garden-title1">{{buildinginfo.areas}}</view>
					<view class="garden-info">{{buildinginfo.address}}</view>
					<view class="garden-info">{{buildinginfo.buildingaddress}}</view>
					
					<view class="garden-operator">
						<view class="garden-type">{{buildinginfo.buildingtype}}</view>						
						<view class="garden-info">{{buildinginfo.prices}}</view>
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
				trailerList: [],
				keywords: "", // 搜索的关键字
				currPage: 1, // 当前第几页
				totalPage: 1 ,// 总页数
				buildingList: []
			};
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onLoad() {
			var me = this;
			var serverUrl = me.serverUrl;
			this.refresh();
		},
		onReachBottom() {
			var me = this;

			var currPage = me.currPage + 1; // 查询下一页面，当前页数累加1
			var keywords = me.keywords; // 获得当前页面中data里的搜索值
			var totalPage = me.totalPage; // 获取总页数

			// 如果当前需要分页的分页数和总页数相等，就不分页
			if (currPage > totalPage) {
				return;
			}

			me.pagedTrailerList(keywords, currPage, 15);

		},
		methods: {
			refresh(){				
				// uni.showLoading({
				// 	mask: false
				// });
				// uni.showNavigationBarLoading();
				
				uni.request({
				  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					// url: 'http://106.15.235.217:8001/renren-api/api/garden/list', 
					url: this.serverUrl + '/api/building/list', 
					method: 'POST',//get或post
					// headers: headers,
					data: {
						params: 1,
					},
					success: result => {
						console.log(result);									
						//返回的基本信息做本 地缓存
						let data = result.data;
						if (data.code === 0) {
							let buildingList = data.page.list;
							this.buildingList = buildingList|| [];
							// this.gardenList = gardenList;
						} else {
							// this.$api.msg(result.data.msg);
						}
					},
					fail: () => {
						// uni.hideLoading();				
						// uni.navigateBack();  	
						// this.$api.msg('网络连接失败');
					},
					complete: () => {						
						uni.hideNavigationBarLoading();
						uni.hideLoading();
						uni.stopPullDownRefresh();
					},
				});	
			},
			showGardenDetail(e) {
				var buildingId = e.currentTarget.dataset.buildingid;
				// var gardenId = 1;
				// 页面跳转接口api
				uni.navigateTo({
					url: "../garden/garden_details/garden_details?buildingId=" + buildingId
				})
			},
			pagedTrailerList(keywords, page, pageSize) {
				var me = this;

				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();

				var serverUrl = me.serverUrl;
				// 查询猜你喜欢数据列表
				uni.request({
					// url: serverUrl + '/search/list?keywords=' + keywords
					// 										+ '&page=' + page
					// 										+ '&pageSize=' + pageSize,
					url: serverUrl + '/api/garden/list',
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.status == 200) {
							// debugger;
							var tempList = res.data.data.rows;
							me.trailerList = me.trailerList.concat(tempList);
							me.totalPages = res.data.data.total; // 获取总页数
							me.page = page; // 覆盖当前页面里的page
						}
						
						uni.hideLoading();
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
			},
			searchMe(e) {
				var me = this;
				// 获取搜索的内容
				var value = e.detail.value;
				me.keywords = value;
				me.trailerList = [];

				me.pagedTrailerList(value, 1, 15);
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
