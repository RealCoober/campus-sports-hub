CREATE DATABASE IF NOT EXISTS campus_sports;
USE campus_sports;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    student_number VARCHAR(50),
    role ENUM('STUDENT', 'ADMIN', 'FACILITY_MANAGER') DEFAULT 'STUDENT',
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    max_team_size INT DEFAULT 12,
    icon VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS leagues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sport_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    season VARCHAR(50),
    status VARCHAR(20) DEFAULT 'OPEN',
    FOREIGN KEY (sport_id) REFERENCES sports(id)
);

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    league_id INT NOT NULL,
    sport_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    captain_id INT NOT NULL,
    accepting BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (league_id) REFERENCES leagues(id),
    FOREIGN KEY (sport_id) REFERENCES sports(id),
    FOREIGN KEY (captain_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    student_id INT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (facility_id) REFERENCES facilities(id)
);

CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    slot_id INT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (slot_id) REFERENCES time_slots(id)
);

CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    league_id INT NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    facility_id INT,
    scheduled_date DATETIME NOT NULL,
    status ENUM('SCHEDULED', 'COMPLETED') DEFAULT 'SCHEDULED',
    home_score INT,
    away_score INT,
    FOREIGN KEY (league_id) REFERENCES leagues(id),
    FOREIGN KEY (home_team_id) REFERENCES teams(id),
    FOREIGN KEY (away_team_id) REFERENCES teams(id)
);

-- ==========================================
-- INSERT DUMMY DATA
-- ==========================================

-- 1. Insert Users
INSERT INTO users (first_name, last_name, email, role, password_hash) VALUES
('Alex', 'Student', 'student@demo.ca', 'STUDENT', '$2b$10$wT0.4K5nC1gH5xG5yG5yGe5yG5yG5yG5yG5yG5yG5yG5yG5yG5yG'),
('Jordan', 'Captain', 'captain@demo.ca', 'STUDENT', '$2b$10$wT0.4K5nC1gH5xG5yG5yGe5yG5yG5yG5yG5yG5yG5yG5yG5yG5yG'),
('Morgan', 'Admin', 'admin@demo.ca', 'ADMIN', '$2b$10$wT0.4K5nC1gH5xG5yG5yGe5yG5yG5yG5yG5yG5yG5yG5yG5yG5yG');

-- 2. Insert Sports
INSERT INTO sports (name, description, max_team_size, icon) VALUES
('Badminton', 'Singles, doubles, and open gym matches', 6, '[BADMINTON]'),
('Basketball', 'Intramural five-a-side and pickup games', 12, '[BASKETBALL]'),
('Soccer', 'Indoor and outdoor recreational leagues', 16, '[SOCCER]'),
('Volleyball', 'Mixed-team social and competitive leagues', 12, '[VOLLEYBALL]');

-- 3. Insert Leagues
INSERT INTO leagues (sport_id, name, season, status) VALUES
(1, 'Badminton Doubles - Fall', 'Fall 2026', 'OPEN'),
(2, 'Basketball Open League', 'Fall 2026', 'OPEN'),
(3, 'Indoor Soccer Cup', 'Fall 2026', 'OPEN'),
(4, 'Volleyball Social', 'Fall 2026', 'OPEN');

-- 4. Insert Teams
INSERT INTO teams (league_id, sport_id, name, captain_id, accepting) VALUES
(1, 1, 'Shuttle Stars', 2, TRUE),
(1, 1, 'Net Ninjas', 2, TRUE),
(2, 2, 'North Court', 2, TRUE),
(2, 2, 'Fast Breakers', 2, TRUE);

-- 5. Insert Facilities
INSERT INTO facilities (name, location, capacity, type) VALUES
('Main Gym', 'Building A, Level 1', 100, 'Gym'),
('Badminton Courts', 'Athletics Centre, Level 2', 20, 'Court'),
('Indoor Field', 'Recreation Complex', 80, 'Field');