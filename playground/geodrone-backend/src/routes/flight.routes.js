const express = require('express');
const { body } = require('express-validator');
const { list, create, getById, update, remove } = require('../controllers/flight.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Gestión de vuelos de dron
 */

/**
 * @swagger
 * /api/flights:
 *   get:
 *     summary: Listar vuelos (filtrar por project_id)
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de vuelos
 *   post:
 *     summary: Crear un nuevo vuelo
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, date, project_id]
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               altitude_m:
 *                 type: number
 *               overlap_percent:
 *                 type: number
 *               notes:
 *                 type: string
 *               project_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vuelo creado
 */
router.get('/', list);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('El nombre del vuelo es requerido'),
    body('date').isDate().withMessage('Fecha inválida'),
    body('project_id').notEmpty().withMessage('El ID del proyecto es requerido'),
  ],
  validate,
  create
);

/**
 * @swagger
 * /api/flights/{id}:
 *   get:
 *     summary: Obtener un vuelo con imágenes y modelo 3D
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del vuelo
 *       404:
 *         description: Vuelo no encontrado
 *   put:
 *     summary: Editar un vuelo
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vuelo actualizado
 *   delete:
 *     summary: Eliminar un vuelo
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vuelo eliminado
 */
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
