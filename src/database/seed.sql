-- Status table
INSERT INTO todo.statuses (`uuid`, name, color) VALUES (uuid(), 'IN_PROGRESS', '#007bff');
INSERT INTO todo.statuses (`uuid`, name, color) VALUES (uuid(), 'DONE', '#28a745');
INSERT INTO todo.statuses (`uuid`, name, color) VALUES (uuid(), 'ARCHIVED', '#6c757d');