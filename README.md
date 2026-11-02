# Campus Sports & Intramural Hub - Phase 1

A full-stack web application built with React, Express, and MySQL (via Docker) to allow students to discover, join, and manage intramural sports on campus.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **Docker Desktop**
- **Git** 
- **Visual Studio Code** (Recommended)

## Setup & Installation Steps

Follow these steps exactly to get the full-stack environment running locally. You will need **three separate terminal windows** open in VS Code.

### Step 1: Clone the Repository & Install Dependencies
Open your first terminal, clone the project, and install the Node modules for both the frontend and backend:

git clone https://github.com/RealCoober/campus-sports-hub.git

cd campus-sports-hub

# Install backend dependencies
cd server

npm install

# Install frontend dependencies
cd ../client

npm install

cd ..

# Start the Database (Docker)
docker compose up -d  

After running the command above, wait about 15-20 seconds for MySQL to fully initialize and automatically run the init.sql script to populate the demo data.    

# Start the Backend (Express API)
cd server

npm run dev

# Start the Frontend (React)
cd client

npm run dev

After running this last step, click the link it generates in order for you to access the website prototype.

# Demo Accounts
Password for ALL: password123
Roles:              Emails:                 Description:
Student             student@demo.ca         Can browse sports, view teams, and request to join.
Team Captain        captain@demo.ca         Owns teams and can approve/reject join requests.
Admin               admin@demo.ca           Can manage the system.
Facility Manager    facility@demo.ca        Can manage facility reservations.
(You can also create a new student account using the "Register" button on the login page).
