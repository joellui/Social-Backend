const express = require('express')
const { authenticate } = require('../auth')
const router = express.Router()
const userController = require('../controller/userController')
const postController = require('../controller/postController')


//POST   /api/authenticate    -->auth user             Emai, Password : JWT 
//POST   /api/follow/{id}     -->follow user            
//POST   /api/unfollow/{id}   -->unfollow user
//GET    /api/user            -->return userProfile    :Name,followers,unfollowers
//POST   /api/posts           -->create post           title,desc : post-id, title,desc,time
//DELETE /api/posts/{id}      -->delete post
//POST   /api/like/{id}       -->like post
//POST   /api/unlike/{id}     -->unlike post
//POST   /api/comment/{id}    -->add comment            comment:comment-id
//GET    /api/posts/{id}      -->get post with number of likes and comments
//GET    /api/all_posts       -->all post by user       id,title,desc,create_at,comments,likes

router.post('/createUser',userController.createUser)
router.post('/authenticate',userController.authenticateUser)
router.get('/user', authenticate, userController.user)
router.post('/follow/:id',authenticate, userController.userfollow)
router.post('/unfollow/:id',authenticate, userController.userunfollow)
router.post('/posts',authenticate,postController.createPost)
router.delete('/posts/:id',authenticate,postController.deletePost)
router.post('/like/:id',authenticate,postController.likePost)
router.post('/unlike/:id',authenticate,postController.unLikePost)
router.post('/comment/:id',authenticate,postController.commentPost)
router.get('/posts/:id',authenticate,postController.getPost)
router.get('/all_posts',authenticate,postController.getAllPosts)
module.exports = router