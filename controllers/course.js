import trycatch from "../middlewares/trycatch.js";
import { Courses } from '../models/courses.js';
import { lecture } from "../models/lecture.js";
import {User} from "../models/user.js";

export const getAllCourses = trycatch(async (req, res) => {
    const courses = await Courses.find(); 
    res.json({ courses });
});

export const getSingleCourse = trycatch(async (req, res) => {
    const course = await Courses.findById(req.params.id); 
    res.json({ course });
});

export const fetchLectures =  trycatch(async(req,res)=>{
    const lectures = await lecture.find({course: req.params.id});

    const user = await User.findById(req.user._id);

    if(user.role==="admin") {
        return res.json({ lectures}); 
    }

    if(!user.subcription.includes(req.params._id)) return res.status(400).json({
        message: "You have no subscribed to this course",
    });

    res.json({lecture})
})