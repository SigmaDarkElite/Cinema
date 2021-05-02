<template>
	<v-container>
		<!-- Componente de pestañas -->
		<v-tabs fixed-tabs background-color="primary" dark v-model="tab">
			<v-tab v-for="item in tabs" :key="item">
				{{ item }}
			</v-tab>
		</v-tabs>
		<!-- Tabla de datos -->
		<v-data-table :headers="headers" :items="elementos" class="elevation-1">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>{{ tabs[tab] }}</v-toolbar-title>
					<v-spacer></v-spacer>

					<v-btn color="primary" dark class="mb-2" @click="agregar_dialog = true">
						Agregar {{ tabs[tab] }}
					</v-btn>
				</v-toolbar>
			</template>
			<!-- Mostrar imagen de pelicula solo si estamos en tab 1 -->
			<template v-if="tab == 1" v-slot:item.test="{ item }">
				<v-img :src="item.imagen" :alt="item.name" width="150px"></v-img>
			</template>
		</v-data-table>

		<!-- Formulario para agregar elementos nuevos a la base de datos -->
		<v-dialog v-model="agregar_dialog" width="500">
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Agregar {{ tabs[tab] }}
				</v-card-title>
				<v-card-text>
					<!-- Campos para la pestaña 0 -->
					<div v-if="this.tab == 0">
						<v-text-field
							v-model="nueva_funcion.id_pelicula"
							label="ID de pelicula"
						></v-text-field>
						<v-text-field
							v-model="nueva_funcion.id_sala"
							label="Número de sala"
						></v-text-field>
						<v-text-field
							v-model="nueva_funcion.fecha_hora"
							label="Fecha y hora (YYYY-MM-DD HH:MM)"
						></v-text-field>
						<v-text-field
							v-model="nueva_funcion.precio"
							label="Precio ($)"
						></v-text-field>
					</div>
					<!-- Campos para la pestaña 1 -->
					<div v-if="this.tab == 1">
						<v-text-field
							v-model="nueva_pelicula.nombre"
							label="Nombre de la pelicula"
						></v-text-field>
						<v-text-field
							v-model="nueva_pelicula.descr"
							label="Descripción de la pelicula"
						></v-text-field>
						<v-text-field
							v-model="nueva_pelicula.imagen"
							label="URL de la imagen"
						></v-text-field>
					</div>
					<!-- Campos para la pestaña 2 -->
					<div v-if="this.tab == 2">
						<v-text-field
							v-model="nueva_sala.n_filas"
							type="number"
							label="Número de filas"
						></v-text-field>
						<v-text-field
							v-model="nueva_sala.n_asientos"
							type="number"
							label="Número de asientos por fila"
						></v-text-field>
					</div>
				</v-card-text>

				<v-divider></v-divider>
				
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="agregar_dialog = false">
						Cancelar
					</v-btn>
					<v-btn color="primary" text @click="agregar(tab)">
						Agregar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>
<script>
// @ is an alias to /src

export default {
	name: "Home",
	components: {},
	data: () => ({
		// Valor de la pestaña de la tabla
		tab: 0,
		// Nombre de las pestañas
		tabs: ["Funciones", "Peliculas", "Salas"],
		// Nombre de los headers
		headers: [],
		// Elementos que contendrá la tabla
		elementos: [],
		// Activación del dialog (Ventana para agregar elementos)
		agregar_dialog: false,
		// Objetos vacios que sirven como esqueleto
		nueva_pelicula: {
			nombre: "",
			descr: "",
			imagen: "",
		},
		nueva_funcion: {
			id_pelicula: "",
			id_sala: "",
			fecha_hora: "",
			precio: "",
		},
		nueva_sala: {
			n_filas: 0,
			n_asientos: 0,
		},
	}),
	// Método cuando se crea el componente
	created() {
		fill_data(this.tab);
	},
	methods: {
		// Llenar datos de la tabla dependiendo en que pestaña se encuentre
		fill_data(tab) {
			if (tab == 0) {
				this.get_funciones();
			} else if (tab == 1) {
				this.get_peliculas();
			} else if (tab == 2) {
				this.get_salas();
			}
		},
		// Regresa la información de las salas
		async get_salas() {
			// Petición http al server con la ruta definida ahí
			const salas = await this.axios.get("/sala/get-salas");
			this.elementos = salas.data;
			this.headers = [
				{
					text: "Número de sala",
					sorteable: true,
					value: "id",
					align: "center",
				},
				{
					text: "Número de filas",
					sorteable: true,
					value: "n_filas",
					align: "center",
				},
				{
					text: "Número de asientos por fila",
					sorteable: true,
					value: "n_asientos",
					align: "center",
				},
			];
		},
		async get_peliculas() {
			const peliculas = await this.axios.get("/pelicula/get-peliculas");
			this.elementos = peliculas.data;
			this.headers = [
				{
					text: "ID de pelicula",
					sorteable: true,
					value: "id",
					align: "center",
				},
				{
					text: "Nombre",
					sorteable: true,
					value: "nombre",
					align: "center",
				},
				{
					text: "Descripción",
					sorteable: true,
					value: "descr",
					align: "center",
				},
				{
					text: "Imagen",
					sorteable: true,
					value: "test",
					align: "center",
				},
			];
		},
		async get_funciones() {
			const funciones = await this.axios.get("/funcion/get-funciones");
			this.elementos = funciones.data;
			this.headers = [
				{
					text: "ID de función",
					sorteable: true,
					value: "id",
					align: "center",
				},
				{
					text: "ID de pelicula",
					sorteable: true,
					value: "id_pelicula",
					align: "center",
				},
				{
					text: "Número de Sala",
					sorteable: true,
					value: "id_sala",
					align: "center",
				},
				{
					text: "Fecha y hora",
					sorteable: true,
					value: "fecha_hora",
					align: "center",
				},
				{
					text: "precio",
					sorteable: true,
					value: "precio",
					align: "center",
				},
			];
		},
		// 
		async agregar(tab) {
			// Agregar en la base de datos elementos
			if (tab == 0) {
				await this.axios.post( "/funcion/agregar-funcion", this.nueva_funcion);
			} else if (tab == 1) {
				await this.axios.post( "/pelicula/agregar-pelicula", this.nueva_pelicula);
			} else if (tab == 2) {
				await this.axios.post("/sala/agregar-sala", this.nueva_sala);
			}
			// Actualizar tabla
			this.fill_data(tab);
			// Cerrar el formulario
			this.agregar_dialog = false;
		},
	},
	watch: {
		tab: function (val) {
			this.fill_data(val);
		},
	},
};
</script>
