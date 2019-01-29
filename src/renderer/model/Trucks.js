import mongoose from 'mongoose'
const { Schema } = mongoose

const Trucks = new Schema({
  truckLicense: String,
  dname: String,
  cname: String,
  cphone: String,
})

Trucks.statics.create = function (form) {
  const trucks = new this({
    truckLicense: form.truckLicense,
    dname: form.dname,
    cname: form.cname,
    cphone: form.cphone,
  })
  return trucks.save()
}

Trucks.statics.update = function (id, form) {
  const data = {
    $set: {
      truckLicense: form.truckLicense,
      dname: form.dname,
      cname: form.cname,
      cphone: form.cphone,
    },
  }

  return this.findByIdAndUpdate(id, data).exec()
}
Trucks.statics.delete = function (id) {
  return this.findByIdAndRemove(id).exec()
}
Trucks.statics.select = function (query = {}) {
  return this.find(query).exec()
}
export default mongoose.model('Trucks', Trucks)
