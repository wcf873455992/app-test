<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->			
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<!-- <image :src="globalUser.faceImage" class="face"></image> -->
					<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
					<view class="arrow-block">
						<image src="../../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 昵称 -->
			<view class="item-wapper" @click="modifyNickname">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						<!-- {{globalUser.nickname}} -->
						远行者
					</view>
					<view class="arrow-block">
						<image src="../../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday">
				<view class="info-words">生日</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						<!-- {{globalUser.birthday}} -->
						1988-04-10
					</view>
					<view class="arrow-block">
						<image src="../../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						
						<view v-if="globalUser.sex == 1">
							男
						</view>
						<view v-else-if="globalUser.sex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>
						
					</view>
					<view class="arrow-block">
						<image src="../../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">
				清理缓存
			</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser:{}
			}
		},
		onShow() {
			var me = this;
			var globalUser = me.getGlobalUser("globalUser");
			me.globalUser = globalUser
		},
		methods: {
			operator(){
				var me = this;
				var globalUser = me.getGlobalUser("globalUser");
				uni.showActionSheet({
					itemList:["查看我的头像","从相册选择上传"],
					success(res){
						var index = res.tapIndex;
						if (index == 0){
							var faceArr = [];
							faceArr.push(globalUser.faceImage)
							uni.previewImage({
								urls:faceArr,
								current:faceArr[0]
							})
						}else if (index == 1){
							uni.navigateTo({
								url: "../myface/myface"
							})
						}
					}
				})
			},
			cleanStorage(){
				uni.clearStorageSync();
				uni.showToast({
					title: "清理缓存成功",
					mask:false,
					duration:1500
				});				
				uni.navigateBack();
			},
			logout(){
				var globalUser = this.getGlobalUser("globalUser");
				// console.log(globalUser);
				uni.request({
					url: this.serverUrl +'/api/logout?token=' + globalUser.token, //
					method: 'POST',//get或post
					success: result => {
						console.log(result);
						let data = result.data;
						if (data.code === 0) {
							uni.showToast({
								title:data.msg,
								duration:2000,
								// image: "../"
							})
							uni.removeStorageSync('globalUser', data);
							uni.navigateBack();
						} else {
							uni.showToast({
								title:data.msg,
								duration:2000,
								// image: "../"
							})
							// uni.removeStorageSync('globalUser');
						}
					},
					fail: () => {
						uni.hideLoading();				
						// uni.navigateBack();  	
						// this.$api.msg('网络连接失败');
					},
					complete: () => {},			   
				});
			}
		}
	}
</script>

<style>
	@import url("myinfo.css");
</style>
