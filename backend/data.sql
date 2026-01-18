-- Test data for Cruzhacks

INSERT INTO users (username, password, metadata) VALUES 
('molly', crypt('mollymember', gen_salt('bf')), jsonb_build_object(
    'email', 'molly@books.com',
    'name', 'Molly Member'
  )
),
('anna', crypt('annaadmin', gen_salt('bf')), jsonb_build_object(
    'email', 'anna@books.com',
    'name', 'Anna Admin'
  )
);

-- Insert sample posts
INSERT INTO posts (title, content, event_date, coordinates) VALUES
('Clothing Swap', 'Bring your nicest clothes!', '2025-01-20 10:30:00', '{"x": 524, "y": 1447}'),
('Hackathon Presentations', 'Cruzly is so good', '2025-01-18 09:00:00', '{"x": 2296, "y": 1083}'),
('Spongebob Musical', 'Buy tickets https://events.ucsc.edu/event/spongebob-musical/2025-11-16/', '2025-11-16 19:00:00', '{"x": 948, "y": 1443}');

-- -- Insert sample groups
-- INSERT INTO groups (name, description) VALUES
-- ('Book Club', 'Discuss favorite books'),
-- ('Literature', 'All things literature');
