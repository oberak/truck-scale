import mongoose from 'mongoose'
const { Schema } = mongoose

const Client = new Schema({
  name: String,
  phone: String,
  address: String,
})
Client.statics.create = function (form) {
  const client = new this({
    name: form.name,
    phone: form.phone,
    address: form.address,
  })
  return client.save()
}

Client.statics.update = function (id, form) {
  const data = {
    $set: {
      name: form.name,
      phone: form.phone,
      address: form.address,
    },
  }

  return this.findByIdAndUpdate(id, data).exec()
}
Client.statics.delete = function (id) {
  return this.findByIdAndRemove(id).exec()
}

Client.statics.select = function (query = {}) {
  return this.find(query).exec()
}
export default mongoose.model('Clients', Client)
