const { Report, Measurement } = require('../models');

async function list(req, res) {
  try {
    const { project_id } = req.query;
    const where = { user_id: req.user.id };
    if (project_id) where.project_id = project_id;
    const reports = await Report.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar reportes' });
  }
}

async function create(req, res) {
  try {
    const { title, description, project_id, measurement_ids } = req.body;

    // Agrupa las mediciones seleccionadas en el resumen del reporte
    let summary = null;
    if (measurement_ids && measurement_ids.length > 0) {
      const measurements = await Measurement.findAll({
        where: { id: measurement_ids },
        attributes: ['id', 'type', 'value', 'unit', 'name'],
      });
      summary = measurements.map((m) => m.toJSON());
    }

    const report = await Report.create({
      title, description, project_id, user_id: req.user.id, summary,
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reporte' });
  }
}

async function getById(req, res) {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
}

async function remove(req, res) {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Reporte no encontrado' });
    await report.destroy();
    res.json({ message: 'Reporte eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reporte' });
  }
}

module.exports = { list, create, getById, remove };
