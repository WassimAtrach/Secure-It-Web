const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); 

const app = express();

// הגדרת מנוע התצוגה (EJS) ותיקיית ה-Views
app.set('view engine', 'ejs');
app.set('views', 'Views');

// ייבוא הנתיבים (Routes)
const authRoutes = require('./Routes/auth');
const progressRoutes = require('./Routes/progress');
const platformsRoutes = require('./Routes/platforms');
const adminRoutes = require('./Routes/admin');

// Middleware לטיפול בנתונים מהטפסים וקבצים סטטיים
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

// הגדרת Session
app.use(session({
    secret: 'my cyber security secret',
    resave: false,
    saveUninitialized: false
}));

// העברת משתנה הגדרת התחברות לכל ה-Views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn || false;
    next();
});

// שימוש בנתיבים
app.use(authRoutes);
app.use(progressRoutes);
app.use(platformsRoutes);
app.use(adminRoutes);

// נתיב דף הבית
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Home', isAuthenticated: req.session.isLoggedIn || false });
});

// טיפול בשגיאת 404 (דף לא נמצא)
app.use((req, res, next) => {
    res.status(404).render('Platforms/file_not_found', { pageTitle: 'Not Found', isAuthenticated: req.session.isLoggedIn || false });
});

// הפעלת השרת בפורט 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});