const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    }
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project