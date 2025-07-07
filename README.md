# SocialSphere - Social Media Platform

A modern, full-stack social media application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

### Core Features
- **User Authentication**: Secure registration and login with JWT tokens
- **User Profiles**: Customizable profiles with bio and profile pictures
- **Post Creation**: Create and share posts with text and images
- **Social Interactions**: Like posts and add comments
- **User Following**: Follow/unfollow other users
- **Real-time Feed**: View posts from followed users
- **Responsive Design**: Mobile-friendly interface

### Technical Features
- **Modern UI/UX**: Clean, intuitive design with Bootstrap 5
- **Image Upload**: Support for profile pictures and post images
- **Secure API**: Protected routes with authentication middleware
- **Database Design**: Optimized MongoDB schemas with relationships
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading animations and user feedback

## 🛠️ Tech Stack

### Frontend
- **React.js 19.1.0** - Modern UI library
- **React Router DOM 7.6.2** - Client-side routing
- **Bootstrap 5.3.7** - CSS framework for responsive design
- **Bootstrap Icons** - Icon library
- **Axios** - HTTP client for API calls
- **JWT Decode** - Token decoding utility

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.0** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
SocialSphere/
├── backend/
│   ├── controllers/     # API route handlers
│   ├── middleware/      # Authentication & upload middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── uploads/         # File storage
│   ├── utils/           # Utility functions
│   └── index.js         # Server entry point
├── frontend_codes/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── api/         # API service functions
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   └── styles/      # CSS files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocialSphere
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8081
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend_codes
   npm install
   ```

5. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend_codes
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081

## 📱 Key Components

### Frontend Components

#### Authentication
- **LoginPage**: User login with email/password
- **RegisterPage**: User registration with profile setup
- **Navbar**: Navigation with authentication state

#### Social Features
- **FeedPage**: Main social feed with posts
- **CreatePost**: Post creation with image upload
- **PostCard**: Individual post display with interactions
- **UserProfilePage**: User profile management

#### UI Components
- **Footer**: Application footer with links
- **Loading States**: Spinner components
- **Error Handling**: Alert components

### Backend API

#### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### User Routes
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id/follow` - Follow/unfollow user

#### Post Routes
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id` - Delete post

## 🎨 Design Improvements

### UI/UX Enhancements
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first approach
- **Consistent Branding**: Unified "SocialSphere" branding
- **Interactive Elements**: Hover effects and animations
- **Loading States**: User feedback during operations
- **Error Handling**: Clear error messages and alerts

### Visual Features
- **Gradient Backgrounds**: Modern gradient designs
- **Card-based Layout**: Clean post and component cards
- **Icon Integration**: Bootstrap Icons throughout
- **Color Scheme**: Consistent primary/secondary colors
- **Typography**: Improved font hierarchy and readability

## 🔧 Technical Improvements

### Code Quality
- **Consistent Naming**: Unified component and variable naming
- **Error Handling**: Comprehensive try-catch blocks
- **Loading States**: Proper loading indicators
- **Form Validation**: Client-side validation
- **API Error Handling**: Better error responses

### Performance
- **Optimized Images**: Proper image handling and display
- **Lazy Loading**: Efficient data loading
- **State Management**: Proper React state handling
- **API Optimization**: Efficient API calls

### Security
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt password encryption
- **Input Validation**: Server-side validation
- **File Upload Security**: Secure file handling

## 🌟 Recent Updates

### Version 2.0 Improvements
- ✅ Fixed API URL configuration (port 8081)
- ✅ Added consistent "SocialSphere" branding
- ✅ Improved Navbar with user dropdown
- ✅ Enhanced HomePage with modern design
- ✅ Redesigned Login/Register forms
- ✅ Improved FeedPage layout and functionality
- ✅ Enhanced PostCard with better interactions
- ✅ Added image preview in CreatePost
- ✅ Improved Footer with comprehensive links
- ✅ Added custom CSS with modern styling
- ✅ Fixed hardcoded URLs and API endpoints
- ✅ Added loading states and error handling
- ✅ Improved responsive design
- ✅ Enhanced user experience with animations

## 🔮 Future Enhancements

### Planned Features
- **Real-time Messaging**: WebSocket-based chat system
- **Notifications**: Push notifications for interactions
- **Search Functionality**: User and post search
- **Post Categories**: Tagging and categorization
- **Advanced Analytics**: User engagement metrics
- **Mobile App**: React Native mobile application

### Technical Improvements
- **State Management**: Redux or Context API
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline
- **Performance**: Code splitting and optimization
- **Security**: Rate limiting and advanced security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Bootstrap team for the amazing CSS framework
- MongoDB team for the excellent database
- React team for the powerful UI library
- Express.js team for the robust backend framework

---

**SocialSphere** - Connect, Share, Explore! 🌟 