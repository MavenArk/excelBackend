const mongoose = require('mongoose');

const CashflowSchema = new mongoose.Schema({
    ISIN: String,
    Date: Date,
    Interest: Number,
    Principal: String,
    Total: String,
    DCB: Number,
})

const CashflowModel = mongoose.model('log_reg_form', CashflowSchema);

module.exports = CashflowModel;