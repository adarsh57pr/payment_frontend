
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentRecord() {
    const data = useLocation();
    const memberData = data.state;
    // console.log(memberData);
    const navigate = useNavigate()

    const reasonRef = useRef();
    const modeRef = useRef();
    const [paymentType, setPaymentType] = useState('select');
    const [financialYear, setFinancialYear] = useState('select');
    const [paymentRecord, setPaymentRecord] = useState([''])
    // console.log(paymentRecord)

    const handleRecordPayment = async () => {
        const PaymentReason = reasonRef.current ? reasonRef.current.value : '';
        const PaymentMode = modeRef.current ? modeRef.current.value : '';

        const PaymentType = paymentType || 'select';
        const FinancialYear = financialYear || 'select';

        if (PaymentReason === "select" || !PaymentReason) {
            alert("Please select a valid payment reason.");
            return;
        }
        if (PaymentMode === "select" || !PaymentMode) {
            alert("Please select a valid payment mode.");
            return;
        }
        if (PaymentType === "select" || !PaymentType) {
            alert("Please select a valid payment type.");
            return;
        }
        if (FinancialYear === "select" || !FinancialYear) {
            alert("Please select a valid financial year.");
            return;
        }

        const UserId = memberData ? memberData[0].Id : null;

        const obj = {
            PaymentReason,
            PaymentMode,
            PaymentType,
            FinancialYear,
            UserId,
        };
        try {
            const res = await axios.post('http://localhost:5000/paymentRecord', obj);
            // console.log('Response:', res.data);
        } catch (error) {
            console.error('Error recording payment:', error.res ? error.res.data : error.message);
            alert('An error occurred while recording the payment');
        }
        // console.log('Sending data:', obj); // Log the data you're sending
        try {
            const res = await axios.get(`http://localhost:5000/paymentRecord`, { params: obj })
            let data = res.data
            setPaymentRecord(data)
            navigate('/pdf',{state:data})
        } catch (error) {
            console.error('Error fetching payment record:', error.res ? error.res.data : error.message);
            alert('An error occurred while fetching the payment');
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center mt-8 max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#333]">
                <div>
                    <p>Payment Reason</p>
                    <select ref={reasonRef} className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full">
                        <option value="select">Select a Reason</option>
                        <option value="MemberShip">MemberShip</option>
                        <option value="NonMember">NonMember</option>
                    </select>
                </div>
                <div>
                    <p>Payment Type</p>
                    <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full">
                        <option value="select">Select a Type</option>
                        <option value="Default">Default</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <p>Financial Year</p>
                    <select value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full">
                        <option value="select">Select Year</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div>
                    <p>Payment Mode</p>
                    <select ref={modeRef} className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full">
                        <option value="select">Select a Mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Check">Check</option>
                    </select>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg shadow-lg">
                    {memberData && memberData.length > 0 && (
                        <table className=''>
                            <tbody>
                                <tr>
                                    <td className='w-full'>Admission Fee</td>
                                    <td className=' w-full text-end'>100</td>
                                </tr>
                                <tr>
                                    <td className='w-full'>Membership Fee</td>
                                    <td className=' w-full text-end'>1000</td>
                                </tr>
                                <tr>
                                    <td className='w-full'>CGST</td>
                                    <td className=' w-full text-end'>300</td>
                                </tr>
                                <tr>
                                    <td className='w-full'>SGST</td>
                                    <td className=' w-full text-end'>555</td>
                                </tr>
                                <tr>
                                    <td className='w-full'>Full Amount</td>
                                    <td className=' w-full text-end'>3000</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="m-auto">
                    <button onClick={handleRecordPayment} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white font-semibold">
                        Record Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentRecord;
