import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type:String , unique:true, required:true
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 5 characters long'],
        required:true
    },
    image: String,
    role: {
        type: String,
        default:"user"
    },
    providers: {
        type: String,
        default:"credentials"
    }
}, {
    timestamps:true
})

const User = models.User || model("User", userSchema);
export default User