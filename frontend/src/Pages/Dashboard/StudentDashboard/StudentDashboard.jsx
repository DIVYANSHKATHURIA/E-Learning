import React, { useEffect, useState } from 'react';
import teachingImg from '../../Images/Teaching.svg';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import logo from '../../Images/logo.svg';

function StudentDashboard() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);

  const Handlelogout = async () => {
    const response = await fetch(`/api/student/logout`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    if (result.statusCode === 200) {
      navigator('/');
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Student/StudentDocument/${ID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Navbar */}
      <nav className='bg-white/95 backdrop-blur-md px-6 lg:px-12 py-5 flex justify-between items-center border-b border-gray-200 shadow-lg sticky top-0 z-50'>
        <NavLink to="/" className="group">
          <div className='flex items-center gap-4'>
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <img src={logo} className="w-10 h-10 filter brightness-0 invert" alt="logo" />
            </div>
            <h1 className='text-2xl lg:text-3xl text-[#0D286F] font-bold bg-gradient-to-r from-[#0D286F] to-[#008280] bg-clip-text text-transparent'>
              DTU E-Learning
            </h1>
          </div>
        </NavLink>
        
        <button
          onClick={Handlelogout}
          className='bg-gradient-to-r from-[#0D286F] to-[#143C8C] text-white py-3 px-8 rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 font-semibold'
        >
          Logout
        </button>
      </nav>

      {/* Enhanced Welcome Banner */}
      <div className='bg-gradient-to-r from-[#E6F0FB] via-blue-50 to-[#F0F9FF] relative overflow-hidden'>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/20 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className='flex flex-col lg:flex-row justify-between items-center px-6 lg:px-12 py-16 lg:py-20 relative z-10'>
          <div className='text-center lg:text-left mb-8 lg:mb-0'>
            <h1 className='text-4xl lg:text-6xl font-bold mb-6 leading-tight'>
              <span className='text-[#0D286F]'>Welcome to </span>
              <span className='text-[#008280] block lg:inline'>DTU E-Learning</span>
            </h1>
            <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg inline-block'>
              <h3 className='text-2xl lg:text-3xl font-semibold text-[#0D286F]'>
                {data.Firstname} {data.Lastname}
              </h3>
              <p className='text-gray-600 mt-2'>Student Dashboard</p>
            </div>
          </div>
          <div className='relative'>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
            <img src={teachingImg} alt="teaching" className="relative z-10 w-80 lg:w-96 drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Enhanced Layout */}
      <div className='flex min-h-[calc(100vh-24rem)]'>
        {/* Enhanced Sidebar */}
        <aside className='bg-white/95 backdrop-blur-md shadow-xl w-72 min-h-full border-r border-gray-200'>
          {/* Profile Section */}
          <div className='p-8 border-b border-gray-100'>
            <div className='flex flex-col items-center gap-4'>
              <div className="relative">
                <img 
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
                  alt="profile_img" 
                  className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-lg" 
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className='text-center'>
                <p className='text-[#0D286F] font-bold text-xl'>{data.Firstname} {data.Lastname}</p>
                <p className='text-gray-500 text-sm'>Student</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className='p-6'>
            <h3 className='text-gray-500 font-semibold text-sm uppercase tracking-wider mb-4'>Navigation</h3>
            <div className='flex flex-col gap-2'>
              <NavLink
                to={`/Student/Dashboard/${ID}/Search`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-[#0D286F] to-[#143C8C] text-white rounded-xl p-4 font-semibold shadow-lg transform scale-105 transition-all duration-300"
                    : "text-[#0D286F] hover:bg-blue-50 rounded-xl p-4 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  Teacher
                </div>
              </NavLink>
              <NavLink
                to={`/Student/Dashboard/${ID}/Classes`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-[#0D286F] to-[#143C8C] text-white rounded-xl p-4 font-semibold shadow-lg transform scale-105 transition-all duration-300"
                    : "text-[#0D286F] hover:bg-blue-50 rounded-xl p-4 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  Classes
                </div>
              </NavLink>
              <NavLink
                to={`/Student/Dashboard/${ID}/Courses`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-[#0D286F] to-[#143C8C] text-white rounded-xl p-4 font-semibold shadow-lg transform scale-105 transition-all duration-300"
                    : "text-[#0D286F] hover:bg-blue-50 rounded-xl p-4 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                  Courses
                </div>
              </NavLink>
            </div>
          </div>

          {/* Quick Stats */}
          
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10 flex items-center justify-center h-full p-12">
            <div className="text-center max-w-2xl">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0D286F] to-[#008280] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D286F] mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Select an option from the sidebar to begin your educational journey. 
                Explore courses, join classes, or connect with teachers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#0D286F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0D286F] mb-2">Find Teachers</h3>
                  <p className="text-gray-600 text-sm">Connect with expert educators</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#008280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0D286F] mb-2">Join Classes</h3>
                  <p className="text-gray-600 text-sm">Attend live interactive sessions</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0D286F] mb-2">Browse Courses</h3>
                  <p className="text-gray-600 text-sm">Explore comprehensive curricula</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;