<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */	
	.page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		/* position: absolute; */
		
	}
	
	.page-block {
		/* background-color: #ffffff; */
		
		background-color: #fffff1;
	}
	
	.line-wapper {
		padding: 0upx 20upx;
	}
	.line {
		height: 1px;
		background-color: #DBDBDA;
	}
	.fontB{
		font-size: 30upx;
	}
	.fontL{
		font-size: 23upx;
	}
	.title {//	
	font-size: 30upx;
	color: #2f3334;
	font-weight: 600;
	overflow: hidden;	
	white-space: nowrap;
	text-overflow: ellipsis;
	
}
</style>
