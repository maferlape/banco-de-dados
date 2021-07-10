const mongoose = require('mongoose');

const lisTarefasSchema = new mongoose.Schema({
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Task', lisTarefasSchema );