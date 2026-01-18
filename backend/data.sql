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
INSERT INTO posts (user_id, title, content, event_date, coordinates) VALUES
(1, 'First Post', 'This is Molly''s first post', '2025-01-20 10:30:00', '{"x": 806, "y": 484}'),
(2, 'Admin Post', 'Anna''s welcome post', '2025-01-19 14:15:00', '{"x": 400, "y": 300}'),
(1, 'Second Post', 'Another post from Molly', '2025-01-22 16:45:00', '{"x": 1200, "y": 600}');

-- Insert sample groups
INSERT INTO groups (name, description) VALUES
('Book Club', 'Discuss favorite books'),
('Literature', 'All things literature');
