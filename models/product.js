
// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     name: String,
//     price: String,
//     imageUrl: String,
//     idCategogy: String,
//     Description: String,
//     isFavourite:String
    
// })

// exports.Product = mongoose.model('Product',productSchema );


const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
   
    image: {
        type: String
    },
    
    price : {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    
    numReviews: {
        type: Number,
        max:5,
        min:1
    },
    isFeatured: {
        type: Boolean,
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);