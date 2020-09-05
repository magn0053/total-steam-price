const mongoose = require('mongoose');

// Model for adding/updating games
const gameModel = mongoose.Schema({
    name: { type: String, required: '{PATH} is required!' },
    vendor_id: { type: Number, required: '{PATH} is required!' },
    pricing: {
        free: { type: Boolean, default: false, index: true },
        eur: {
            initial: { type: Number, required: '{PATH} is required!' },
            discounted: { type: Number, default: 0 }
        },
        usd: {
            inital: { type: Number, default: 0 },
            discounted: { type: Number, default: 0 }
        }
    },
    type: String,
    early_access: { type: Boolean, default: true },
    exists: { type: Boolean, default: false },
    released: { type: Boolean, default: true },
    platform: {
        windows: Boolean,
        mac: Boolean,
        linux: Boolean
    },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameModel);