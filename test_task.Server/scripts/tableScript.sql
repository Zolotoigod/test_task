CREATE TABLE "Employees" (
    "EmployeeId" uuid NOT NULL,
    "FirstName" varchar(255) NOT NULL,
    "LastName" varchar(255) NOT NULL,
    "Age" integer,
    "Sex" varchar(1) NOT NULL,
    "Active" boolean,
	CHECK ("Age">=18 AND "Age"<=100),
	CHECK ("Sex"='M' or "Sex"='F'),
	PRIMARY KEY("EmployeeId")
);

INSERT INTO "Employees" ("EmployeeId", "FirstName", "LastName", "Age", "Sex", "Active")
VALUES
    ('a1b2c3d4-e5f6-7890-1234-56789abcdef0', 'John', 'Doe', 30, 'M', true),
    ('b2c3d4e5-f6a7-8901-2345-6789abcdef12', 'Jane', 'Smith', 28, 'F', true),
    ('c3d4e5f6-a7b8-9012-3456-789abcdef123', 'Mike', 'Johnson', 45, 'M', true),
    ('d4e5f6a7-b8c9-0123-4567-89abcdef1234', 'Emily', 'Davis', 35, 'F', true),
    ('e5f6a7b8-c9d0-1234-5678-9abcdef12345', 'Chris', 'Brown', 50, 'M', true),
    ('ac7389fe-f6a7-40dc-a0d5-fc7469375338', 'Olivia', 'Martinez', 29, 'F', true),
    ('a29e7c30-88a4-4828-b1fc-cfc14100c75b', 'Liam', 'Garcia', 33, 'M', true),
    ('78f855db-0af8-4efe-a906-7f0e2688c16b', 'Sophia', 'Lee', 26, 'F', true),
    ('8d51b19f-22ae-4c3b-af9c-53e4f52094f3', 'Noah', 'Walker', 41, 'M', true),
    ('8ca3cd86-fb62-498e-89fe-501b01fefc9e', 'Isabella', 'White', 24, 'F', true),
    ('740d14a6-4fba-4bfd-acbe-2c0a496d70e7', 'James', 'Harris', 38, 'M', true),
    ('e2f17b8b-f6bd-488e-985d-9b1a275b64a7', 'Mia', 'Clark', 27, 'F', true),
    ('1c803a14-3bcc-43ea-b045-27da6804c1f0', 'Benjamin', 'Lewis', 36, 'M', true),
    ('2862fd02-51b3-4ac7-bf4a-55fb50b47472', 'Charlotte', 'Young', 31, 'F', true),
    ('de86a22d-7df7-4c24-8563-1b4ce5f18ef3', 'Elijah', 'Hall', 34, 'M', true),
    ('84c6dd14-8637-49eb-ab64-182fcf955db0', 'Amelia', 'Allen', 22, 'F', true),
    ('0bba9931-bc02-40ee-a69f-993a0f6f4d2b', 'Lucas', 'King', 43, 'M', true),
    ('544a8cf5-0418-4c6d-bd24-654006a00735', 'Harper', 'Wright', 25, 'F', true),
    ('d747c87e-7021-4306-b8ec-085c28f7bf6c', 'Mason', 'Scott', 32, 'M', true),
    ('9b6861ce-4aec-4dea-b81b-765aa4b76de8', 'Evelyn', 'Green', 28, 'F', true),
    ('9817e6e9-bc22-4ac9-9b0e-0cbf3ef7d522', 'Logan', 'Adams', 40, 'M', true),
    ('9944498e-c6d0-401e-81db-0063c239e343', 'Abigail', 'Baker', 23, 'F', true),
    ('f7b8fe58-2df8-4707-8fc0-152bbec70fcf', 'Alexander', 'Gonzalez', 37, 'M', true),
    ('89fee67c-9d07-4bb6-b0cf-11ae45449c92', 'Avery', 'Nelson', 30, 'F', true),
    ('0a18c242-d3f2-4626-bbf0-0114e270f758', 'William', 'Carter', 42, 'M', true);