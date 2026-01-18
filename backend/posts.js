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
    // TODO: Implement createPost logic
    res.status(201).json({ message: 'Create post' });
  } catch (err) {
    next(err);
  }
};
