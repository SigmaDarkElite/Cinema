<template>
    <v-container>
        <v-row justify="center" align="center" class="my-5">
            <h1 class="mr-10">{{funcion.nombre}}</h1>
            <v-chip>{{funcion.fecha_hora.toString().slice(0,21)}}</v-chip>
        </v-row>
        <v-img height="250" contain :src="funcion.imagen"></v-img>
        <v-row justify="center" align="center" class="mt-3">
            <h2>Selecciona tu asiento</h2>
        </v-row>
        <v-row justify="center" align="center" class="mt-3">
            <v-icon disabled>mdi-sofa-single</v-icon> - Ocupado
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
            <h4>Pantalla</h4>
        </v-row>
        <v-row justify="center" align="center">
            ------------------------------------------------------------
        </v-row>

        <v-row v-for="fila in sala.n_filas" v-bind:key="fila" justify="center" align="center" >
            <div v-for="asiento in sala.n_asientos" v-bind:key="asiento.id" class="mr-5">
                <v-btn 
                    icon 
                    :color="asientos[(asiento + (sala.n_asientos * (fila - 1))) - 1].estado?'red':'blue'"
                    :disabled="asientos[(asiento + (sala.n_asientos * (fila - 1))) - 1].estado?true:false"
                    @click="compra(asientos[(asiento + (sala.n_asientos * (fila - 1))) - 1].id)"
                >
                    <v-icon>mdi-sofa-single</v-icon>
                </v-btn>
                <h3>{{ asientos[(asiento + (sala.n_asientos * (fila - 1))) - 1].id}}</h3>
            </div>
        </v-row>

        <v-dialog v-model="dialog" max-width="344">
            <v-card
                class="mx-auto"
                max-width="344"
                outlined
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                    RESUMEN DE COMPRA
                    </div>
                    <v-list-item-title class="headline mb-1">
                    Asiento {{asiento_id}}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{funcion.nombre}} - {{funcion.fecha_hora.toString().slice(0,21)}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                    <v-img height="250" contain :src="funcion.imagen"></v-img>
                </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                <v-btn color="primary" dark @click="compra_aceptada()">
                    Comprar
                </v-btn>
                <v-btn color="red" dark @click="dialog = false">
                    Cancelar
                </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
        <!-- {{funcion}}
        {{asientos}}
        {{sala}} -->
    </v-container>
</template>

<script>
import jsPDF from 'jspdf'

export default {
    name: 'Compra',
    data() {
        return {
            funcion_id: '',
            funcion: {},
            asientos: [],
            sala: {},
            dialog: false,
            asiento_id: ''
        }
    },
    created() {
        // Recibe el id de la función desde el link
        this.funcion_id = this.$route.params.id
        this.get_funcion()
    },
    methods: {
        async get_funcion(){
            let res = await this.axios.post('/funcion/get-funcion', {funcion_id: this.funcion_id})
            this.funcion = res.data[0]
            let asientos = await this.axios.post('/funcion/get-asientos', {funcion_id: this.funcion_id})
            this.asientos = asientos.data
            this.funcion.fecha_hora = new Date(res.data[0].fecha_hora)

            let sala = await this.axios.post('/sala/get-sala', {sala_id: this.funcion.id_sala})
            this.sala = sala.data[0]
        },
        async compra(asiento_id){
            this.asiento_id = asiento_id
            this.dialog = true
        },
        async compra_aceptada(){
            var doc = new jsPDF('p', 'pt');
            doc.text(`**** Cinema ****`, 40, 40);
            doc.text(`-------------------------------------------`, 40, 47);
            doc.text(`${this.funcion.nombre} - ${this.funcion.fecha_hora.toString().slice(0,21)}`, 40, 80);
            doc.text(`-------------------------------------------`, 40, 87);
            doc.text(`ASIENTO ${this.asiento_id}`, 40, 120);
            doc.save(`boleto_${this.asiento_id}.pdf`);
            let today = new Date()
            let body = {
                id_asiento: this.asiento_id,
                id_funcion: this.funcion.id,
                fecha_hora: today.toISOString().slice(0,10),
                total: this.funcion.precio
            }
            await this.axios.post('/compra/agregar-compra', body)

            this.get_funcion()
            this.dialog = false
        }
    }


}
</script>