import React, { useContext, useEffect,useState } from 'react'
import { PiWechatLogoFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { RxEnterFullScreen } from "react-icons/rx";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { NavLink, useParams } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { Contextapi } from '../../context/Appcontext';
import { FaBangladeshiTakaSign } from "react-icons/fa6"
import { PiCurrencyDollarBold } from "react-icons/pi";
import wallet_img from "../../assets/wallet.png"
import axios from "axios"
const Dashboradheader = ()=> {
    const {activesidebar,setactivesidebar,activetopbar,setactivetopbar}=useContext(Contextapi);
    function handlesidebar(){
        setactivesidebar(!activesidebar)
    }
    const agent_info=JSON.parse(localStorage.getItem("agent_info"));
   const [total_amount_of_deposit,settotal_amount_of_deposit]=useState();
    useEffect(()=>{
       function agent_depositinfo(){
        axios.get(`http://localhost:6001/agent-deposit/${agent_info._id}`)
        .then((res)=>{
          settotal_amount_of_deposit(res.data.total_amount_of_deposit)
        }).catch((err)=>{
          console.log(err)
        })
       }
       agent_depositinfo();
       console.log(total_amount_of_deposit)
    },[]);
  return (
    <header className='w-full font-poppins sticky z-[1000000] top-0 left-0  h-[12vh] xl:h-[10vh] px-[20px] md:px-[30px] py-[10px] border-b-[1px] border-[#eee] shadow-sm flex bg-white justify-between items-center'>
       <div className='w-full flex justify-between items-center gap-[20px]'>
         <div className="cursor-pointer text-[28px]"onClick={handlesidebar}>
        <CgMenuLeftAlt/>
        </div>
        <div className='flex justify-center items-center gap-[10px]'>
                 <div className='flex justify-center items-center gap-[10px]'>
                  <h2 className='text-[20px] font-[600]'>{agent_info.name}</h2>
                     <div className='bg-[#FFCE01] cursor-pointer h-[6vh] flex justify-center items-center  rounded-[3px] p-[10px]'>
                            <FaUser className='text-[22px]'/>
                     </div>
                 </div>
          <div className='bg-white  border-[1px] border-[#eee] px-[30px] py-[8px] rounded-[4px]'>
            <div >
              <h2 className='flex justify-start items-center gap-[10px] cursor-pointer text-black text-[20px] font-[500]'>
                <PiCurrencyDollarBold/>:
                <span >{total_amount_of_deposit}</span>
              </h2>
            </div>
          </div>
    
          {/* -------profile--------- */}
          <NavLink to="/agent-deposit-page">
             <div className='bg-[#FFCE01] text-white h-[6vh]  cursor-pointer flex justify-center items-center rounded-[3px] p-[10px]'>
                <img className='w-[30px]' src={wallet_img} alt="" />
           </div>
          </NavLink>
    
        
        </div>
       </div>
  
    </header>
  )
}

export default Dashboradheader