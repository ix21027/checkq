<template>
	<v-layout row wrap justify-center>
		<v-flex md10 sm11>
				<v-card >
					<v-card-title>
						<b>Яка функція невластива інформаційним системам?</b>
					</v-card-title>
					<v-card-text>
						<v-radio-group>
							<v-radio
								v-for="n in 4"
								:key="n"
								:label="`Radio ${n}`"
								:value="n"
							></v-radio>
						</v-radio-group>
					</v-card-text>
					<v-card-actions>
						<v-layout column>
							<v-layout row>
								<v-flex xs4 sm3 md2>
									<v-btn flat left outline color="grean">НАЗАД</v-btn>
								</v-flex>
								<v-flex xs4 sm6 md8>
									<v-spacer></v-spacer>
								</v-flex>
								<v-flex xs4 sm3 md2>
									<v-btn flat right outline color="success">ДАЛІ</v-btn>
								</v-flex>
							</v-layout>
							<v-layout row pr-3 pb-3>
								<v-flex xs6 sm8 md8 >
									<v-spacer></v-spacer>
								</v-flex>
								<timer></timer>
								<count></count>
							</v-layout>
						</v-layout>
					</v-card-actions>
				</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	components:{
		Timer: () => import('./../Timer/Timer'),
		Count: () => import('./../Count/Count')
	}
}
</script>
<style scoped>
</style>
