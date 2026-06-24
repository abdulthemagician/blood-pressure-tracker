import express from 'express';
import * as controller from '../controller/bloodPressure.controller.js';
import { validateBloodPressureInput } from '../middleware/validationInput.middleware.js';
const router = express.Router();

router.get('/', controller.getAllBloodPressure);
router.post('/', validateBloodPressureInput, controller.createBloodPressure);
router.put('/:id', validateBloodPressureInput, controller.updateBloodPressure);
router.delete('/:id', controller.deleteBloodPressure)

export default router;