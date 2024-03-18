const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    accountname: {
        type: String,
        required: true,
    },



});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});
//đk email
// userSchema.virtual('emailExists').get(async function () {
//     try {
//         const existingUser = await User.findOne({ email: this.email });
//         return !!existingUser; // Trả về true nếu email đã tồn tại, ngược lại trả về false
//     } catch (error) {
//         console.error('Error checking email existence:', error);
//         return false;
//     }
// });
userSchema.statics.emailExists = async function(email) {
    try {
        const existingUser = await this.findOne({ email });
        return !!existingUser; // Trả về true nếu email đã tồn tại, ngược lại trả về false
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
};

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;