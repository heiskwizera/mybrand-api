import skillSchema from '../models/skillSchema.js';

// Add Skill
const addSkill = async (req, res) => {
    try {
        const mySkills = await skillSchema.create({
            skill: req.body.skill,
            percentage: req.body.percentage
        })
        res.status(200).json({
            message: "New Skill is added",
            result: mySkills
        })

    } catch (error) {
        res.status(500).json({
            message: `Error : ${error}`
        })
    }

}

// Getting all skills
const fetchSkills = async (req, res) => {
    try {
        const allSkills = await skillSchema.find({})
        res.status(200).json({
            message: "Retrieved skills",
            skills: allSkills
        })
    } catch (error) {
        res.status(400).json({
            message: `Error : ${error}`
        })

    }
}

// Getting single skill

const fetchSkill = async (req, res) => {
    try {
        const skill = await skillSchema.findById(id)
        res.status(200).json({
            message: "Skill retrieved",
            messages: skill
        })
    } catch (error) {
        res.status(400).json({
            message:`Bad request! Error : ${error}`
        })
    }
}

// Updating single skill

const updateSkill = async (req, res) => {
    try {

        const skillId = req.params.id;
        const changes = await skillSchema.findByIdAndUpdate(skillId, req.body, { new: true });
        res.status(200).json({
            message: "Updated skill",
            skill : changes
        })

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

// Deleting a skill
const deleteSkill = async(req,res)=>{
    try {
        const skillId = req.params.id;
        await skillSchema.findByIdAndRemove(skillId)
        res.status(200).json({
            message:"Deleted a Skill"
        })
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}

export const SkillCRUD = {addSkill,fetchSkill,fetchSkills,updateSkill,deleteSkill};
