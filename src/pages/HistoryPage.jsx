import DataTable, { createTheme } from 'react-data-table-component';
import '../assets/css/CurrencyPage.scss';
import apiClient from '../shared/apiClient';
import { useEffect, useState } from 'react';
import Navbarr from '../components/Navbar/Navbarr';

const columns = [
    {
        name: 'Logs',
        selector: row => row.logs, // Ensure this matches the actual property name
        
    },
    {
        name: 'Created At',
        selector: row => new Date(row.createdAt).toLocaleString(), // Ensure this matches the actual property name
        sortable: true,
    },
];
createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');
  

export function HistoryTable() {
   
    const [history, setHistory] = useState([]);
    const fetchHistory = () => {
        apiClient.get('/currency/history').then((res) => {
            setHistory(res.data?.historyLogs);
        });
    };
    useEffect(()=>{
        fetchHistory();
    },[])

    return (
        <>
        <Navbarr/>
        
        <div className='history-table'>
            <DataTable
                title="Conversion History"
                columns={columns}
                data={history} // Pass the correct data prop
                pagination // Optional: Add pagination
                highlightOnHover // Optional: Highlight rows on hover
                striped // Optional: Add striped rows for better readability
                theme='solarized'
            />
        </div>
        </>
    );
}