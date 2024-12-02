import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router-dom';
 import { IoClose } from "react-icons/io5";
import { CgMenuLeftAlt } from "react-icons/cg";
import axios from 'axios'
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,PieChart,Pie, BarChart, Bar } from 'recharts';
const pdata = [
  {
    name: '8pm-12pm',
    student: 13,
    fees: 10
  },
  {
    name: '12pm-3am',
    student: 15,
    fees: 12
  },
  {
    name: '3am-8am',
    student: 5,
    fees: 10
  },
  {
    name: 'Java',
    student: 10,
    fees: 5
  },
  {
    name: '8am-12am',
    student: 9,
    fees: 4
  },
  {
    name: '12am-8pm',
    student: 10,
    fees: 8
  },
];
const Report = () => {
   const navigate=useNavigate();
   const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];
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
          <h1 className='text-[30px] font-[600] mb-[8px]'>Report & Analize</h1>
          <p className='text-[16px] text-neutral-600'>Whole data about your withdraw and deposit.</p>
        </div>
        <section className='pt-[30px]'>
            <section className='flex justify-center gap-[30px]'>
                <div className='w-[60%] h-full bg-white shadow-lg p-[20px]'>
                        <h1 className='text-[20px] pb-[30px]'>Today's Withdraw</h1>
                      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={pdata}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="student" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

                </div>
                 <div className='w-[60%] h-full bg-white shadow-lg p-[20px]'>
                    <h1 className='text-[20px] pb-[30px]'>Mothly Withdraw</h1>
                        <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={400}
          data={pdata}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="student" fill="#8884d8" />
          <Bar dataKey="fees" fill="#82ca9d" />
        </BarChart>
                         </ResponsiveContainer>
                </div>
            </section>
               <section className='mt-[30px] flex justify-center gap-[30px]'>
                <div className='w-[60%] h-[400px] bg-white shadow-lg p-[20px] '>
                    <h1 className='text-[20px] pb-[30px] p-[20px]'>Today's Deposit</h1>
                     <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={370}
          data={pdata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="student" fill="#8884d8" />
          <Bar dataKey="fees" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
                </div>
                <div className='w-[40%] h-[400px] bg-white shadow-lg '>
                                    <h1 className='text-[20px] pb-[30px] p-[20px]'>Monthly Deposit</h1>
                           <ResponsiveContainer width="100%" height="80%"className="p-[20px]">
        <PieChart>
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#4b7bec" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#4b7bec" label color='#3867d6'/>
        </PieChart>
      </ResponsiveContainer>
                </div>
               </section>
        </section>
       </section>
        </section>
    </section>
  )
}

export default Report