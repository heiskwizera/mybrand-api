import { Router } from 'express';
import { SkillCRUD } from '../ controllers/SkillController.js';
import { auth } from '../middlewares/jwt_auth.js';
import { admin } from '../middlewares/admin.js';

const router = Router();


// Creating a skill
router.post('/create', [auth, admin], SkillCRUD.addSkill);

// Getting all skills
router.get('/all', SkillCRUD.fetchSkills);

// Getting single skill
router.get('/:id/view', SkillCRUD.fetchSkill);

// Updating skill
router.put('/:id/delete', [auth, admin], SkillCRUD.updateSkill);


// Deleting a skill
router.delete('/:id', [auth, admin], SkillCRUD.deleteSkill);

export const skills = router;