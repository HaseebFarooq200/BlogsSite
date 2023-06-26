import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserNavbar from './Components/UserPanel/Navbar.jsx';
import UserHeader from './Components/UserPanel/Header.jsx';
import UserHome from './Components/UserPanel/Home.jsx';
import UserNews from './Components/UserPanel/News.jsx'
import UserFinance from './Components/UserPanel/Finance.jsx'
import UserSports from './Components/UserPanel/Sports.jsx'
import UserEntertainment from './Components/UserPanel/Entertainment.jsx'
import UserLife from './Components/UserPanel/Life.jsx'
import UserShopping from './Components/UserPanel/Shopping.jsx'
import UserSignin from './Components/UserPanel/Signin.jsx'
import UserSignout from './Components/UserPanel/Signout.jsx'
import UserRegister from './Components/UserPanel/Register.jsx'
import UserBlogPage from './Components/UserPanel/BlogPage.jsx'
import AdminHome from './Components/AdminPanel/Home.jsx'
import AdminBlogs from './Components/AdminPanel/Blogs.jsx'
import AdminUsers from './Components/AdminPanel/Users.jsx'
import AdminDashboard from './Components/AdminPanel/Dashboard.jsx'
import AdminNewBlog from './Components/AdminPanel/NewBlog.jsx'
import AdminSingleBlog from './Components/AdminPanel/SingleBlog.jsx'
import AdminUpdateBlog from './Components/AdminPanel/UpdateBlog.jsx'
import Dashboard from './Components/UserPanel/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <UserNavbar />
        <UserHeader />
        <Routes>
          <Route path='/' element={<UserHome />} />
          <Route path='/news' element={<UserNews />} />
          <Route path='/finance' element={<UserFinance />} />
          <Route path='/sports' element={<UserSports />} />
          <Route path='/entertainment' element={<UserEntertainment />} />
          <Route path='/life' element={<UserLife />} />
          <Route path='/shopping' element={<UserShopping />} />
          <Route path='/signin' element={<UserSignin />} />
          <Route path='/signout' element={<UserSignout />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/blogpage' element={<UserBlogPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/adminhome' element={<AdminHome />} >
            <Route path=':/dashboard' element={<AdminDashboard />} />
            <Route path=':/blogs' element={<AdminBlogs />} />
            <Route path=':/users' element={<AdminUsers />} />
            <Route path=':/newblog' element={<AdminNewBlog />} />
            <Route path=':/singleblog' element={<AdminSingleBlog />} />
            <Route path=':/updateblog' element={<AdminUpdateBlog />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
