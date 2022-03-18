import skillSchema from '../models/skillSchema.js';

// Add Skill
const addSkill = async (req, res) => {
    try {
        const mySkills = await skillSchema.create({
            skill: req.body.skill,
            percentage: req.body.percentage
        })
        res.status(201).json({
            response: "New Skill is added",
            result: mySkills
        })

    } catch (error) {
        res.status(500).json({
            response: `Error : ${error}`
        })
    }

}

// Getting all skills
const fetchSkills = async (req, res) => {
    try {
        const allSkills = await skillSchema.find({})
        res.status(201).json({
            response: "Retrieved skills",
            skills: allSkills
        })
    } catch (error) {
        res.status(400).json({
            response: `Error : ${error}`
        })

    }
}

// Getting single skill

const fetchSkill = async (req, res) => {
    try {
        const skill = await skillSchema.findById(req.params.id)
        res.status(201).json({
            response: "Skill retrieved",
            messages: skill
        })
    } catch (error) {
        res.status(400).json({
            response: `Bad request! Error : ${error}`
        })
    }
}

// Updating single skill

const updateSkill = async (req, res) => {
    try {

        const skillId = req.params.id;
        const changes = await skillSchema.findByIdAndUpdate(skillId, req.body, { new: true });
        res.status(201).json({
            response: "Updated skill",
            skill: changes
        })

    } catch (error) {
        res.status(400).json({
            response: error
        })
    }
}

// Deleting a skill
const deleteSkill = async (req, res) => {
    try {
        const skillId = req.params.id;
        await skillSchema.findByIdAndRemove(skillId)
        res.status(201).json({
            response: "Deleted a Skill"
        })
    } catch (error) {
        res.status(400).json({
            response: error
        })
    }
}

export const SkillCRUD = { addSkill, fetchSkill, fetchSkills, updateSkill, deleteSkill };
