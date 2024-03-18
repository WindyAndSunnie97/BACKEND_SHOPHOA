// const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema({
//     orderItems: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'OrderItem',
//         required:true
//     }],
//     shippingAddress1: {
//         type: String,
//         required: true,
//     },
//     shippingAddress2: {
//         type: String,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//         default: 'Pending',
//     },
//     totalPrice: {
//         type: Number,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     dateOrdered: {
//         type: Date,
//         default: Date.now,
//     },
//     deliverydate:{
//         type: Date,
//         validate: {
//             validator: function(value) {
//                 // Lấy ngày đặt
//                 const dateOrdered = this.dateOrdered;

//                 // Kiểm tra nếu ngày giao nhỏ hơn hoặc bằng ngày đặt
//                 return value >= dateOrdered;
//             },
//             message: 'Ngày giao phải sau hoặc cùng ngày đặt.'
//         }

//     }
// })

// orderSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// orderSchema.set('toJSON', {
//     virtuals: true,
// });

// exports.Order = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            discount: { type: Number },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order