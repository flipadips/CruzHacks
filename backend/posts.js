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
        created_at,
        updated_at,
        coordinates
      FROM posts
      ORDER BY created_at DESC;
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

    const { user_id, title, content, coordinates } = req.body;

    const sql = `
      INSERT INTO posts (user_id, title, content, coordinates)
      VALUES ($1, $2, $3, $4::jsonb)
      RETURNING
        id, user_id, title, content, coordinates, created_at, updated_at;
    `;

    const values = [
      user_id,
      title,
      content,
      coordinates === undefined ? null : JSON.stringify(coordinates),
    ];

    const { rows } = await pool.query(sql, values);
    return res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

