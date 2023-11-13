<template>
<v-card class="boletimMain" elevation="1" v-if="selection">
    <v-card-text >
    <v-row>
        <v-col cols="12"><h4 class="event"> {{selection.gameName}} </h4></v-col>
    
    </v-row>
        <v-row>
            <v-col cols="16">
                <p class="result">{{selection.name}}</p>
                <p class="odd">Odd Associada: {{selection.odd}}</p>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: ['selection','removeBet','index'],
    created() {
    },
    methods:{
    },
}
</script>

<style>
.result{
    font-weight:900;
    color: #063606; 
}

.odd {
    font-weight:900;
    color: rgb(218, 165, 32); 
}

.event {
    font-size:1vw;
    font-weight: 900;
    color: #1D1E1F;
}

.boletimMain {
    border: solid 1px;
    border-radius: 15px;
    border-color:#063606!important;
    margin:1vh; 
    height:100%;
}

</style>