import { Router } from 'express';
import { SkillCRUD } from '../ controllers/SkillController.js';
import { jwtauth } from '../middlewares/jwt_auth.js';
const router = Router();


// Creating a skill
router.post('/', jwtauth,SkillCRUD.addSkill);

// Getting all skills
router.get('/', jwtauth,SkillCRUD.fetchSkills);

// Getting single skill
router.get('/:id', jwtauth,SkillCRUD.fetchSkill);

// Updating skill
router.put('/:id',jwtauth,SkillCRUD.updateSkill);


// Deleting a skill
router.delete('/:id', jwtauth,SkillCRUD.deleteSkill);

export const skills = router;