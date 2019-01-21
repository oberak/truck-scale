import mongoose from 'mongoose'
const { Schema } = mongoose

const Client = new Schema({
  name: String,
  work: String,
})
Client.statics.create = function (form) {
  const client = new this({
    name: form.name,
    work: form.work,
  })
  return client.save()
}
Client.statics.select = function (query = {}) {
  return this.find(query).exec()
}
export default mongoose.model('Clients', Client)
