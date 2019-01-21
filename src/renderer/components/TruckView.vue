<template>
  <v-layout column justify-center>
     <v-card-title>
      <h1>Truck Management</h1>
      <v-spacer></v-spacer>
      
    </v-card-title>
    <v-flex>
    <div id="truck">
    <v-btn color="#0d2956" id="addTruck" @click="dialog = true">Add New Car</v-btn>
    <v-btn color="#0d2956" id="deleteTruck">Delete Car</v-btn>
    <v-btn color="#0d2956" id="editTruck">Edit Car</v-btn>

    </div>
      <v-data-table
    :headers="headers"
    :items="desserts"
    :loading="true"
    class="elevation-1"
  >
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
    </v-flex>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Truck Management</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        headers: [
          {
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Register Number', value: 'calories' },
          { text: 'Driver', value: 'fat' },
          { text: 'ID', value: 'carbs' },
          { text: 'Name', value: 'protein' },
          { text: 'Address', value: 'iron' },
        ],
        desserts: [
        ],
      }
    },
  }
</script>
<style scoped>
 h1{
   text-align: center;
   color:#b70900;
   font-size: 50px;
   font-family: 'Times New Roman', Times, serif;
 }
#truck #addTruck{
  width: 150px;
  height: 50px;
}
#truck #deleteTruck{
  width: 150px;
  height: 50px;
}
#truck #editTruck{
  width: 150px;
  height: 50px;
}
</style>