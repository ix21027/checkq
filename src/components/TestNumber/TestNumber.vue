<template>
	<div class="place">
		<v-btn @click="setPassed()" class="cell" :color="passed ? '#00E676':'#BBDEFB'" depressed  fab small>{{index}}</v-btn>
	</div>
</template>

<script>
export default {
	data() {
		return {
			passed:false,
		}
	},
	props:['index'],
	methods: {
		setPassed(){
			this.passed = !this.passed
		}
	},

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
