const { Measurement } = require('../models');

async function list(req, res) {
  try {
    const { project_id } = req.query;
    const where = {};
    if (project_id) where.project_id = project_id;
    const measurements = await Measurement.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(measurements);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar mediciones' });
  }
}

async function create(req, res) {
  try {
    const { type, value, unit, points, name, project_id } = req.body;
    const measurement = await Measurement.create({
      type, value, unit, points, name, project_id, user_id: req.user.id,
    });
    res.status(201).json(measurement);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar medición' });
  }
}

async function getById(req, res) {
  try {
    const m = await Measurement.findByPk(req.params.id);
    if (!m) return res.status(404).json({ error: 'Medición no encontrada' });
    res.json(m);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener medición' });
  }
}

async function remove(req, res) {
  try {
    const m = await Measurement.findByPk(req.params.id);
    if (!m) return res.status(404).json({ error: 'Medición no encontrada' });
    await m.destroy();
    res.json({ message: 'Medición eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar medición' });
  }
}

module.exports = { list, create, getById, remove };
