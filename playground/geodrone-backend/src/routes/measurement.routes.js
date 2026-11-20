const express = require('express');
const { list, create, getById, remove } = require('../controllers/measurement.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Measurements
 *   description: Mediciones de área, distancia, perímetro y altura
 */

/**
 * @swagger
 * /api/measurements:
 *   get:
 *     summary: Listar mediciones de un proyecto
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de mediciones
 *   post:
 *     summary: Guardar una nueva medición
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, value, unit, points, project_id]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [area, distance, perimeter, height]
 *               value:
 *                 type: number
 *               unit:
 *                 type: string
 *                 example: m2
 *               points:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     lat: { type: number }
 *                     lng: { type: number }
 *                     alt: { type: number }
 *               name:
 *                 type: string
 *               project_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medición guardada
 */
router.get('/', list);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', remove);

module.exports = router;
