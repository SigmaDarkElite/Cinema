<template>
	<v-container>
		<h1 class="my-5">Funciones</h1>
		<v-row>
			<v-card max-width="250" v-for="funcion in funciones" v-bind:key="funcion.id" class="mr-3">
				
				<v-img height="300" class="mx-auto" :src="funcion.imagen"></v-img>

				<v-card-title>{{funcion.nombre}}</v-card-title>

				<v-card-text>
				<v-row align="center" class="mx-0">
					<v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
					<div class="grey--text ml-4">4.5 (413)</div>
				</v-row>

				<div class="my-4 subtitle-1">
					$ {{funcion.precio}}.00
				</div>

				<div>{{funcion.descr}}</div>
				</v-card-text>

				<v-card-text>
					<v-chip>{{funcion.fecha_hora.toString().slice(0,21)}}</v-chip>
				</v-card-text>

				<v-card-actions>
					<router-link class="mx-auto" :to="'/compra/'+funcion.id">
						<v-btn class="mx-auto" color="primary">
							Comprar boleto
						</v-btn>
					</router-link>
				</v-card-actions>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home",
	components: {},
	data() {
		return {
			funciones: []
		}
	},
	created() {
		this.get_funciones()
	},
	methods: {
		async get_funciones() {
			const response = await this.axios.get("/funcion/get-funciones");
			this.funciones = response.data
			for(var i = 0; i < response.data.length; i++){
				this.funciones[i].fecha_hora = new Date(response.data[i].fecha_hora)
			}
		},
	},
};
</script>

