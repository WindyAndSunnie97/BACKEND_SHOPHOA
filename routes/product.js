
// const { Product } = require('../models/product');
// const express = require('express');
// const { Category } = require('../models/category');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Lấy danh sách sản phẩm dựa trên các bộ lọc
// router.get(`/`, async (req, res) =>{
//     let filter = {};
//     if(req.query.categories) {
//          filter = { category: req.query.categories.split(',') }
//     }

//     const productList = await Product.find(filter).populate('category');

//     if(!productList) {
//         res.status(500).json({ success: false });
//     } 
//     res.send(productList);
// });

// // Lấy danh sách sản phẩm theo danh mục
// router.get('/categories/:category', async (req, res) => {
//     try {
//         const category = req.params.category;
//         const products = await Product.find({ category: category });

//         if (!products || products.length === 0) {
//             return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm cho danh mục này' });
//         }

//         res.status(200).json({ success: true, products: products });
//     } catch (error) {
//         console.error('Lỗi khi lấy danh sách sản phẩm theo danh mục:', error);
//         res.status(500).json({ success: false, message: 'Lỗi máy chủ nội bộ' });
//     }
// });

// // Lấy thông tin chi tiết của một sản phẩm dựa trên ID
// router.get(`/:id`, async (req, res) =>{
//     const product = await Product.findById(req.params.id).populate('category');

//     if(!product) {
//         res.status(500).json({ success: false });
//     } 
//     res.send(product);
// });

// // Thêm mới một sản phẩm
// router.post(`/`, async (req, res) =>{
//     const category = await Category.findById(req.body.category);
//     if(!category) return res.status(400).send('Danh mục không hợp lệ');

//     let product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         image: req.body.image,
//         price: req.body.price,
//         category: req.body.category,
//         numReviews: req.body.numReviews,
//         isFeatured: req.body.isFeatured,
//     });

//     product = await product.save();

//     if(!product) 
//     return res.status(500).send('Không thể tạo sản phẩm');

//     res.send(product);
// });

// // Cập nhật thông tin của một sản phẩm
// router.put('/:id',async (req, res)=> {
//     if(!mongoose.isValidObjectId(req.params.id)) {
     
//         return res.status(400).send('ID Sản phẩm không hợp lệ');
//     }
//     const category = await Category.findById(req.body.category);
//     if(!category) return res.status(400).send('Danh mục không hợp lệ');

//     const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//             name: req.body.name,
//             description: req.body.description,
//             image: req.body.image,
//             price: req.body.price,
//             category: req.body.category,
//             numReviews: req.body.numReviews,
//             isFeatured: req.body.isFeatured,
//         },
//         { new: true }
//     );

//     if(!product)
//     return res.status(500).send('Không thể cập nhật sản phẩm!');

//     res.send(product);
// });

// // Xóa một sản phẩm
// router.delete('/:id', (req, res)=>{
//     Product.findByIdAndRemove(req.params.id).then(product =>{
//         if(product) {
//             return res.status(200).json({ success: true, message: 'Sản phẩm đã được xóa!' });
//         } else {
//             return res.status(404).json({ success: false , message: "Không tìm thấy sản phẩm!" });
//         }
//     }).catch(err=>{
//        return res.status(500).json({ success: false, error: err }); 
//     });
// });

// // Lấy số lượng sản phẩm
// router.get(`/get/count`, async (req, res) =>{
//     const productCount = await Product.countDocuments((count) => count);

//     if(!productCount) {
//         res.status(500).json({ success: false });
//     } 
//     res.send({
//         productCount: productCount
//     });
// });

// // Lấy danh sách sản phẩm nổi bật
// router.get(`/get/featured/:count`, async (req, res) =>{
//     const count = req.params.count ? req.params.count : 0;
//     const products = await Product.find({ isFeatured: true }).limit(+count);

//     if(!products) {
//         res.status(500).json({ success: false });
//     } 
//     res.send(products);
// });

// module.exports = router;
const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
// lấy danh sách all sp
router.get(`/`, async (req, res) =>{
    const productList = await Product.find().lean();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(productList);
})
// lấy sp theo danh mục
router.get(`/:category`, async (req, res) =>{
    let filter = {};
    if(req.query.category)
    {
         filter = {category: req.query.category.split(',')}
    }

    const productList = await Product.find(filter).populate('category').lean();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

// lấy chi tiết sp theo id
router.get(`/:id`, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category').lean();

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.post(`/`, async (req, res) =>{
    const category = Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})

router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const category =  Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

module.exports =router;