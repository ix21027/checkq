<template>
	<v-container grid-list-xl text-xs-center>
		<v-layout justify-center>
			<h2>TECT</h2>
		</v-layout>
		<show-test></show-test>
		<v-layout row wrap justify-center>
			<v-flex md10 sm11>
				<v-card>
					<v-card-text>
						<test-number v-for="i in 60" :key="i" :index="i"></test-number>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
	},
	components:{
		ShowTest: () => import('./../components/ShowTest/ShowTest'),
		TestNumber: ()=> import('./../components/TestNumber/TestNumber')
	},
}
</script>

<style scoped>
</style>