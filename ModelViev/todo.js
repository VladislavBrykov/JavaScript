const {Router} = require('express')
const router = Router()
const bodyParser = require("body-parser");
const db_update_comment = require('../DB/db_update_comment');
const db_all_categories_post = require('../DB/db_all_categories_post');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
/*-----------Authentication module----------------*/ 
/*------------------------------------------------*/
// Регистрация
router.post('/auth/register', (req, res) => {
	let data = req.body;
	console.log(data);

	if(data.password !== data.passwordConfirmation) {
		res.json({
			status: false,
			err: "password != passwordConfirmation"
		})
	}

	new Promise((resolve, reject) => {
		const result = require('../DB/db_registration')
		let role_user = "user";
		result.db_registration(data.login, data.password, data.email, role_user)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		let err = "login or mail is already taken"
		res.json({status: false, err})
	})
});


//Логин
router.post('/auth/login', (req, res) => {
	let data = req.body;
	console.log(data);

	new Promise((resolve, reject) => {
		const result = require('../DB/db_login')
		result.db_login(data.login, data.password, data.email)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		let error = "user not found, check your input";
		res.json({status: false, error})
	})
});


// log out authorized user
router.post('/auth/logout', (req, res) => {
	let data = req.body;
	console.log(data);

	new Promise((resolve, reject) => {
		const result = require('../DB/db_logout')
		result.db_logout(data.id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		let error = "error logout"
		res.json({status: false, error})
	})
});


// восстановление пароля запрос на почту
router.post('/auth/password-reset', (req, res) => {
	let data = req.body;
	console.log(data);
	

	new Promise((resolve, reject) => {
		const result = require('../DB/db_search_id_for_email')
		result.db_search_id_for_email(data.email)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		const result = require('../Controller/pass_reset')
	 	result.pass_reset(rp.id, data.email);
		res.json({status: true});
	}).catch(() => {
		res.json({status: false})
	})


		// const result = require('../Controller/pass_reset')
	 	// result.pass_reset(data.id, data.mail);
		// res.json({status: true});
});


//восстановление пароля с кодом (на мейл)
router.post('/auth/password-reset/:confirm_token', (req, res) => {
	let data = req.body;
	let email_password = req.params.confirm_token;
	if(email_password != data.id) 
		res.json({status: false, err : "email_password != id"});

	new Promise((resolve, reject) => {
		const result = require('../DB/db_pass_reset')
		result.db_pass_reset(data.id, data.password)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

// /*------------------------------------------------*/


// /*-----------------User module--------------------*/ 
// /*------------------------------------------------*/

// //получить всех пользователей
router.get('/users', (rec, res) => {
		new Promise((resolve, reject) => {
			const result = require('../DB/db_all_users')
			result.db_all_users()
				.then(response => {
					if (response) {
						resolve(response);
					} else {
						reject(0)
					}
				})
		}).then(rp => {
			res.json({status: true, rp});
		}).catch(() => {
			res.json({status: false})
		})
});

//получить пользователя по его айди
router.get('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_id_user')
		result.db_id_user(user_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, error: "user exists"})
	})
});

// от имени админа создать пользователя
router.post('/users', (req, res) => {
	let data = req.body;
	console.log(data);

	if(data.role != "admin") {
		res.json({
			status: false,
			err: "role != admin"
		})
	}

	new Promise((resolve, reject) => {
		const result = require('../DB/db_registration')
		result.db_registration(data.login, data.password, data.email, data.role_user)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, err: "check your input"})
	})
});

//аватар подгружает только авторизированный пользователь _______________
// { 
// 	"id": "63",
// "avatar" : "http/sdfdsggerg"
// }
router.post('/users/avatar', (req, res) => {
	let data = req.body;
	console.log(data);

	new Promise((resolve, reject) => {
		const result = require('../DB/db_avatar')
		result.db_avatar(data.id, data.avatar)

		res.json({status: true});
	})
});


//изменить данные пользователя
router.patch('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	let data = req.body;
	console.log(data);

	if(data.role != "admin") 
		res.json({status: false})

	new Promise((resolve, reject) => {
		const result = require('../DB/db_update_user')
		result.db_update_user(user_id, data.email, data.login, data.password)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});


//удалить пользователя
router.delete('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_user')
		result.db_delete_user(user_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true});
	}).catch(() => {
		res.json({status: false})
	})
});

// /*------------------------------------------------*/


// /*-----------------Post module--------------------*/ 
// /*------------------------------------------------*/

// //получить все посты
router.get('/posts', (req, res) => {
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_posts')
		result.db_all_posts()
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false})
	})
});

//получить конкретный пост
router.get('/posts/:post_id', (req, res) => {
	let post_id = req.params.post_id;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_one_post')
		result.db_one_post(post_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false, error: "post does not exist"})
	})
});

//получить комментарии к посту с айди
router.get('/posts/:post_id/comments', (req, res) => {
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_comments')
		result.db_all_comments(post_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false, error: "post exists"})
	})
});

//добавить комментарий к посту
router.post('/posts/:post_id/comments', (req, res) => {
	let data = req.body;
	console.log(data);
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_new_comment')
		result.db_new_comment(post_id, data.id_user, data.comment)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

//получить категории связанные с постом по айди поста
router.post('/posts/:post_id/categories', (req, res) => {
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_categories_post')
		result.db_all_categories_post(post_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false})
	})
});

//получить все лайки к посту по айди поста
router.get('/posts/:post_id/like', (req, res) => {
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_likes_post')
		result.db_all_likes(post_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false})
	})
});


//добавить новый пост
router.post('/posts', (req, res) => {
	let data = req.body;
	console.log(data);

	new Promise((resolve, reject) => {
		const result = require('../DB/db_new_post')
		result.db_new_post(data.title, data.content, data.categories, data.user)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});


//поставить лайк под постом
router.post('/posts/:post_id/like', (req, res) => {
	let data = req.body;
	console.log(data);
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_new_like_post')
		result.db_new_like(post_id, data.id_user, data.comment_id, data.type_role)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, error: "like exists"})
	})
});

//изменить данные поста
router.patch('/posts/:post_id', (req, res) => {
	let post_id = req.params.post_id;
	let data = req.body;
	console.log(data);

	new Promise((resolve, reject) => {
		const result = require('../DB/db_update_post')
		result.db_update_post(post_id, data.title, data.content, data.category, data.status)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});


//удалить пост
router.delete('/posts/:post_id', (req, res) => {
	let post_id = req.params.post_id;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_post')
		result.db_delete_post(post_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true});
	}).catch(() => {
		res.json({status: false})
	})
});

//удалить лайк под постом/комментарием
router.delete('/posts/:post_id/like', (req, res) => {
	let post_comment_id = req.params.post_id;
	let data = req.body;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_like')
		result.db_delete_like(post_comment_id, data.id_user, data.type)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true});
	}).catch(() => {
		res.json({status: false, err: "like dont exists"})
	})
});

// /*------------------------------------------------*/


// /*---------------Categories module----------------*/ показал
// /*------------------------------------------------*/


// //получить список всех категорий
router.get('/categories', function(req, res) {
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_categories')
		result.db_all_categories()
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

//получить все посты по айди категории
router.get('/categories/:category_id/posts', (req, res) => {
	let category_id = req.params.category_id;

	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_post_for_idCategory')
		result.db_all_post_for_idCategory(category_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, error: "posts not exists"})
	})
});


//добавить новую категорию
router.post('/categories', (req, res) => {
	let data = req.body;
	console.log(data);
	new Promise((resolve, reject) => {
		const result = require('../DB/db_new_categories')
		result.db_new_categories(data.category)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});



//изменить данные категории
router.patch('/categories/:category_id', (req, res) => {
	let category_id = req.params.category_id;
	let data = req.body;
	console.log(data);
	new Promise((resolve, reject) => {
		const result = require('../DB/db_update_category')
		result.db_update_category(data.category, category_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

//удалить категорию по айди
router.delete('/categories/:category_id', (req, res) => {
	let category_id = req.params.category_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_category')
		result.db_delete_category(category_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, error: "category not exists"})
	})
});

// /*------------------------------------------------*/


// /*----------------Comments module-----------------*/ 
// /*------------------------------------------------*/

//получить данные комментария по его айди
router.get('/comments/:comment_id', (req, res) => {
	let comment_id = req.params.comment_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_comment_by_id')
		result.db_comment_by_id(comment_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});


//получить все лайки под комментарием по его айди
router.get('/comments/:comment_id/like', (req, res) => {
	let comment_id = req.params.comment_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_all_likes_comment')
		result.db_all_likes_comment(comment_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
	 	res.json({status: true, rp});
	 }).catch(() => {
		res.json({status: false, error: "comments not exists"})
	})
});

//Поставить лайк под комментарием
router.post('/comments/:comment_id/like', (req, res) => {
	let comment_id = req.params.comment_id;
	let data = req.body;
	console.log(data);
	let post_id = req.params.post_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_new_like_comment')
		result.db_new_like_comment(data.id_user, comment_id, data.type_role)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false, error: "like exists"})
	})
	//
});

//изменить данные комментария
router.patch('/comments/:comment_id', (req, res) => {
	let comment_id = req.params.comment_id;
	let data = req.body;
	console.log(data);
	new Promise((resolve, reject) => {
		const result = require('../DB/db_update_comment')
		result.db_update_comment(data.status, comment_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});


//удалить комментарий по его айди
router.delete('/comments/:comment_id', (req, res) => {
	let comment_id = req.params.comment_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_comment')
		result.db_delete_comment(comment_id)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

//удалить лайк под комментарием
router.delete('/comments/:comment_id/like', (req, res) => {
	let comment_id = req.params.comment_id;
	new Promise((resolve, reject) => {
		const result = require('../DB/db_delete_like')
		let type_role = "comment";
		result.db_delete_like(comment_id, type_role)
			.then(response => {
				if (response) {
					resolve(response);
				} else {
					reject(0)
				}
			})
	}).then(rp => {
		res.json({status: true, rp});
	}).catch(() => {
		res.json({status: false})
	})
});

module.exports = router