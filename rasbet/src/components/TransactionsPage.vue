<template>
  <v-card class="centerCard-settings" elevation="5">
    <v-card-text>
      <div
        class="fontUser"
        style="
          text-align: center;
          padding-bottom: 30px;
          padding-top: 15px;
          font-size: 30px;
          font-weight: 500;
        "
      >
        Histórico de Apostas
      </div>
      <div style="padding-left: 15px; padding-right: 15px">
        <hr style="height: 1px; background-color: #e0e0e0; border: none" />
    
    <v-data-table
    dense
    :headers="headers"
    :items="apostas"
    item-key="name"
    class="elevation-1 table-custom"
    > 
  </v-data-table>
 

        <div>
          
          <div style="padding-top: 40px;  padding-bottom: 10px; text-align: center">
            <v-btn class="btn-save-settings"  >Guardar Alterações</v-btn>
          </div>
          
        </div>
      </div>
      
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Transactions",
  data: () => ({
    userName: "Carlos",
    userSurname: "Pereira",
    password: "1234",
    userSaldo: "10.0",
    visible: false,
    selected: null,
    apostas: [
        {
            data: "10/10/2020",
            description: "Aposta de Natal",
            saldo: "10Paus",
            saldoAposOp: "10€",
        },
        {
            data: "10/10/2021",
            description: "Aposta de Natal",
            saldo: "-100Paus",
            saldoAposOp: "0€",
        },
        {
            data: "10/10/2021",
            description: "Aposta no Benfas",
            saldo: "-100000Paus",
            saldoAposOp: "0€",
        }

    ],
    headers: [
        {
            text: 'Operação',
            align: 'start',
            sortable: true,
            value: 'data',
        },
        { text: 'Descrição', value: 'description' },
        { text: 'Saldo', value: 'saldo' },
        { text: 'Saldo após operação', value: 'saldoAposOp' },
    ],
  }),
  methods: {
    goto: function (choice) {
      this.selected = choice;
    },
  },
};





</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,500;1,300&display=swap");



.centerCard-settings {
  justify-content: center;
  margin: 25vh 20vw 20vh 20vw;
  padding-bottom: 5vh;
}

.table-custom {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: #4a4a4a;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    margin-bottom: 30px;
}
.btn-settings {
  background-color: #fe6f2f !important;
  color: white !important;
}
.selectedbtn-settings {
  background-color: white !important;
  color: #fe6f2f !important;
  border: 1px solid #fe6f2f !important;
}

.btn-save-settings {
  background-color: #063606 !important;
  color: white !important;
}
.btn-save-settings:focus{
  background-color: white !important;
  color: #063606 !important;
  border: 1px solid #063606 !important;
}

.fontUser {
  font-family: "Montserrat", sans-serif;
  color: #063606;
}
</style>
