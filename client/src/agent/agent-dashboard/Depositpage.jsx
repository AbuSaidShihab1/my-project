import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router-dom';
 import { IoClose } from "react-icons/io5";
import { CgMenuLeftAlt } from "react-icons/cg";
import axios from 'axios'
import { FiLogOut } from "react-icons/fi";
import Swal from 'sweetalert2';
import { FaCheck } from "react-icons/fa6";
import { CgMenuRightAlt } from "react-icons/cg";
import { Contextapi } from 'context/Appcontext';
import Dashboardleftside from 'components/agentcomponents/Dashboardleftside';
import Dashboradheader from 'components/agentcomponents/Dashboardheader';
import { MdContentCopy } from "react-icons/md";
import btc_img from "../../assets/bitcoin.png"
import usdt_img from "../../assets/usdt.png"
import toast, { Toaster } from 'react-hot-toast';

const Depositpage = () => {
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
    // active logout popup
    const [popup,setpopup]=useState(false);

    // ----------------------handle pre-deposit-----------
    const [provider_name,setprovider_name]=useState("bkash");
    const [deposit_name,setdeposit_name]=useState("");
    const handleprovider=()=>{
      if(provider_name=="bkash"){
             setdeposit_name("bkash")
      }else if(provider_name=="nagad"){
             setdeposit_name("nagad")
      }
    }
       const bkash_pament= async(e)=>{
        e.preventDefault();
        const {data}=await axios.post("http://localhost:6001/api/payment/bkash",{mid:"merchant1",orderId:"342sdad34234234",payerId:"3424dsd214234",amount:500,currency:"BDT",redirectUrl:"http://localhost:3000/dashboard",callbackUrl:"https://admin.eassypay.com/bkash_api"},{ withCredentials: true });
            window.location.href = data.link
        console.log(data)
    }
  
    // ----------handlecopy
    const [copy_success,setcopy_success]=useState(false);
    const handlecopy=(e)=>{
      e.preventDefault();
        navigator.clipboard.writeText(copynumber);
        setcopy_success(true);
        setTimeout(() => {
          setcopy_success(false)
        }, 2000);
    };
    // agent bkash deposit system
    // agent_number,provider_name,amount,payer_number,transition_id,user_id
    const [bkash_agent,setbkash_agent]=useState("01688494102");
    const [amount,setamount]=useState("");
    const [payer_number,setpayer_number]=useState("");
    const [transition_id,settransition_id]=useState("");
    const [errortext,seterrortext]=useState("");

      // ----------------agent deposit information
    const agent_id=agent_info._id;
    useEffect(()=>{
        setpayer_number(agent_info.phone);
    },[]);
    const bkash_deposit=(e)=>{
          e.preventDefault();
       if(bkash_agent=="" || provider_name=="" || amount=="" || payer_number=="" || transition_id==""){
                seterrortext("Please fill up your information!")
       }else if(!bkash_agent=="" || !provider_name=="" || !amount=="" || !payer_number=="" || !transition_id==""){
                axios.post(`${process.env.REACT_APP_BASE_URL2}/agent-deposit-money`,{bkash_agent,provider_name,amount,payer_number,transition_id,agent_id})
                .then((res)=>{
                    if(res.data.success==true){
                         Swal.fire({
          icon: 'success',
          title: 'Deposit',
          text:res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
                    }else{
                              Swal.fire({
          icon: 'error',
          title: 'Deposit',
          text:res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
                    }
                }).catch((err)=>{
                    toast.error(err.name)
                })
       }
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
                <section className={deposit_name=="" ? 'w-full h-auto bg-white p-[30px] border-[1px] border-[#eee] rounded-[5px]':"hidden"}>
                      <h1 className='text-[30px] font-[600] mb-[10px]'>Deposit</h1>
                      <div>
                        <h2 className='text-[18px] mb-[10px] text-neutral-600'>Please choose a pament method</h2>
                      <section className='flex justify-start items-center gap-[15px] mb-[20px]'>
                              <div onClick={()=>{setprovider_name("nagad")}} className={provider_name=="bkash" ?  'w-[100px] h-[100px] flex cursor-pointer justify-center items-center border-[3px] border-neutral-400 rounded-[5px]': 'w-[100px] h-[100px] flex cursor-pointer justify-center items-center border-[3px] border-[#fbc531] rounded-[5px]'}>
                                      <img className='w-[50px]' src={btc_img} alt="" />
                               </div>
                              <div onClick={()=>{setprovider_name("bkash")}} className={provider_name=="nagad" ? 'w-[100px] h-[100px] flex cursor-pointer justify-center items-center  border-[3px] border-neutral-400 rounded-[5px]':'w-[100px] h-[100px] flex cursor-pointer justify-center items-center  border-[3px] border-[#29A27D] rounded-[5px]'}>
                                                      <img className='w-[50px]' src={usdt_img} alt="" />
                                     </div>
                      </section>
                        <div className='flex justify-center items-center gap-[15px] mb-[15px]'>
                                <div className='w-[50%]'>
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Agent Number</label><br />
                                        <input type="number"placeholder='Enter agent number'value={bkash_agent} className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-800 outline-[#FFCE01]' />
                                   </div>
                                          <div className='w-[50%]'>
                              <label htmlFor=""className='text-[16px] text-neutral-700'>Payer Name</label><br />
                         <input type="text"placeholder='Enter your name'value="Rahim"disabled className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-800 outline-[#FFCE01]'value={agent_info.name} disabled />
                                             </div>
                        </div>
                                  <button onClick={handleprovider} className='w-[100%] h-[55px] bg-[#FFCE01] text-[17px] text-[] font-[600]'>Deposit</button>
                    
                      </div>
                </section>
                {/* -----------------deposit box--------------- */}
                <section className={deposit_name=="" ? "hidden":'w-[70%] m-auto h-auto bg-white  p-[30px] border-[1px] border-[#eee] border-dashed'}>
                 <div className='flex justify-between items-center '>
                                                         <h1 className='text-[30px] font-[600] mb-[10px]'>Deposit Information</h1>
                                                         <div className='p-[10px] border-[2px] border-[#eee] rounded-[5px]'>
                                                           {
                                                            deposit_name=="bkash"?   <img className='w-[70px]' src={usdt_img} alt="" />:  <img className='w-[70px]'  src={btc_img} alt="" />
                                                           }
                                                         </div>
                 </div>
                         <form action=""onSubmit={bkash_deposit} className={deposit_name=="bkash" ? "":"hidden"}>
                           <div className='w-[100%] mb-[20px]'>
                                         <label htmlFor=""className='text-[17px] text-neutral-700'>USDT Agent Number</label><br />
                                          <div className="w-full h-[55px] relative mt-[10px]">
                                            <input type="number"placeholder='Agent Number'className='w-full  appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01] bg-[whitesmoke]'disabled value={copynumber} />
                                             <button onClick={handlecopy} className={copy_success ? "absolute top-0 right-0 w-[10%] h-[55px] bg-white rounded-none text-[35px] border-[1px] border-[#eee] flex justify-center items-center ":"absolute top-0 right-0 w-[10%] h-[55px] bg-[#d1d8e0] rounded-none text-[25px] flex justify-center items-center "} >
                                              {
                                                copy_success ? <FaCheck color="#26de81"/> :<MdContentCopy/>
                                              }
                                              </button>
                                          </div>
                                         
                                          </div>
                            <div  className="mb-[15px] flex justify-center items-center gap-[15px]">
                               <div className='w-[50%]'>
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Deposit Amount</label><br />
                                            <input type="number"onChange={(e)=>{setamount(e.target.value)}} placeholder='$ Amount'className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                          </div>
                                          <div className='w-[50%]'>
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Prrovider Name</label><br />
                                            <input type="text"placeholder='Provider Name'disabled value="USDT" className='w-full mt-[5px] bg-[whitesmoke] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                          </div>
                            </div>
                                         <div className="mb-[15px]">
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Payer Number</label><br />
                                        <input type="number"placeholder='Payer Number'value={payer_number} onChange={(e)=>{setpayer_number(e.target.value)}} className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                             </div>
                                            <div className="mb-[15px]">
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Transiction ID</label><br />
                                        <input type="text"placeholder='Transiction ID'onChange={(e)=>{settransition_id(e.target.value)}} className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                         </div>
                       <p className='text-[18px] pt-[10px] text-red-600'>{errortext}</p>

                                        <button className='w-[100%] h-[55px] bg-[#FFCE01] text-[17px] text-[] font-[600]'>Confirm</button>
                        </form>
                         <form action=""className={deposit_name=="nagad" ? "":"hidden"}>
                                       <div className='w-[100%] mb-[20px]'>
                                         <label htmlFor=""className='text-[17px] text-neutral-700'>BTC Agent Number</label><br />
                                          <div className="w-full h-[55px] relative mt-[10px]">
                                            <input type="number"placeholder='Agent Number'className='w-full  appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01] bg-[whitesmoke]'disabled value={copynumber} />
                                             <button onClick={handlecopy} className={copy_success ? "absolute top-0 right-0 w-[10%] h-[55px] bg-white rounded-none text-[35px] border-[1px] border-[#eee] flex justify-center items-center ":"absolute top-0 right-0 w-[10%] h-[55px] bg-[#d1d8e0] rounded-none text-[25px] flex justify-center items-center "} >
                                              {
                                                copy_success ? <FaCheck color="#26de81"/> :<MdContentCopy/>
                                              }
                                              </button>
                                          </div>
                                         
                                          </div>
                            <div  className="mb-[15px] flex justify-center items-center gap-[15px]">
                               <div className='w-[50%]'>
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Deposit Amount</label><br />
                                            <input type="number"placeholder='Amount'className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                          </div>
                                          <div className='w-[50%]'>
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Provider Name</label><br />
                                            <input type="text"placeholder='Provider Name'disabled value="BTC" className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] bg-[whitesmoke] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                          </div>
                            </div>
                                         <div className="mb-[15px]">
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Payer Number</label><br />
                                        <input type="number"placeholder='Payer Number'value={payer_number} onChange={(e)=>{setpayer_number(e.target.value)}} className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                             </div>
                                            <div className="mb-[15px]">
                                         <label htmlFor=""className='text-[16px] text-neutral-700'>Transiction ID</label><br />
                                        <input type="text"placeholder='Transiction ID'className='w-full mt-[5px] appearance-none border-[1px] border-[#eee] rounded-[2px] h-[55px] p-[15px] text-[17px] text-neutral-600 outline-[#FFCE01]' />
                                         </div>
                                  <button className='w-[100%] h-[55px] bg-[#FFCE01] text-[17px] text-[] font-[600]'>Confirm</button>
                        </form>
                </section>

       </section>
        </section>
    </section>
  )
}

export default Depositpage