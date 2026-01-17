// Posts module - exports handler functions

export const getPosts = async (req, res, next) => {
  try {
    // TODO: Implement getPosts logic
    res.json({ message: 'Get posts' });
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
