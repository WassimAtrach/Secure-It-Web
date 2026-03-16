const User = require('../Models/User');
const Audit = require('../Models/Audit');
const Goal = require('../Models/Goal');
const Tool = require('../Models/Tool');

//Renderer helper function with Session data by default
const renderWithSession = (res, view, options = {}) => {
    const defaults = {
        pageTitle: options.pageTitle || 'Secure-It',
        isAuthenticated: options.isAuthenticated || false,
        // Prevents undefined errors in EJS if arrays are empty
        audits: options.audits || [],
        goals: options.goals || [],
        tools: options.tools || []
    };
    return res.render(view, { ...defaults, ...options });
};

exports.getHome = (req, res) => {
    renderWithSession(res, 'index', {
        pageTitle: 'Home',
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.getLearn = (req, res) => {
    renderWithSession(res, 'Platforms/learn', {
        pageTitle: 'Learn',
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.getResources = (req, res) => {
    renderWithSession(res, 'Platforms/resources', {
        pageTitle: 'Resources',
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.getQuiz = (req, res) => {
    renderWithSession(res, 'Platforms/quiz', {
        pageTitle: 'Quiz',
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.postQuiz = (req, res) => {
    const userId = req.session.userId || null;
    console.log('Quiz submission', { userId, answers: req.body });

    if (req.accepts('json')) {
        return res.json({ status: 'ok' });
    }
    return res.send('Quiz Saved');
};

exports.getProfile = async (req, res) => {
    const userId = req.session.userId;
    
    if (!userId) {
        return res.redirect('/login');
    }

    try {
        // Withdrawal of user information
        const user = await User.findById(userId);
        if (!user) {
            return res.redirect('/login');
        }

        const [audits, goals, tools] = await Promise.all([
            Audit.fetchAllByUserId(userId),
            Goal.fetchAllByUserId(userId),
            Tool.fetchAll()
        ]);

        renderWithSession(res, 'Platforms/profile', {
            pageTitle: 'Profile',
            isAuthenticated: true,
            user: user,
            audits: audits[0] || [],
            goals: goals[0] || [],
            tools: tools[0] || [],
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Unable to load profile');
    }
};