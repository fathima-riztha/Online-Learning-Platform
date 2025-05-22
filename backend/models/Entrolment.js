const mongoose = require('mongoose');

const enrolmentSchema = new mongoose.Schema({
    course : { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    student : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    entroledAt : { type: Date, default: Date.now },
    status : { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' }
});

module.exports = mongoose.model('Enrolment', enrolmentSchema);