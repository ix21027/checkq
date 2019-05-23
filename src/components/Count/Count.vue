<template>
	<v-flex xs3 sm2 md2>
		<v-icon @click="count_answ++" color="success" size="20" >check_circle</v-icon>
		{{count_answ+'/'+count_all}}
	</v-flex>
</template>
<script>
export default {
	data() {
		return {
			count_all:60,
			count_answ:7
		}
	},
}
</script>
<style>

</style>
