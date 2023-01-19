import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        productId: String,
        quantity: Number,
        type: Object,
        unitPrice: Number,
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;
