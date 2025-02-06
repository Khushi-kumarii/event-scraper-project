Event Scraper Project
This project scrapes event data from websites in Sydney, Australia, and displays it on a webpage. It includes an email opt-in for ticket links and updates event data every 24 hours.

📌 Project Description
This project is a web scraper that collects event data from various sources and displays it in a user-friendly interface. It uses:

Python (BeautifulSoup, Selenium) for web scraping
React.js for frontend UI
Node.js & Express.js for backend API
MySQL for data storage
The scraper updates event listings every 24 hours and offers an email opt-in feature for ticket links.

📌 Setup Instructions
1️⃣ Clone the Repository

Copy
Edit
git clone https://github.com/your-username/event-scraper-project.git
cd event-scraper-project
2️⃣ Install Dependencies
Backend Setup (Node.js)

Copy
Edit
cd backend
npm install

Create a .env file inside the backend/ directory and add:
DATABASE_URL=mysql://user:root@localhost:3306/event_scraper
PORT=5000
Replace user and password with your actual MySQL credentials.

Frontend Setup (React)
cd ../frontend
npm install

Scraper Setup (Python)
cd ../scraper
pip install -r requirements.txt

📌 How to Run the Project
1️⃣ Start the Backend Server
cd backend
npm start
It will run at http://localhost:5000

2️⃣ Start the Frontend
cd ../frontend
npm start
It will run at http://localhost:3000

3️⃣ Run the Scraper
cd ../scraper
python scraper.py
The scraper fetches event data and stores it in MySQL.

📌 How to Run Tests
Backend Tests:
cd backend
npm test

Frontend Tests:
cd frontend
npm test

Scraper Tests:
cd scraper
pytest

📌 Dependencies
Frontend: React.js, Axios, Tailwind CSS
Backend: Node.js, Express.js, MySQL
Scraper: Python, BeautifulSoup, Selenium