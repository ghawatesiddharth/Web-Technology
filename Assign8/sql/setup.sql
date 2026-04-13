-- ============================================
-- PostgreSQL Database Setup for Student Info
-- ============================================

-- Step 1: Create the database (run this separately in psql or pgAdmin)
-- CREATE DATABASE studentdb;

-- Step 2: Connect to studentdb, then run the following:

-- Create the students_info table
CREATE TABLE IF NOT EXISTS students_info (
    stud_id     INT PRIMARY KEY,
    stud_name   VARCHAR(100) NOT NULL,
    class       VARCHAR(50)  NOT NULL,
    division    VARCHAR(10)  NOT NULL,
    city        VARCHAR(100) NOT NULL
);

-- Step 3: Insert sample records
INSERT INTO students_info (stud_id, stud_name, class, division, city) VALUES
(1, 'Aarav Sharma',    'TY B.Tech', 'A', 'Pune'),
(2, 'Priya Deshmukh',  'TY B.Tech', 'B', 'Mumbai'),
(3, 'Rohan Patil',     'SY B.Tech', 'A', 'Nagpur'),
(4, 'Sneha Kulkarni',  'TY B.Tech', 'A', 'Nashik'),
(5, 'Vikram Joshi',    'SY B.Tech', 'B', 'Aurangabad');

-- Verify the data
SELECT * FROM students_info;
