<template>
  <v-layout row justify-center>
   <v-card>
    <v-card-title>
      <h1>Trucks</h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search by Truck License"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn slot="activator" color="primary"  @click="dialog = true">ADD</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="trucks"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.truckLicense }}</td>
        <td class="text-xs-left">{{ props.item.dname }}</td>
        <td class="text-xs-left">{{ props.item.cname }}</td>
        <td class="text-xs-left">{{ props.item.cphone }}</td>
        <td class="text-xs-left">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-toolbar color="#26c6da" dark>
        <v-toolbar-title>{{ popupTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card color="blue-grey darken-2" dark>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <input type="hidden" v-model="form.id">
            <v-container grid-list-md>
              <v-layout wrap>
               <v-flex xs12>
                  <v-text-field
                    label="Truck License *"
                    v-model="form.truckLicense"
                    :counter="10"
                    :rules="codeRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Driver Name *"
                    v-model="form.dname"
                    :rules="[v => !!v || 'Driver name is required']"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
         
       
        <v-divider v-model="divider"></v-divider>
        <v-card-title>
      <h1>Clients</h1>
      <v-spacer></v-spacer>
      <v-btn  color="primary"  @click="selectCLient()">Select Clients</v-btn>
       </v-card-title>
        <v-card-title>
          <h3>Client Name: </h3><label>{{form.cname}}</label>
        </v-card-title>
        <v-card-title>
          <h3>Client Phone: </h3> <label>{{form.cphone}}</label>
        </v-card-title>
        </v-form>
            <small>* : indicates required field</small>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="add()">Save</v-btn>
        </v-card-actions>
         </v-card-text>
      </v-card>
    </v-dialog><!-- add/modify dialog -->

    <v-dialog v-model="dialog1" persistent max-width="600px">
    <v-card>
    <v-card-title>
      <h1>Clients</h1>
      <v-spacer></v-spacer>
       <v-text-field
        v-model="search"
        append-icon="search"
        label="Search by Name"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="cliClose()">Close</v-btn>
    </v-card-title>
    <v-data-table
      :headers="cliheaders"
      :items="customers"
      :pagination.sync="pagination"
      :total-items="total"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
         <td class="text-xs-left">
          <v-icon
            small
            class="mr-2"
            @click="selectC(props.item)"
          >
            done_outline
          </v-icon>
        </td>
      </template>
    </v-data-table>
    </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="snackbar.timeOut"
      v-model="snackbar.act"
      :color="snackbar.color"
      :right="true"
    >
      {{ snackbar.text }}
      <v-spacer></v-spacer>
      <v-btn flat color="white" @click.native="snackbar.act = false">Close</v-btn>
    </v-snackbar>
    </v-card>
  </v-layout>
</template>

<script>
// import '../models/db'
import Trucks from '../model/Trucks'
import Client from '../model/Client'
export default {
  data: () => ({
    /* List */
    dialog1: false,
    divider: true,
    search: '',
    total: 0,
    loading: false,
    pagination: {
      rowsPerPage: 5,
    },
    headers: [
      { text: 'Truck License', value: 'truckLicense' },
      { text: 'Driver Name', value: 'dname' },
      { text: 'Clients Name', value: 'cname' },
      { text: 'Clients Phone', value: 'cphone' },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    cliheaders: [
      { text: 'Name', value: 'name' },
      { text: 'Phone', value: 'phone' },
      { text: 'Action', value: 'action' },
    ],
    trucks: [],
    customers: [],
    /* popup */
    popupTitle: 'ADD Trucks',
    dialog: false,
    valid: false,
    form: {
      truckLicense: '',
      dname: '',
      cname: '',
      cphone: '',
    },
    snackbar: {
      act: false,
      text: '',
      color: 'success',
      timeOut: 3000,
    },
    codeRules: [
      v => !!v || 'This value is required',
      v => (v && v.length <= 10) || 'This value must be less than 4 characters',
    ],
    editIdx: -1,
  }),
  mounted() {
    this.select()
    this.selectCLi()
  },
  watch: {
    editIdx: function (idx) {
      this.popupTitle = (idx === -1) ? 'ADD Trucks' : 'MODIFY Trucks'
    },
  },
  methods: {
    selectCLi() {
      const p = Client.select({})
      p.then((doc) => {
        console.log('clients:', doc)
        this.customers = doc
        this.loading = false
      })
    },
    selectCLient() {
      this.dialog = false
      this.dialog1 = true
      this.selectCLi()
    },
    select() {
      this.loading = true
      const p = Trucks.select({})
      p.then((doc) => {
        this.trucks = doc
        this.loading = false
      })
    },
    msg(msg, color, tm = 3000) {
      this.snackbar.act = true
      this.snackbar.text = msg
      this.snackbar.color = color
      this.snackbar.timeOut = tm
    },
    close() {
      this.$refs.form.reset()
      this.editIdx = -1
      this.dialog = false
      this.form.cname = ''
      this.form.cphone = ''
      this.select()
    },
    add() {
      if (!this.$refs.form.validate()) return this.msg('Unvalid value', 'error', 1000)
      if (this.$refs.form.cname === '') return this.msg('Unvalid value', 'error', 1000)
      if (this.editIdx === -1) { // ADD
        Trucks.findOne({ truckLicense: this.form.truckLicense }).then((doc) => {
          if (doc) {
            return this.msg(`Truck License - [${this.form.truckLicense}] already exists.`, 'error', 5000)
          }
          Trucks.create(this.form).then(() => {
            this.dialog = false
            this.close()
            this.select()
            return this.msg('Data saved...', 'success')
          }).catch(err => this.msg(err.message, 'error', 5000))
          return false
        })
      } else { // MODIFY
        Trucks.update(this.form.id, this.form).then(() => {
          this.dialog = false
          this.close()
          this.select()
          return this.msg('Data updated...', 'success')
        }).catch(err => this.msg(err.message, 'error', 5000))
      }
      return false
    },
    editItem(item) {
      this.editIdx = this.trucks.indexOf(item)
      this.form = item
      this.dialog = true
    },
    selectC(item) {
      this.form.cname = item.name
      this.form.cphone = item.phone
      this.dialog = true
      this.dialog1 = false
    },
    cliClose() {
      this.dialog1 = false
      this.dialog = true
    },
    async deleteItem(item) {
      try {
        await this.$confirm({
          message: 'Do you really delete this item?',
          title: 'Confirmation',
          okButton: 'Confirm',
          cancelButton: 'Cancel',
        })
        Trucks.delete(item.id).then(() => {
          this.close()
          this.select()
          return this.msg('Data deleted...', 'success')
        })
      } catch (err) {
        return this.msg('Canceled...', 'success')
      }
      return true
    },
  },
}
</script>
<style scoped>
label{
  padding-left: 10px;
  margin-top: 2px;
}
</style>
