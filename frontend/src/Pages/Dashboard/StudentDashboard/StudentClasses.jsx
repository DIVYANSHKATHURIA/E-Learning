import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function StudentClasses() {
    const ID = useParams();
    const [data, setdata] = useState([]);
    const [setError] = useState('');

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`/api/course/classes/student/${ID}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const user = await response.json();
            setdata(user.data.classes[0].liveClasses);
            console.log(user.data.classes[0].liveClasses);

          } catch (error) {
            setError(error.message)
          }
        };
        getData();
    },[ID]);

  return (
    <div className='ml-60 mt-12 px-8 min-h-screen'>
        <div className='mb-12'>
            <h1 className='text-[#1671D8] text-4xl font-bold mb-2'>Weekly Schedule</h1>
            <p className='text-gray-600 text-lg'>Your upcoming classes for this week</p>
        </div>

        <div className='flex gap-12 items-start'>
            {/* Weekly Classes List */}
            <div className='flex-1 max-w-2xl'>
                <h2 className='text-gray-800 text-2xl font-semibold mb-6'>Upcoming Classes</h2>
                <div className='bg-white rounded-xl shadow-lg p-6 h-[28rem] overflow-y-auto'>
                    <div className='space-y-6'>
                        {data.filter(clas => {
                          const classDate = new Date(clas.date.slice(0, 10));
                          const today = new Date();
                          const oneWeekFromNow = new Date(today);
                          oneWeekFromNow.setDate(today.getDate() + 7);

                          return classDate >= today && classDate <= oneWeekFromNow;
                        }).map((clas, index) => (
                            <div key={`${clas.timing}-${index}`} className='flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200'>
                                <img 
                                    src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
                                    alt="profile_img" 
                                    className='w-12 h-12 rounded-full border-2 border-gray-300' 
                                />
                                <div className='ml-6 flex-1'>
                                    <div className='mb-2'>
                                        <h3 className='text-xl font-bold text-gray-800'>{clas.coursename}</h3>
                                        <div className='flex items-center gap-4 mt-1'>
                                            <span className='text-gray-600 font-medium text-sm bg-white px-3 py-1 rounded-full border'>
                                                📅 {clas.date.slice(0, 10)}
                                            </span>
                                            <span className='text-gray-600 font-medium text-sm bg-white px-3 py-1 rounded-full border'>
                                                🕐 {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
                                            </span>
                                        </div>
                                    </div>
                                    <p className='text-blue-600 text-sm font-medium'>{clas.title.slice(0, 45)}...</p>
                                </div>
                                <div className='ml-4'>
                                    <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                                        clas.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        clas.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {clas.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Next Class Card */}
            <div className='w-96'>
                <h2 className='text-gray-800 text-2xl font-semibold mb-6'>Next Class</h2>
                {data[0] ? (
                    <a href={data[0]?.link} target='_blank' rel='noopener noreferrer'>
                        <div className='bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200'>
                            <div className='flex items-center justify-between mb-8'>
                                <div className='flex items-center gap-4'>
                                    <div className='bg-blue-100 p-3 rounded-full'>
                                        <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm'>🕐</div>
                                    </div>
                                    <div>
                                        <div className='text-[#4E84C1] text-xl font-bold'>
                                            {typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}
                                        </div>
                                        <div className='text-[#018280] text-2xl font-bold'>
                                            {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-green-100 p-3 rounded-full'>
                                    <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg'>📷</div>
                                </div>
                            </div>
                            
                            <div className='space-y-3'>
                                <p className='text-gray-600 text-sm font-medium uppercase tracking-wide'>Your next Class</p>
                                <h3 className='text-[#018280] text-3xl font-bold leading-tight'>{data[0]?.coursename}</h3>
                                <p className='text-gray-700 text-base leading-relaxed'>{data[0]?.title.slice(0,35)}...</p>
                            </div>
                            
                            <div className='mt-6 pt-4 border-t border-gray-200'>
                                <div className='flex items-center justify-center'>
                                    <span className='text-blue-600 font-semibold text-sm'>Click to join class →</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ) : (
                    <div className='bg-gray-100 p-8 rounded-2xl text-center'>
                        <p className='text-gray-500 text-lg'>No upcoming classes</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default StudentClasses