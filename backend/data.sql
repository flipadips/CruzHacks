-- Test data for Cruzhacks

INSERT INTO users (username, password, metadata) VALUES 
('molly', crypt('mollymember', gen_salt('bf')), jsonb_build_object(
    'email', 'molly@books.com',
    'name', 'Molly Member'
  )
),
('CruzHacks', crypt('annaadmin', gen_salt('bf')), jsonb_build_object(
    'email', 'anna@books.com',
    'name', 'Anna Admin'
  )
),
('UCSCTheater', crypt('annaadmin', gen_salt('bf')), jsonb_build_object(
    'email', 'ucsc@books.com',
    'name', 'UCSC'
  )
);

-- Insert sample posts
INSERT INTO posts (user_id, title, content, event_date, coordinates) VALUES
((SELECT id FROM users WHERE username = 'molly'),'Clothing Swap', 'Bring your nicest clothes!', '2025-01-20 10:30:00', '{"x": 524, "y": 1447}'),
((SELECT id FROM users WHERE username = 'CruzHacks'),'Hackathon Presentations', 'Cruzly is so good', '2025-01-18 09:00:00', '{"x": 2296, "y": 1083}'),
((SELECT id FROM users WHERE username = 'UCSCTheater'),'Spongebob Musical', 'Buy tickets https://events.ucsc.edu/event/spongebob-musical/2025-11-16/', '2025-11-16 19:00:00', '{"x": 948, "y": 1443}');
