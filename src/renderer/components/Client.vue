<template>
  <v-card>
    <v-card-title>
      <h1>Customer</h1>
      <v-spacer></v-spacer>
      <v-btn slot="activator" color="primary" dark @click="dialog = true">ADD</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="customers"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.work }}</td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-toolbar color="#26c6da" dark>
        <v-toolbar-title>ADD CUSTOMER</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card color="blue-grey darken-2" dark>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                   label="Customer Name *"
                   v-model="form.name"
                   :counter="4"
                   :rules="codeRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                  label="Customer Work *"
                  v-model="form.work"
                  :rules="[v => !!v || 'Customer work is required']"
                  required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>* : indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="add()">Save</v-btn>
        </v-card-actions>
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
</template>
<script>
import Client from '../model/Client'
export default {
  data: () => ({
    dialog: false,
    valid: false,
    total: 0,
    loading: false,
    snackbar: {
      act: false,
      text: '',
      color: 'success',
      timeOut: 3000,
    },
    pagination: {
      rowsPerPage: 5,
    },
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Work', value: 'work' },
    ],
    customers: [],
    form: {
      name: '',
      work: '',
    },
    codeRules: [
      v => !!v || 'This value is required',
      v => (v && v.length <= 4) || 'This value must be less than 4 characters',
    ],
  }),
  mounted() {
    this.select()
  },
  methods: {
    select() {
      this.loading = true
      const p = Client.select({})
      p.then((doc) => {
        console.log('clients:', doc)
        this.customers = doc
        this.loading = false
      })
    },
    msg(msg, color, tm = 3000) {
      this.snackbar.act = true
      this.snackbar.text = msg
      this.snackbar.color = color
      this.snackbar.timeOut = tm
    },
    add() {
      if (!this.$refs.form.validate()) return this.msg('Unvalid value', 'error', 1000)
      Client.create(this.form).then(() => {
        this.dialog = false
        this.$refs.form.reset()
        this.select()
        return this.msg('Data saved...', 'success')
      }).catch(err => this.msg(err.message, 'error', 5000))
      return false
    },
  },
}
</script>