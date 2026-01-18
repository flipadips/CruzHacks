// Posts module - exports handler functions

export const getPosts = async (req, res, next) => {
  try {
    const pool = req.app.locals.pool;

    const sql = `
      SELECT
        p.id,
        u.username,
        p.title,
        p.content,
        p.event_date,
        p.coordinates
      FROM posts AS p
      JOIN users AS u ON p.user_id = u.id
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
    const { title, content, coordinates } = req.body;
    const user_id = req.user.id;

    // Insert the post
    const insertSql = `
      INSERT INTO posts (user_id, title, content, event_date, coordinates)
      VALUES ($1, $2, $3, NOW(), $4::jsonb)
      RETURNING id, user_id, title, content, event_date, coordinates;
    `;

    const values = [
      user_id,
      title,
      content,
      coordinates === undefined ? null : JSON.stringify(coordinates),
    ];

    const { rows } = await pool.query(insertSql, values);
    const post = rows[0];

    // Fetch with username
    const selectSql = `
      SELECT
        p.id,
        u.username,
        p.title,
        p.content,
        p.event_date,
        p.coordinates
      FROM posts AS p
      JOIN users AS u ON p.user_id = u.id
      WHERE p.id = $1
    `;

    const result = await pool.query(selectSql, [post.id]);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};