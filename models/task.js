var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: String,
    description: String,
    image: String,
    dueDate: Date,
    cost: Number,
    completedDate: Date,
    completed: Boolean
});
module.exports = mongoose.model('Task', TaskSchema);
