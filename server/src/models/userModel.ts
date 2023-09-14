import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        validate: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 20
    },
  },
  {
    timestamps: true,
  }
);

// // Match user entered password to hashed password in database
// userSchema.methods.matchPassword = async function (enteredPassword: string) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Encrypt password using bcrypt
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model('User', userSchema);

export default User;