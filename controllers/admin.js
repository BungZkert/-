import trycatch from "../middlewares/trycatch.js";
import { Courses } from "../models/courses.js";
import { lecture } from "../models/lecture.js";

export const createCourse = trycatch(async(req,res)=>{
    const {title, description,category, createdBy, duration, price} = req.body;

    const image = req.file;

    await Courses.create({
        title, 
        description,
        category, 
        createdBy, 
        image: image?.path,
        duration, 
        price,
    });

    res.status(201).json({
        message: "Course Created Successfully",
    });
});

export const addLectures = trycatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)

    if(!course) 
        return res.status(404)({
        message: "No couse with this id",
    });

    const {title,description} = req.body

    const file =req.file

    const lectures = await lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id,
    });

    res.status(201).json({
        message: "Lecture Added",
        lectures,
    })
});