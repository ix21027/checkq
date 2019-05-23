<template>
	<div class="place">
		<v-btn @click="color =(color == '#BBDEFB' ? '#00E676':'#BBDEFB')" class="cell" :color="color" depressed  fab small>{{index}}</v-btn>
	</div>
</template>

<script>
export default {
	data() {
		return {
			color:'#BBDEFB'
		}
	},
	props:['index'],

}
</script>

<style lang='scss' scoped>
.place{
	display: inline-block;
	button{
		border: 0px;
		width: 2em;
		height: 2em;
	}
	.cell{
		border-radius: 3px;
		text-align: center;
		margin: 2px;
	}
}
</style>
