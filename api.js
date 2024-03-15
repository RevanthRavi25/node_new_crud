const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');

// Connecting to database
// const query = 'mongodb+srv://Username:<password>'
//     + '@student.tuufn.mongodb.net/College?'
//     + 'retryWrites=true&w=majority'
// const mongoose = require('mongoose');

const uri = "mongodb+srv://revanth:Y89puDZZ55yBFtQb@cluster0.rhrtxsn.mongodb.net/student_detail?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

module.exports = router;
// create (save) data

// router.get('/save', async function (req, res) {
//     try {
//         const newStudent = new StudentModel({
//             StudentId: 101,
//             Name: "Sam",
//             Roll: 1,
//             Birthday: '2001-09-08' // Corrected date format
//         });

//         const savedStudent = await newStudent.save();
//         res.send("Data inserted");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error occurred while saving data");
//     }
// });

// create(save) post method(dynamic)
router.post('/save', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Roll: req.body.Roll,
            Birthday: req.body.Birthday
        });

        const savedStudent = await newStudent.save();
        res.send("Data inserted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while saving data");
    }
});




// find all


router.get('/findall', async function (req, res) {
    try {
        const students = await StudentModel.find();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while fetching data");
    }
});

// delete 

// router.get('/delete', async function (req, res) {
//     try {
//         const result = await StudentModel.deleteOne({ StudentId: 101 });
//         res.send(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error occurred while deleting data");
//     }
// });

router.post('/delete', async function (req, res) {
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(req.body._id);
        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }
        res.send(deletedStudent);
        console.log("Data Deleted!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while deleting data");
    }
});

// update

router.post('/update', async function (req, res) {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.body._id,
            {
                StudentId: req.body.StudentId,
                Name: req.body.Name,
                Roll: req.body.Roll,
                Birthday: req.body.Birthday
            },
            { new: true } // To return the updated document
        );
        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }
        res.send(updatedStudent);
        console.log("Data updated!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while updating data");
    }
});
//test
