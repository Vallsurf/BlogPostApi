const express = require('express'); 
const router = express.Router(); 
const morgan = require ('morgan'); 
const bodyParser = require('body-parser'); 

const {BlogPosts} = require('./models.js'); 

const jsonParser = bodyParser.json(); 
const app = express (); 

app.use(morgan('common')); 

BlogPosts.create('Hello World!','This is the blog post content!', 'By Val Singhal', 'Published May 5th'); 

app.get('/BlogPosts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/BlogPosts', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate']; 
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i]; 
		if (!(field in req.body)){
			const message = `Missing \`${field}\` in request body`;
			console.error(message); 
			return res.status(400).send(message); 
		}
	}

	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate); 
	return res.status(201).json(post); 

});

// app.delete('/BlogPosts')

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});