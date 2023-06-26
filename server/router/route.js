const express = require('express');
const router = express.Router();
const UsersData = require('../model/user');
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const argon2 = require('argon2');
const authenticate = require('../middleware/authenticate')
const nodemailer = require('nodemailer');
const { validate } = require('email-validator');
const cookieParser = require("cookie-parser");
const Image = require('../model/images');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
require('jsonwebtoken')
router.use(cookieParser())
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// const multer = require('multer');


// const upload = multer({ dest: '../Images' }); // Specify the destination directory to save the uploaded files

// router.post('/uploadimg',upload.single('file'), async (req, res) => {
//   res.json(file)
// })

router.post('/register', async (req, res) => {
  console.log("Num 1");
  const { fullName, email, password, confirmPassword } = req.body;
  console.log("Num 2");
  console.log(fullName, email, password, confirmPassword);

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: 'Incomplete Form' });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ error: 'Password does not match' });
  }

  // Validate user name format
  // const usernameRegex = /^[a-zA-Z0-9_]{3,24}$/;
  // if (!usernameRegex.test(fullName)) {
  //   return res.status(422).json({ error: "Invalid entry enter like this  (Jhon_Salter123)." });
  // }
  // // Validate password format
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,24}$/;

  // if (!passwordRegex.test(password)) {
  //   return res.status(422).json({ error: 'Invalid Password' });
  // }
  // if (!validate(email)) {
  //   return res.status(422).json({ error: 'Invalid Email' });
  // }


  try {
    const userEmailExist = await UsersData.findOne({ email });
    const userNameExist = await UsersData.findOne({ fullName });

    if (userEmailExist) {
      return res.status(422).json({ error: 'User email already exists' });
    } else if (userNameExist) {
      return res.status(422).json({ error: 'User name already exists' });
    } else {
      const hashedPassword = await argon2.hash(password);

      const newUser = new UsersData({ fullName, email, password: hashedPassword, confirmPassword: hashedPassword });
      await newUser.save();
      console.log(hashedPassword);
      return res.status(200).json({ message: 'Registered successfully' });
    }
  } catch (error) {
    console.log(error);
    // Handle the error appropriately
  }
});

// router.post('/register', async (req, res) => {

//   console.log("Num 1");
//   const { fullName, email, password, confirmPassword } = req.body;
//   console.log("Num 2");
//   console.log(fullName, email, password, confirmPassword)

//   if (!fullName || !email || !password || !confirmPassword) {
//     return res.status(422).json({ error: 'Incomplete Form' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(422).json({ error: 'Password does not match' });
//   }

//   try {

//     const userExist = await UsersData.findOne({ email });

//     if (userExist) {
//       return res.status(422).json({ error: 'User already exists' });
//     } else {
//       const hashedPassword = await argon2.hash(password);

//       const newUser = new UsersData({ fullName, email, password: hashedPassword, confirmPassword: hashedPassword });
//       await newUser.save();
//       console.log(hashedPassword);
//       return res.status(200).json({ message: 'Registered successfully' });
//     }
//   } catch (error) {
//     console.log(error);
//     // Handle the error appropriately
//   }
// });


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Incomplete')
    return res.status(422).json({ error: 'Incomplete Entries' });
  }

  try {
    const user = await UsersData.findOne({ email });

    if (user) {

      const passwordMatched = await argon2.verify(user.password, password);

      if (passwordMatched) {
        //  Dealing with cookies
        const token = await user.generateAuthToken()
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        })
        res.status(200).json(user.isadmin);
      } else {
        console.log('Invalid password');
        res.status(422).json({ error: 'Incorret Entries! Check Email or Password' });
      }
    } else {
      console.log('Invalid user');
      res.status(422).json({ message: 'Incorret Entries! Check Email or Password ' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/signout', (req, res) => {
  res.clearCookie('jwtoken', { path: '/' })
  res.status(200).json("User Logout Successfully")
})



// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const newImage = new Image();
  console.log("Newimage", newImage);
  newImage.data = fs.readFileSync(req.file.path);
  newImage.contentType = req.file.mimetype;
  try {
    const savedImage = await newImage.save();
    await fs.promises.unlink(req.file.path); // Delete the file from the uploads directory
    res.status(200).json({ success: true, imageId: savedImage._id });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while saving the image.');
  }
});

router.post('/createblog', async (req, res) => {
  try {
    const { title, author, cat, content } = req.body;

    // console.log("images",images)
    // console.log("NewImage", images)
    // const image = {
    //   data: fs.readFileSync(req.file.path),
    //   contentType: req.file.mimetype,
    // };

    const blog = new Blog({ title, author, category: cat, content, createdAt: new Date() });
    // console.log("NewImage", blog.images)
    await blog.save();

    // await fs.promises.unlink(req.file.path)

    // const users = await User.find()

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'haseebfarooq200@gmail.com', // Your email address
    //     pass: 'thgevdwvprumjktv', // Your email password
    //   },
    // });
    // const mailOptions = {
    //   from: 'haseebfarooq200@gmail.com', // Sender's email address
    //   subject: 'New Blog Post',
    //   text: 'A new blog post has been published. Check it out!',
    // };
    // mailOptions.to = 'rmustafa.hafeez@gmail.com';
    // await transporter.sendMail(mailOptions);
    // for (const user of users) {
    //   mailOptions.to = user.email; // Set recipient's email address dynamically
    //   await transporter.sendMail(mailOptions);
    // }
    res.status(200).json("Blog has been created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a blog post' });
  }
});













// Create a new blog post
// router.post('/createblog', async (req, res) => {
//   try {
//     const { title, author, cat, content } = req.body;
//     // const { title, author, category, content } = req.body;

//     console.log("Running")
//     // const blog = new Blog({ title, author, category, content, createdAt: new Date() });
//     const blog = new Blog({ title, author, category:cat, content, createdAt: new Date() });
//     await blog.save();

//     // const users = await User.find()

//     // const transporter = nodemailer.createTransport({
//     //   host: 'smtp.gmail.com',
//     //   port: 465,
//     //   secure: true,
//     //   auth: {
//     //     user: 'haseebfarooq200@gmail.com', // Your email address
//     //     pass: 'thgevdwvprumjktv', // Your email password
//     //   },
//     // });
//     // const mailOptions = {
//     //   from: 'haseebfarooq200@gmail.com', // Sender's email address
//     //   subject: 'New Blog Post',
//     //   text: 'A new blog post has been published. Check it out!',
//     // };
//     // mailOptions.to = 'rmustafa.hafeez@gmail.com';
//     // await transporter.sendMail(mailOptions);
//     // for (const user of users) {
//     //   mailOptions.to = user.email; // Set recipient's email address dynamically
//     //   await transporter.sendMail(mailOptions);
//     // }
//     res.status(200).json("Blog has been created successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create a blog post' });
//   }
// });

// Retrieving All Users
router.get("/getusers", async (req, res) => {
  try {
    const users = await UsersData.find()
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Retrieving All Blog Posts:
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Retrieving Random Blogs:
router.get("/getrandomblogs", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([{ $sample: { size: 5 } }])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Retrieving Random Users:
router.get("/getrandomusers", async (req, res) => {
  try {
    const users = await UsersData.aggregate([{ $sample: { size: 5 } }])
    console.log("Success Response");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});


// Retrieving a Single Blog Post:
router.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const blog = await Blog.findById(id);
    // const blog = await Blog.findById(id).populate("author", "username").populate("category", "name");
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the blog post" });
  }
});

// Updating a Blog Post    
router.put("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, category, pictureUrls } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, category, pictures: pictureUrls },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the blog post" });
  }
});
// Deleting a Blog Post:    
router.delete("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the blog post" });
  }
});


// POST /api/comments - Create a new comment
router.post("/comments", async (req, res) => {
  try {
    const { content, author, blog } = req.body;

    const comment = new Comment({
      content,
      author,
      blog,
    });
    comment.createdAt = new Date();
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a comment" });
  }
});


// GET /api/comments/:commentId - Get a comment by ID
router.get("/comments/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the comment" });
  }
});


router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
});

// PUT /api/comments/:commentId - Update a comment by ID
router.put("/comments/:commentId", async (req, res) => {
  try {
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment" });
  }
});

// DELETE /api/comments/:commentId - Delete a comment by ID
router.delete("/comments/:commentId", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the comment" });
  }
});


router.get("/getrandomhome", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $sample: { size: 5 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadhome", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Retrieving Random EntertainmentCategory:
router.get("/getrandomentertainment", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Entertainment' } },
      { $sample: { size: 5 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadentertainment", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Entertainment' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

// Retrieving Random NewsCategory:
router.get("/getrandomnews", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'News' } },
      { $sample: { size: 5 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadnews", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'News' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getrandomfinance", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Finance' } },
      { $sample: { size: 3 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadfinance", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Finance' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getrandomsports", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Sports' } },
      { $sample: { size: 4 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadsports", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Sports' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getrandomlife", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Life' } },
      { $sample: { size: 3 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadlife", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Life' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getrandomshopping", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Shopping' } },
      { $sample: { size: 5 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/getheadshopping", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $match: { category: 'Shopping' } },
      { $sample: { size: 1 } }
    ])
    console.log("Success Response");
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
});

router.get("/calladmin", authenticate, async (req, res) => {
  if (req.currentUser.isadmin === true) {
    res.status(200).json(req.currentUser)
  }
  else {
    res.status(404).json('Error Occured')
  }
})




router.get('/image', async (req, res) => {
  try {
    const images = await Image.find();
    if (!images || images.length === 0) {
      return res.status(404).send('No images found.');
    }

    // Create an array to store the image data
    const imageData = [];

    // Iterate over each image and extract the data
    images.forEach((image) => {
      const imageObj = {
        _id: image._id,
        contentType: image.contentType,
        data: image.data.toString('base64'),
      };
      imageData.push(imageObj);
    });

    res.status(200).json(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving the images.');
  }
});

module.exports = router;
