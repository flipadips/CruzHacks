-- Test data for Cruzhacks

INSERT INTO users (username, password, metadata) VALUES 
(
  'molly',
  crypt('mollymember', gen_salt('bf')),
  jsonb_build_object(
    'email', 'molly@books.com',
    'name', 'Molly Member'
  )
),
(
  'anna',
  crypt('annaadmin', gen_salt('bf')),
  jsonb_build_object(
    'email', 'anna@books.com',
    'name', 'Anna Admin'
  )
);

-- Insert sample posts
INSERT INTO posts (user_id, title, content) VALUES
(1, 'First Post', 'This is Molly''s first post'),
(2, 'Admin Post', 'Anna''s welcome post'),
(1, 'Second Post', 'Another post from Molly');

-- Insert sample groups
INSERT INTO groups (name, description) VALUES
('Book Club', 'Discuss favorite books'),
('Literature', 'All things literature');
