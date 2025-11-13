import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ej_express"
});

db.connect(err => {
  if (err) {
    console.error(" Error de conexión con MySQL:", err);
  } else {
    console.log(" Conectado a MySQL ");
  }
});


// ------------------ RUTAS ------------------


app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.post("/servicios", (req, res) => {
  const { descripcion, fecha, cliente_id } = req.body;
  const sql = "INSERT INTO servicios (descripcion, fecha, cliente_id) VALUES (?, ?, ?)";
  db.query(sql, [descripcion, fecha, cliente_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, descripcion, fecha, cliente_id });
  });
});


app.get("/servicios", (req, res) => {
  const sql = `
    SELECT s.id, s.descripcion, s.fecha, s.estado, u.nombre AS cliente
    FROM servicios s
    JOIN usuarios u ON s.cliente_id = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.post("/asignaciones", (req, res) => {
  const { servicio_id, tecnico_id, fecha_asignacion } = req.body;
  const sql = "INSERT INTO asignaciones (servicio_id, tecnico_id, fecha_asignacion) VALUES (?, ?, ?)";
  db.query(sql, [servicio_id, tecnico_id, fecha_asignacion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, servicio_id, tecnico_id, fecha_asignacion });
  });
});


app.get("/asignaciones", (req, res) => {
  const sql = `
    SELECT a.id, s.descripcion AS servicio, 
           t.nombre AS tecnico, c.nombre AS cliente, 
           a.fecha_asignacion
    FROM asignaciones a
    JOIN servicios s ON a.servicio_id = s.id
    JOIN usuarios t ON a.tecnico_id = t.id
    JOIN usuarios c ON s.cliente_id = c.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.put("/servicios/:id", (req, res) => {
  const { id } = req.params;
  const { descripcion, fecha, estado } = req.body;

  const sql = "UPDATE servicios SET descripcion=?, fecha=?, estado=? WHERE id=?";
  db.query(sql, [descripcion, fecha, estado, id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Servicio actualizado correctamente" });
  });
});


app.delete("/servicios/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM servicios WHERE id=?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Servicio eliminado correctamente" });
  });
});


app.put("/asignaciones/:id", (req, res) => {
  const { id } = req.params;
  const { servicio_id, tecnico_id, fecha_asignacion } = req.body;
  const sql =
    "UPDATE asignaciones SET servicio_id=?, tecnico_id=?, fecha_asignacion=? WHERE id=?";
  db.query(sql, [servicio_id, tecnico_id, fecha_asignacion, id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Asignación actualizada correctamente" });
  });
});


app.delete("/asignaciones/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM asignaciones WHERE id=?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Asignación eliminada correctamente" });
  });
});


// Buscar un usuario por ID o nombre
app.get("/usuarios/buscar", (req, res) => {
  const { id, nombre } = req.query;

  let sql = "SELECT * FROM usuarios";
  let params = [];

  if (id) {
    sql += " WHERE id = ?";
    params.push(id);
  } else if (nombre) {
    sql += " WHERE nombre LIKE ?";
    params.push(`%${nombre}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result);
  });
});


// -------------------------------------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


