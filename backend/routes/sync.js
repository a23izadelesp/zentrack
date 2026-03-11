const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Aplica el middleware a todas las rutas de este router
router.use(authenticateToken);

// Bajar datos de la nube
router.get('/pull', (req, res) => {
  try {
    const data = db.prepare('SELECT moods, chat, last_sync FROM sync_data WHERE user_id = ?').get(req.user.id);
    if (!data) return res.status(404).json({ error: 'No hay datos sincronizados' });
    
    res.json({
      moods: JSON.parse(data.moods || '[]'),
      chat: JSON.parse(data.chat || '[]'),
      last_sync: data.last_sync
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar datos' });
  }
});

// Subir datos a la nube
router.post('/push', express.json({limit: '50mb'}), (req, res) => {
  const { moods, chat } = req.body;
  
  if (!Array.isArray(moods) || !Array.isArray(chat)) {
    return res.status(400).json({ error: 'Formato de datos inválido' });
  }

  try {
    const stmt = db.prepare(`
      UPDATE sync_data 
      SET moods = ?, chat = ?, last_sync = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `);
    stmt.run(JSON.stringify(moods), JSON.stringify(chat), req.user.id);
    
    res.json({ message: 'Datos sincronizados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al persistir datos' });
  }
});

module.exports = router;
