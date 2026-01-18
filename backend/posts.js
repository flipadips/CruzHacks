// Posts module - exports handler functions

export const getPosts = async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;

    const sql = `
      SELECT
        id,
        user_id,
        title,
        content,
        event_date,
        coordinates
      FROM posts
      ORDER BY event_date DESC;
    `;

    const { rows } = await pool.query(sql);
    return res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};


export const createPost = async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;
    const { title, content, event_date, coordinates } = req.body;
    const user_id = req.user.id;

    const sql = `
      INSERT INTO posts (user_id, title, content, event_date, coordinates)
      VALUES ($1, $2, $3, $4, $5::jsonb)
      RETURNING
        id, user_id, title, content, event_date, coordinates;
    `;

    const values = [
      user_id,
      title,
      content,
      event_date || new Date(),
      coordinates === undefined ? null : JSON.stringify(coordinates),
    ];

    const { rows } = await pool.query(sql, values);
    return res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

