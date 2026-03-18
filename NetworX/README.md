# 🌐 NetworX

## 📌 Project Overview
NetworX is a **full-stack social-professional networking platform** designed to connect users based on skills, projects, and AI-driven compatibility. Users can create/join project rooms, collaborate in real-time, share files, receive personalized feeds, and track project progress. NetworX simplifies team building and networking for professionals and students alike.

---

## ✨ Features
- 🔑 **User Authentication:** Signup and login with JWT-based security  
- 👤 **User Profiles:** View and edit personal info, skills, and interests  
- 🤖 **AI Matchmaking (Optional):** Suggest collaborators based on skills  
- 🏢 **Project Rooms:** Create, join, and manage project collaboration spaces  
- 💬 **Real-Time Chat:** Chat with team members using Socket.io  
- 📂 **File Sharing:** Upload/download project files in rooms  
- 📰 **Feed System:** Personalized updates from projects and connections  
- 🔔 **Notifications:** Real-time alerts for invites, messages, and updates  
- 📊 **Analytics Dashboard:** Visualize contribution stats and project progress  

---

## 🛠 Tech Stack
**Frontend:**  
- HTML5  
- CSS3  
- JavaScript  
- Optional: Bootstrap / Tailwind CSS  

**Backend:**  
- Node.js + Express.js  
- Database: MongoDB or MySQL  
- Authentication: JWT / OAuth  
- Real-time: Socket.io  
- AI/Logic: Python microservice or JS AI library (optional)  

---

## 📂 Project Folder Structure
NetworX/
├── frontend/
│ ├── index.html
│ ├── about.html
│ ├── login.html
│ ├── signup.html
│ ├── profile.html
│ ├── project-room.html
│ ├── feed.html
│ ├── notifications.html
│ ├── css/style.css
│ ├── js/main.js
│ ├── js/chat.js
│ └── assets/images, assets/icons/
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ └── config/db.js
├── database/schema.sql (optional)
├── package.json
└── README.md

markdown
Copy code

---

## 🚀 Development Progress
**Phase 1 – HTML Skeleton:**  
- All main pages created: index, login, signup, profile, project-room, feed, notifications  
- Semantic HTML tags used for clean structure  

**Phase 2 – CSS & Layout:**  
- Navbar, buttons, forms, project cards styled  
- Placeholder images and icons added  

**Phase 3 – Backend Setup:**  
- Express server configured in `server.js`  
- Database connection established (MongoDB/MySQL)  
- Folders for routes, controllers, models, middleware created  

**Phase 4 – User Authentication:**  
- Signup & login APIs implemented with bcrypt password hashing  
- JWT-based authentication middleware ready  

**Phase 5 – Profile & Skills:**  
- User model defined in database  
- Profile API implemented to view/edit skills and interests  

**Phase 6 – Project Rooms:**  
- Project model implemented  
- APIs for creating/joining rooms in progress  
- Real-time chat setup with Socket.io  

**Phase 7 – Feed & Notifications:**  
- Feed API structure ready  
- Notification system implemented using Socket.io  

**Phase 8 – AI Matchmaking (Optional):**  
- Algorithm outlined  
- Integration with Python microservice planned  

**Phase 9 – Analytics Dashboard:**  
- Data models ready  
- Chart.js or similar for visualizations planned  

---

## ⚙️ Setup Instructions
1. Clone the repository:
git clone <repository-url>

css
Copy code
2. Navigate to the project folder:
cd NetworX

markdown
Copy code
3. Install backend dependencies:
npm install

markdown
Copy code
4. Configure database in `backend/config/db.js`  
5. Start the server:
node server.js

yaml
Copy code
6. Open frontend HTML pages in browser (or integrate with server-side rendering later)

---

## 📝 Future Work
- Complete AI matchmaking system  
- Full project room functionality with file sharing  
- Dynamic feed and notifications  
- Analytics dashboard with real-time charts  
- Deployment: Heroku / Vercel / Netlify  

---

## 👨‍💻 Author
- **Your Name** – Developer & Designer of NetworX  
- GitHub: [Your GitHub Link]  
- LinkedIn: [Your LinkedIn Link]  

---

## 📄 License
- MIT License (optional)