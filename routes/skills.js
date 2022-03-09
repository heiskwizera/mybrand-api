import { Router } from 'express';
import { SkillCRUD } from '../ controllers/SkillController.js';
const router = Router();


// Creating a skill
router.post('/', SkillCRUD.addSkill);

// Getting all skills
router.get('/', SkillCRUD.fetchSkills);

// Getting single skill
router.get('/:id', SkillCRUD.fetchSkill);

// Updating skill
router.put('/:id',SkillCRUD.updateSkill);


// Deleting a skill
router.delete('/:id', SkillCRUD.deleteSkill);

export const skills = router;