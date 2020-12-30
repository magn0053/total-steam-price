const mongoose = require("mongoose")
    , Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/total-steam-price', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

const applicationSchema = new Schema({
    vendor_id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    type: String,
    price: Object, // Copy original pricing setup
    free: { type: Boolean, default: false, index: true },
    developers: Array,
    publishers: Array,
    release: {
        released: Boolean,
        release_date: Date,
        early_access: Boolean
    },
    packages: Array,
    dlcs: Array,
    got_achivements: Boolean,
    required_age: Number,
    tags: Array,
    recommendations: Number,
    languages: [],
    platforms: {
        windows: Boolean,
        Linux: Boolean,
        Mac: Boolean
    },
    success: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ApplicationModel = mongoose.model('Application', applicationSchema);

this.ApplicationModel = ApplicationModel;