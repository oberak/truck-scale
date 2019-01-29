<template>
  <v-layout row justify-center>
   <v-card>
    <v-card-title>
      <h1>Materials</h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search by Code"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn slot="activator" color="primary" dark @click="dialog = true">ADD</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.code }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-left">{{ props.item.desc }}</td>
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
                    label="Material code *"
                    v-model="form.code"
                    :counter="4"
                    :rules="codeRules"
                    ref="code"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Material name *"
                    v-model="form.name"
                    :rules="[v => !!v || 'Material name is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Price" type="number" min="0" v-model="form.price"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Description" v-model="form.desc"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small>* : indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close()">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="add()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog><!-- add/modify dialog -->
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
import Material from '../model/Material'
export default {
  data: () => ({
    /* List */
    search: '',
    total: 0,
    loading: false,
    pagination: {
      rowsPerPage: 5,
    },
    headers: [
      { text: 'Code', value: 'code' },
      { text: 'Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Description', value: 'desc' },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    items: [],
    /* popup */
    popupTitle: 'ADD MATERIAL',
    dialog: false,
    valid: false,
    form: {
      code: '',
      name: '',
      price: 0,
      dc: {
        unit: '',
        value: 0,
      },
    },
    units: [
      { value: '', text: 'Select', icon: 'home' },
      { value: 'Kg', text: 'Kg', icon: 'home' },
      { value: '%', text: '%', icon: 'store' },
    ],
    snackbar: {
      act: false,
      text: '',
      color: 'success',
      timeOut: 3000,
    },
    codeRules: [
      v => !!v || 'This value is required',
      v => (v && v.length <= 4) || 'This value must be less than 4 characters',
    ],
    editIdx: -1,
  }),
  mounted() {
    this.select()
  },
  watch: {
    editIdx: function (idx) {
      this.popupTitle = (idx === -1) ? 'ADD MATERIAL' : 'MODIFY MATERIAL'
    },
  },
  methods: {
    select() {
      this.loading = true
      const p = Material.select({})
      p.then((doc) => {
        this.items = doc
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
      this.select()
    },
    add() {
      if (!this.$refs.form.validate()) return this.msg('Unvalid value', 'error', 1000)
      if (this.editIdx === -1) { // ADD
        Material.findOne({ code: this.form.code }).then((doc) => {
          if (doc) {
            this.$refs.code.focus()
            return this.msg(`Material code - [${this.form.code}] already exists.`, 'error', 5000)
          }
          Material.create(this.form).then(() => {
            this.dialog = false
            this.close()
            this.select()
            return this.msg('Data saved...', 'success')
          }).catch(err => this.msg(err.message, 'error', 5000))
          return false
        })
      } else { // MODIFY
        Material.update(this.form.id, this.form).then(() => {
          this.dialog = false
          this.close()
          this.select()
          return this.msg('Data updated...', 'success')
        }).catch(err => this.msg(err.message, 'error', 5000))
      }
      return false
    },
    editItem(item) {
      this.editIdx = this.items.indexOf(item)
      this.form = item
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
        Material.delete(item.id).then(() => {
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