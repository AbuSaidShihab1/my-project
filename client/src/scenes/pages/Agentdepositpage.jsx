import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate  } from "react-router-dom";
import { Box, useTheme, Button, useMediaQuery } from "@mui/material";
import { useGetApiAccountBkashQuery, generalApi } from "state/api";
import Header from "components/Header";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaDollarSign } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
// import { merchantTableColumns } from "utilities/CommonUtility";
import DataGridCustomToolbarForMerchants from "components/DataGridCustomToolbarForMerchants";
import Edit from "../bkash/Edit"
import Add from "../bkash/Add";
import Swal from 'sweetalert2';
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
const Agentdepositpage = () => {
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { getAuthUser} = useContext(AuthContext);
  const authUser = getAuthUser();
  const navigate = useNavigate();
const [find_agent,setfind_agent]=useState("");

  useEffect(() => {
    if (authUser === null || authUser.role === "merchant" || authUser.role === "subadmin") {
      navigate('/login');
    }
  }, [authUser])

  const { data, isLoading, refetch } = useGetApiAccountBkashQuery();
  
  
  useEffect(() => {
    if (!isAdding && !isEditing) {
      refetch();
    }
  }, [isAdding, isEditing]);
// --------------------agent data
const [agent_deposit_info,setagent_deposit_info]=useState([]);
const [count_num,setcount_num]=useState(1)
const [orderstatus,setorderstatus]=useState(["pending", "processing", "hold", "fully paid", "partially paid", "completed", "suspended", "expired"]);

const [status,setstatus]=useState(1);
const agent_deposit_data=()=>{
       axios.get(`${process.env.REACT_APP_BASE_URL2}/agent-data`)
    .then((res)=>{
        setagent_deposit_info(res.data.agent_deposit_data);  
    }).catch((err)=>{
        console.log(err)
    })
}
// delete_agent
const delete_agent=(id)=>{
    const confirm_box=window.confirm("Are you sure?");
    if(confirm_box){
            axios.delete(`${process.env.REACT_APP_BASE_URL2}/agent-delete/${id}`)
    .then((res)=>{
        agent_deposit_data();
            toast.success("Agent has been deleted!");
    }).catch((err)=>{
        console.log(err)
    })
    }
}

// deposit status update

const handlestatus=(id,status_val)=>{
  setstatus(status+1)
         try {
            axios.put(`${process.env.REACT_APP_BASE_URL2}/agent-deposit-status/${id}`, {
            status: status_val,
          }).then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          })
          console.log(data)
        } catch (error) {
          console.log(error);
        }
}
useEffect(()=>{
 agent_deposit_data();
},[status]);
  return (
   <>
     <Box display={isNonMobile ? "flex" : "block"} sx={{display:"flex",justifyContent:'space-between'}} width="100%" height="100%">
      <Sidebar
        user={authUser || {}}
        isNonMobile={isNonMobile}
        drawerWidth="30%"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box sx={{width:"80%"}}>
        <Navbar
          user={authUser || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      {/* ------------------------agent information------------------- */}
      {
        agent_deposit_info.length > 0 ?     <section className="p-[20px] bg-[#FAFAFA]">
               <div className="flex justify-between items-center">
               <div>
                 <h1 className="text-[22px] font-[600] mb-[5px]">Agent Deposit</h1> 
                <p className="text-[16px] text-neutral-500 font-[400]">Here you can see agent deposit accept and cancel history and you can manage it.</p>
               </div>
               <Toaster/>
               <div className="flex justify-center items-center gap-[15px]">
                <button className="px-[22px] py-[12px] border-[2px] bg-white hover:text-white border-[#5D87FF] flex justify-center items-center gap-[8px] text-[15px] text-[#5D87FF] hover:bg-[#5D87FF] transition-all duration-150 cursor-pointer rounded-[5px]">Export</button>
                <button className="px-[22px] py-[14px] bg-[#5D87FF] flex justify-center items-center gap-[8px] text-[15px] text-white cursor-pointer rounded-[5px]">Create Deposit</button>
               </div>
               </div>
               {/* -----------------------------deposit box--------------- */}
                <section className="mt-[20px] grid grid-cols-4 gap-[30px] no-scrollbar">
                      <div className="bg-white rounded-[5px] p-[20px] shadow-md flex justify-start gap-[20px]">
                           <div className="w-[60px] rounded-full flex justify-center items-center text-[#5B93FF] text-[25px] h-[60px] bg-[#EEF4FF]">
                               <FaDollarSign/>
                           </div>
                           <div>
                            <h2 className="text-[22px] text-[#555555]  font-[600]">178+</h2>
                            <h4 className="text-[16px] font-[600]">Total Deposit</h4>
                           </div>
                      </div>
                        <div className="bg-white rounded-[5px] p-[20px] shadow-md flex justify-start gap-[20px]">
                           <div className="w-[60px] rounded-full flex justify-center items-center text-[#FFE192] text-[25px] h-[60px] bg-[#FFFBF0]">
                               <FaDollarSign/>
                           </div>
                           <div>
                            <h2 className="text-[22px] text-[#555555]  font-[600]">178+</h2>
                            <h4 className="text-[16px] font-[600]">Total Deposit</h4>
                           </div>
                      </div>
                        <div className="bg-white rounded-[5px] p-[20px] shadow-md flex justify-start gap-[20px]">
                           <div className="w-[60px] rounded-full flex justify-center items-center text-[#FF8F6B] text-[25px] h-[60px] bg-[#FFF4F0]">
                               <FaDollarSign/>
                           </div>
                           <div>
                            <h2 className="text-[22px] text-[#555555]  font-[600]">178+</h2>
                            <h4 className="text-[16px] font-[600]">Total Deposit</h4>
                           </div>
                      </div>
                        <div className="bg-white rounded-[5px] p-[20px] shadow-md flex justify-start gap-[20px]">
                           <div className="w-[60px] rounded-full flex justify-center items-center text-[#605BFF] text-[25px] h-[60px] bg-[#EFEEFF]">
                               <FaDollarSign/>
                           </div>
                           <div>
                            <h2 className="text-[22px] text-[#555555]  font-[600]">178+</h2>
                            <h4 className="text-[16px] font-[600]">Total Deposit</h4>
                           </div>
                      </div>
                </section>
               {/* -----------------------------deposit box--------------- */}
                   {/* ------------------agent filtering option------------ */}
               <div className="w-full flex justify-between items-center mt-[40px] py-[20px]">
                {/* -------------------agrnt fileter-------------- */}
<form className=" w-[40%]">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 t
ext-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input type="search"onChange={(e)=>{setfind_agent(e.target.value)}} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by number,name..." required />
   <div className=" absolute top-0 right-0 p-[5px] w-[20%] h-[100%] flex justify-center items-center">
    <button type="submit" className="w-[100%] h-[100%] bg-[#6A3FFF] hover:bg-blue-800 focus:ring-4 text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

   </div>
  </div>
</form>

                {/* ----------------search filed-------------- */}
             
               </div>
                   {/* ------------------agent filtering option------------ */}
                   {/* -------------------------agnet information----------------- */}

<section className="container mx-auto px-[20px] pb-[100px]">
  <div className="flex flex-col">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-[15px]">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                    <button className="flex items-center gap-x-2">
                      <span>Invoice Id</span>
                      <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                      </svg>
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Agent Number
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Payer Number
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Method
                </th>
                  <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Transictiction ID
                </th>
                 <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                 <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Status
                </th>
                       <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
       {
         agent_deposit_info.length >0 ? agent_deposit_info.filter((item)=>{
                                    if(find_agent==""){
                                        return item;
                                    }else if(item.agent_number.toLowerCase().includes(find_agent.toLocaleLowerCase()) || item.provider_name.toLowerCase().includes(find_agent.toLocaleLowerCase()) || item.payer_number.toLowerCase().includes(find_agent.toLocaleLowerCase()) || item.transiction_id.toLowerCase().includes(find_agent.toLocaleLowerCase()) || item.agent_id.toLowerCase().includes(find_agent.toLocaleLowerCase())){
                                               return item;
                                    }
                                 }).map((data,index)=>{
            return(
     <tr>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                   <NavLink to={`/agent-deposit-invoice/${data._id}`} className="hover:underline hover:text-indigo-600"> <span>#{data.invoice_id}</span></NavLink>
                  </div>
                </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                   {data.agent_number}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {data.payer_number}
                </td>
              
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">USDT</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                   {data.transiction_id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.amount}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {
                        data.status=="pending" ?  <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className="text-sm font-normal">{data.status}</h2>
                  </div>: <div className="inline-flex items-center px-3 py-1 text-green-500 rounded-full gap-x-2 bg-green-100/60 dark:bg-gray-800">
                    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className="text-sm font-normal">{data.status}</h2>
                  </div>
                    }
                 
                </td>
                <td>
                    <select name="" id="" defaultValue={data.status} onChange={(e)=>{handlestatus(data._id,e.target.value)}} className="px-[20px] py-[10px] border-none appearance-none outline-none  w-auto bg-[#5D87FF] text-white rounded-[5px]">
                      {
                        orderstatus.map((dat,i)=>{
                          return(
                            <option value={dat} key={i}>{dat}</option>
                          )
                        })
                      }
                    </select>
                </td>
              </tr>
            )
        }):<h1>Nothing is here to show!</h1>
       }
         
          
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  {/* <div className="flex items-center justify-between mt-6">
    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
      </svg>
      <span>
        previous
      </span>
    </a>
    <div className="items-center hidden md:flex gap-x-3">
      <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
      <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
    </div>
    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
      <span>
        Next
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>
    </a>
  </div> */}
</section>

                   {/* -------------------------agent information------------------- */}
         </section>:<section>
            <div>
                <h1>We do not have any agent Now!</h1>
            </div>
         </section>
      }
     
      {/* ------------------------agent information------------------- */}
      </Box>
    </Box>
   
 
   </>
  );
};

export default Agentdepositpage;
