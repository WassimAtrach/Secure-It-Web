const Audit = require('../Models/Audit');
const Goal = require('../Models/Goal');
const Tool = require('../Models/Tool');

//1. Displaying the page and retrieving all the data of the logged-in user (GET)
exports.getProgressPage = async (req, res) => {
    //Security: If there is no user in session, send to login
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const userId = req.session.user.id;

    try {
        //Retrieving from 3 tables simultaneously
        const [audits] = await Audit.fetchAllByUserId(userId);
        const [goals] = await Goal.fetchAllByUserId(userId);
        const [tools] = await Tool.fetchAll(); 

        res.render('Platforms/progress', {
            pageTitle: 'My Progress',
            path: '/progress',
            audits: audits,
            goals: goals,
            tools: tools
        });
    } catch (err) {
        console.error("Error loading progress page:", err);
        res.status(500).send("Server Error");
    }
};

// 2. Saving a new security check (POST)
exports.postAudit = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const { d_name, connection_type, os_type, audit_date, antivirus, score } = req.body;
    const userId = req.session.user.id; 

    const isValidDate = typeof audit_date === 'string'
        && /^\d{4}-\d{2}-\d{2}$/.test(audit_date)
        && !Number.isNaN(new Date(audit_date).getTime());

    if (!isValidDate) {
        return res.status(400).send('Invalid date format. Please use a valid date.');
    }

    const newAudit = new Audit(userId, d_name, connection_type, os_type, audit_date, antivirus, score);
    try {
        await newAudit.save();
        res.redirect('/progress');
    } catch (err) {
        console.error("Error saving audit:", err);
        res.status(500).send("Internal Server Error");
    }
};

// 3. Saving a new security target (POST)
exports.postGoal = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const { category, target_device, priority, cost, frequency, your_status } = req.body;
    const userId = req.session.user.id; 

    const goal = new Goal(userId, category, target_device, priority, cost, frequency, your_status);
    try {
        await goal.save();
        res.redirect('/progress');
    } catch (err) {
        console.error("Error saving goal:", err);
        res.status(500).send("Internal Server Error");
    }
};

// 4. Recommendation for a new tool (POST)
exports.postTool = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const { tool_name, vpn_type, price_model, rating, notes, link } = req.body;
    const userId = req.session.user.id;

    const tool = new Tool(userId, tool_name, vpn_type, price_model, rating, notes, link);
    try {
        await tool.save();
        res.redirect('/progress');
    } catch (err) {
        console.error("Error saving tool:", err);
        res.status(500).send("Internal Server Error");
    }
};