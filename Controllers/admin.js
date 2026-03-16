const User=require('../Models/User');

exports.listUsers=(req,res)=>{
	User.getAll()
		.then(users=>{
			res.render('Platforms/admin-users',{
				pageTitle:'Admin | Users',
				users,
				isAuthenticated:req.session.isLoggedIn,
			});
		})
		.catch(err=>{
			console.log(err);
			res.status(500).send('Unable to load users');
		});
};

exports.deleteUser=(req,res)=>{
	const {id}=req.params;
	User.delete(id)
		.then(()=>res.redirect('/admin/users'))
		.catch(err=>{
			console.log(err);
			res.status(500).send('Unable to delete user');
		});
};
