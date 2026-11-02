CREATE DATABASE IF NOT EXISTS campus_sports;
USE campus_sports;

-- 1. TABLES
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
-- 2. INSERT DUMMY DATA
-- ==========================================

-- Users
INSERT INTO users (id, first_name, last_name, email, role, password_hash) VALUES
(1, 'Alex', 'Student', 'student@demo.ca', 'STUDENT', 'dummyhash123'),
(2, 'Jordan', 'Captain', 'captain@demo.ca', 'STUDENT', 'dummyhash123'),
(3, 'Morgan', 'Admin', 'admin@demo.ca', 'ADMIN', 'dummyhash123'),
(4, 'Casey', 'Facilities', 'facility@demo.ca', 'FACILITY_MANAGER', 'dummyhash123');

-- Sports
INSERT INTO sports (id, name, description, max_team_size, icon) VALUES
(1, 'Badminton', 'Singles, doubles, and open gym matches', 6, '[BADMINTON]'),
(2, 'Basketball', 'Intramural five-a-side and pickup games', 12, '[BASKETBALL]'),
(3, 'Soccer', 'Indoor and outdoor recreational leagues', 16, '[SOCCER]'),
(4, 'Volleyball', 'Mixed-team social and competitive leagues', 12, '[VOLLEYBALL]');

-- Leagues
INSERT INTO leagues (id, sport_id, name, season, status) VALUES
(1, 1, 'Badminton Doubles - Fall', 'Fall 2026', 'OPEN'),
(2, 2, 'Basketball Open League', 'Fall 2026', 'OPEN'),
(3, 3, 'Indoor Soccer Cup', 'Fall 2026', 'OPEN'),
(4, 4, 'Volleyball Social', 'Fall 2026', 'OPEN');

-- Teams
INSERT INTO teams (id, league_id, sport_id, name, captain_id, accepting) VALUES
(1, 1, 1, 'Shuttle Stars', 2, TRUE),
(2, 1, 1, 'Net Ninjas', 2, TRUE),
(3, 2, 2, 'North Court', 2, TRUE),
(4, 2, 2, 'Fast Breakers', 2, TRUE),
(5, 3, 3, 'Campus United', 2, TRUE),
(6, 3, 3, 'Golden Boots', 2, TRUE);

-- Facilities
INSERT INTO facilities (id, name, location, capacity, type) VALUES
(1, 'Main Gym', 'Building A, Level 1', 100, 'Gym'),
(2, 'Badminton Courts', 'Athletics Centre, Level 2', 20, 'Court'),
(3, 'Indoor Field', 'Recreation Complex', 80, 'Field');
