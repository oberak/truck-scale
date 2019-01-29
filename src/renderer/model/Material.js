import mongoose from 'mongoose'
const { Schema } = mongoose

const Material = new Schema({
  code: String,
  name: String,
  price: Number,
  desc: String,
})


/**
 * Create material
 */
Material.statics.create = function (form) {
  const material = new this({
    code: form.code,
    name: form.name,
    price: form.price || 0,
    desc: form.desc,
  })
  return material.save()
}

/**
 * Update material
 */
Material.statics.update = function (id, form) {
  const data = {
    $set: {
      code: form.code,
      name: form.name,
      price: form.price || 0,
      desc: form.desc,
    },
  }

  return this.findByIdAndUpdate(id, data).exec()
}

/**
 * Delete material
 */
Material.statics.delete = function (id) {
  return this.findByIdAndRemove(id).exec()
}

/**
 * Select materials
 */
Material.statics.select = function (query = {}) {
  return this.find(query).exec()
}

export default mongoose.model('Materials', Material)
