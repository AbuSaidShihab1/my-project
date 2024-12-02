import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router-dom';
 import { IoClose } from "react-icons/io5";
import { CgMenuLeftAlt } from "react-icons/cg";
import axios from 'axios'
import Swal from 'sweetalert2';
import { BiSend } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { CgMenuRightAlt } from "react-icons/cg";
import { Contextapi } from 'context/Appcontext';
import Dashboardleftside from 'components/agentcomponents/Dashboardleftside';
import Dashboradheader from 'components/agentcomponents/Dashboardheader';
import { MdContentCopy } from "react-icons/md";
import btc_img from "../../assets/bitcoin.png"
import usdt_img from "../../assets/usdt.png"
import toast, { Toaster } from 'react-hot-toast';

const Ticket = () => {
   const navigate=useNavigate();
       const agent_info=JSON.parse(localStorage.getItem("agent_info"));
     const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
     const [showmodal,setmodal]=useState(false);
     const [copynumber,setcopynumber]=useState("01688494105")
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
        useEffect(()=>{
     window.addEventListener("scroll",()=>{
      if(window.scrollY > 100){
             setactivetopbar(true)
      }else{
             setactivetopbar(false)
      }
     })
   },[]);
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
// ----------------create ticket----------
const [message,setmessage]=useState("");

const create_ticket=(e)=>{
  e.preventDefault();
       axios.post(`${process.env.REACT_APP_BASE_URL2}/agent-ticket`,{message,agent_id:agent_info._id})
        .then((res)=>{
            Swal.fire({
          icon: 'success',
          title: 'Ticket',
          text:res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        }).catch((err)=>{
          console.log(err)
        })
}
const [ticket_data,setticket_data]=useState([]);
      function ticket_information(){
        axios.get(`${process.env.REACT_APP_BASE_URL2}/agent-ticket/${agent_info._id}`)
        .then((res)=>{
          setticket_data(res.data.ticket)
        }).catch((err)=>{
          console.log(err)
        })
       }
    useEffect(()=>{
       ticket_information();
    },[]);

  return (
    <section className='w-full h-[100vh] flex font-poppins'>
        <section className={activesidebar ? 'lg:w-[7%] h-[100vh] transition-all duration-300 overflow-hidden':'w-0 md:w-[20%] transition-all duration-300 h-[100vh]'}>
            <Dashboardleftside/>
            <Toaster/>
        </section>
        <section className={activesidebar ? 'w-[100%] lg:w-[93%] h-[100vh] bg-[#EFEFFD] overflow-y-auto transition-all duration-300':' transition-all bg-[#EFEFFD] duration-300 w-[100%] overflow-y-auto md:w-[85%] h-[100vh]'}>
        <Dashboradheader/> 
       <section className='w-[100%] m-auto py-[20px] xl:py-[20px] px-[10px] lg:px-[20px]'>          
          <div>
             <h1 className='text-[30px] font-[600] mb-[8px]'>Create Ticket</h1>
             <p className='text-[16px] text-neutral-600'>If you face any problem create a ticket fro support.</p>
        </div>

        {/* -----------------create support system----------------- */}
       <section className="mt-[10px] relative">
  <div className="w-full max-w-7xl   mx-auto">
    <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
      <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
        {/* ------------------ticket box---------------- */}
        <div className="w-full relative flex justify-between gap-2">
           <form action="" onSubmit={create_ticket} className='w-full'>
            <textarea name="" id=""onChange={(e)=>{setmessage(e.target.value)}} className="w-full py-3 px-5 h-[200px] rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed" placeholder="Write your message here...." ></textarea>
            <button className='px-[40px] flex justify-center mt-[15px] items-center gap-[10px] py-[13px] w-auto bg-[#4F46E5] text-[17px] text-white'>Submit <BiSend className='text-[22px]'/></button>
           </form>
        </div>
        {/* ------------------ticket box---------------- */}
        <div className="w-full flex-col justify-start items-start gap-8 flex">
          <div className="w-full flex-col justify-start items-end gap-5 flex">
            {
              ticket_data.map((data)=>{
       return(
         <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <img className="rounded-full object-cover" src="https://images.pexels.com/photos/29522759/pexels-photo-29522759/free-photo-of-casual-outdoor-portrait-of-a-sunglasses-wearing-man.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Jenny wilson image" />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{agent_info.name}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300" />
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{data.message}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">No Replies</h5>
                  </div>
                </div>
           
              </div>
            </div>
       )
              })
            }
     
            {/* <div className="w-full lg:pl-60 md:pl-20 sm:pl-10 pl-7 flex-col justify-start items-end gap-2.5 flex">
              <div className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                  <div className="w-full justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                      <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                        <img className="rounded-full object-cover" src="https://pagedone.io/asset/uploads/1710225753.png" alt="Kevin Patel image" />
                      </div>
                      <div className="flex-col justify-start items-start gap-1 inline-flex">
                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">Admin</h5>
                        <h6 className="text-gray-500 text-xs font-normal leading-5">60 mins ago
                        </h6>
                      </div>
                    </div>
                    <div className="w-6 h-6 relative">
                      <div className="w-full h-fit flex">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">
                          </div>
                          <button id="dropdown-button" data-target="dropdown-2" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                              <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </button>
                          <div id="dropdown-2" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm font-normal leading-snug">Absolutely! I was
                    amazed at how much they grew throughout the story. The way the author
                    portrayed their struggles and triumphs was truly inspiring.</p>
                </div>
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-4 flex">
                    <div className="justify-start items-center gap-1.5 flex">
                      <a href>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                          <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </a>
                      <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                    </div>
             
                  </div>
             
                </div>
              </div>
            </div>
    <div className="w-full lg:pl-60 md:pl-20 sm:pl-10 pl-7 flex-col justify-start items-end gap-2.5 flex">
              <div className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                  <div className="w-full justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                      <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                        <img className="rounded-full object-cover" src="https://pagedone.io/asset/uploads/1710225753.png" alt="Kevin Patel image" />
                      </div>
                      <div className="flex-col justify-start items-start gap-1 inline-flex">
                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">Admin</h5>
                        <h6 className="text-gray-500 text-xs font-normal leading-5">60 mins ago
                        </h6>
                      </div>
                    </div>
                    <div className="w-6 h-6 relative">
                      <div className="w-full h-fit flex">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">
                          </div>
                          <button id="dropdown-button" data-target="dropdown-2" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                              <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                          </button>
                          <div id="dropdown-2" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm font-normal leading-snug">Absolutely! I was
                    amazed at how much they grew throughout the story. The way the author
                    portrayed their struggles and triumphs was truly inspiring.</p>
                </div>
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-4 flex">
                    <div className="justify-start items-center gap-1.5 flex">
                      <a href>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                          <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </a>
                      <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                    </div>
             
                  </div>
             
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

                                            
       </section>
        </section>
    </section>
  )
}

export default Ticket