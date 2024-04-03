const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

function validatePassword(password) {
  return passwordRegex.test(password)
}

const userSchema = new mongoose.Schema(
    {
      username: {type: String, unique: true, required: true},
      password: {type: String, required: true, validate: {
        validator: validatePassword,
        message: props => `${props.value} is not a valid password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.`
      }},
      isAdmin: {type: Boolean, default: false}
    }
)

userSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User