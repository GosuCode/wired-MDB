// import cms from '../../assets/cms.png'
import { GoComment } from 'react-icons/go'
import { BsBookmark } from 'react-icons/bs'
import user from '../../assets/user.jpg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Post = () => {

    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts");
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                setBlogs(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <input type="text" name="" id=""
                onChange={(e) => setSearch(e.target.value)}
                className='border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none' />
            {blogs && blogs.filter((val) => {
                return search.toLowerCase() === ''
                    ? val
                    : val.title.toLowerCase().includes(search)
            }).map((val, i) => {
                return (
                    <div key={i} className='bg-white rounded-md shadow-md'>
                        <div key={i}>
                            <Link to={`/postById/${val.id}`}>
                                <div className='w-full'>
                                    <img src={`http://localhost:3001/${val.image}`} alt="" className='w-full h-40 md:h-[300px] rounded-t-md' />
                                </div>
                            </Link>

                            <div className='px-5 md:py-5 mb-2'>
                                <div className='flex'>
                                    <Link to={`/postById/${val.id}`}>
                                        <div className='grid items-center'>
                                            <img src={user} alt="" className='h-12 rounded-full m-1 p-1' />
                                        </div>
                                    </Link>
                                    <div className='grid items-center py-3'>
                                        <div className='text-sm font-semibold'>{val.username}</div>
                                        <span className='text-xs'>Jul 9 (13 mins ago)</span>
                                    </div>
                                </div>

                                <div className='lg:pl-10'>
                                    <div>
                                        <Link to={`/postById/${val.id}`}>
                                            <h1 className='font-bold text-lg lg:text-3xl'>
                                                {val.title}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center py-1'>
                                            <div>
                                                <GoComment />
                                            </div>
                                            <div>
                                                Add comment
                                            </div>
                                        </div>
                                        <div className='p-3'>
                                            <BsBookmark />
                                            <span>{val.Likes.length}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Post