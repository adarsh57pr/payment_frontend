
import React, { useRef, useState } from "react";
import axios from 'axios';
import { Modal } from 'antd';
import { useNavigate } from "react-router-dom";

function MemberDrtails() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState('')
    const navigate = useNavigate()
    // console.log(data)
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        navigate('/payment', { state: data })
    };

    const mobileRef = useRef();
    const memberIdRef = useRef();

    const handleSearch = async () => {
        let MembershipId = memberIdRef.current.value;
        let PhoneNumber = mobileRef.current.value;

        if (!MembershipId && !PhoneNumber) {
            console.error('Please provide either MembershipId or PhoneNumber');
            return;
        }
        try {
            const params = {};
            if (MembershipId) {
                params.membershipId = MembershipId;
            }
            if (PhoneNumber) {
                params.phoneNumber = PhoneNumber;
            }
            const response = await axios.get('http://localhost:5000/getUserProfileData', { params });
            // console.log('User profile data:', response.data);
            setData(response.data)
            setIsModalOpen(true);
            clearData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const clearData = () => {
        memberIdRef.current.value = ''
        mobileRef.current.value = ''
    }

    return (
        <div className="mt-10">
            <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#333]">
                <div>
                    <input
                        ref={mobileRef}
                        type="tel"
                        placeholder="Enter The Phone number"
                        className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                    />
                </div>
                <span className="m-auto">Or</span>
                <div>
                    <input
                        ref={memberIdRef}
                        type="tel"
                        placeholder="Enter the memberId"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                    />
                </div>
                <div className="m-auto">
                    <button
                        className="bg-blue-500 text-white px-4 rounded-md ms-4 w-max py-2 hover:bg-blue-700"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <Modal title="Member Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                    {/* okButtonProps={{style:{display:'none'}}} */}
                    <div className="">
                        {
                            data ? data.map((ele, index) => {
                                return <div key={index} className="">
                                    <p><span className='font-bold'>Unit Name :</span> <span>{ele.UnitName}</span></p>
                                    <p><span className='font-bold'>GSTIN :</span> <span>{ele.GSTIN}</span></p>
                                    <p><span className='font-bold'>First Name :</span> <span>{ele.FirstName}</span></p>
                                    <p><span className='font-bold'>Last Name :</span> <span>{ele.LastName}</span></p>
                                    <p><span className='font-bold'>Chapter Name :</span> <span>{ele.name}</span></p>
                                </div> 
                            }) : ''
                        }
                    </div>
                    <button></button>
                </Modal>

            </div>
        </div>
    );
}

export default MemberDrtails;
