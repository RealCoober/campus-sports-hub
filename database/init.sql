-- Create the database
CREATE DATABASE IF NOT EXISTS campus_sports;
USE campus_sports;

-- 1. Users Table (Students and Admins)
CREATE TABLE IF NOT EXISTS users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    role ENUM('Student', 'Administrator') DEFAULT 'Student',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sports Table
CREATE TABLE IF NOT EXISTS sports (
    sportID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    maxTeamSize INT
);

-- 3. Leagues Table
CREATE TABLE IF NOT EXISTS leagues (
    leagueID INT AUTO_INCREMENT PRIMARY KEY,
    sportID INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    startDate DATE,
    endDate DATE,
    status ENUM('Upcoming', 'Active', 'Completed') DEFAULT 'Upcoming',
    FOREIGN KEY (sportID) REFERENCES sports(sportID) ON DELETE CASCADE
);

-- 4. Teams Table
CREATE TABLE IF NOT EXISTS teams (
    teamID INT AUTO_INCREMENT PRIMARY KEY,
    leagueID INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    captainID INT,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    points INT DEFAULT 0,
    FOREIGN KEY (leagueID) REFERENCES leagues(leagueID) ON DELETE CASCADE,
    FOREIGN KEY (captainID) REFERENCES users(userID) ON DELETE SET NULL
);

-- Insert some dummy data so we have something to look at later
INSERT INTO users (email, passwordHash, firstName, lastName, role) VALUES 
('admin@humber.ca', 'dummyhash123', 'Admin', 'User', 'Administrator'),
('captain@humber.ca', 'dummyhash123', 'John', 'Doe', 'Student');

INSERT INTO sports (name, description, maxTeamSize) VALUES 
('Basketball', '5v5 intramural basketball', 10),
('Soccer', '7v7 intramural soccer', 14);

INSERT INTO leagues (sportID, name, status) VALUES 
(1, 'Fall 2026 Basketball League', 'Active'),
(2, 'Fall 2026 Soccer League', 'Upcoming');