import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from '../style/GlobalStyle'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import Transactions from '../pages/Transactions'
import Error404 from '../pages/Error404'
import Header from '../layouts/Header'
import Footer from '../components/Footer';

const infoFooter = {
    text: 'Copyright 2023 Argent Bank'
}

export default function Router() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path='/ArgentBank/' element={<Home />} />
                <Route path='/ArgentBank/login' element={<SignIn />} />
                <Route path='/ArgentBank/profile/:userId' element={<Profile />} />
                <Route path='/ArgentBank/profile/:userId/transactions' element={<Transactions />} />
                <Route path='*' element={<Error404 />} />
            </Routes>
            <Footer text={infoFooter.text}/>
        </BrowserRouter>
    );
}