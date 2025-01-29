import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MemberDrtails from './pages/MemberDetails';
import PaymentRecord from './pages/PaymentRecord';
import RecordPaymentPDF from './pages/RecordPaymentPDF';
// import PDF from './pages/Pdf';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MemberDrtails/>} />
          <Route path='/payment' element={<PaymentRecord/>} />
          <Route path='/pdf' element={<RecordPaymentPDF/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
