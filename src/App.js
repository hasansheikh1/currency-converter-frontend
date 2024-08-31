
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import CurrencyPage from './pages/CurrencyPage';
import Login from './pages/Login';
import CustomToaster from './components/Toaster/CustomToaster';
import { HistoryTable } from './pages/HistoryPage';

function App() {
    return (
        <div className="App">
            <CustomToaster/>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/home' element={
                        <ProtectedRoute>
                            <CurrencyPage />
                        </ProtectedRoute>
                    } />
                     <Route exact path='/history' element={
                        <ProtectedRoute>
                            <HistoryTable />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

const ProtectedRoute = ({ children }) => {

    // const { token } = useAuth();
    // console.log("dd", token)
    const token = sessionStorage.getItem('auth_token');

    if (!token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }
    else {

        return children;
    }
}

export default App;
