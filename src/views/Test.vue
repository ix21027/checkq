<template>
	<div>
		<v-layout row wrap justify-center>
			TECT
		</v-layout>
		<v-layout row wrap align-center justify-center>
			<v-flex xl7 lg8 md9 sm10 >
				<v-card>
					<v-card-title primary-title>
						<b>Яка функція невластива інформаційним системам?</b>
					</v-card-title>
					<v-card-text>
						<v-list>
							<v-radio-group v-model="radioGroup">
								<v-radio
									v-for="n in 3"
									:key="n"
									:label="`Radio ${n}`"
									:value="n"
									@click="clisk_fun"
								></v-radio>
							</v-radio-group>
						</v-list>
					</v-card-text>
					<v-card-actions>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import {answers} from './../assets/answers'

export default {
	data() {
		return {
			options :['first','second','thrid','fourth'],
			answ:answers,
			radioGroup:true
		}
	},
	methods: {
		clisk_fun(){
		}
	},
}
</script>

<style scoped>
.cell{
	border: 2px solid rgb(185, 178, 178);
	background:#fff;
	font-weight: 900;
	text-align: center;
}
</style>
