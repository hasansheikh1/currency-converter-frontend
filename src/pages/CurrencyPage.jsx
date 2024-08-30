import React, { useEffect, useState } from 'react'
import '../assets/css/CurrencyPage.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Navbarr from '../components/Navbar/Navbarr'
import { Button } from 'react-bootstrap';
import apiClient from '../shared/apiClient';


function CurrencyPage() {
    const [currencyCodes, setCurrencyCodes] = useState([])
    const [history, setHistory] = useState([])

    const [convertedAmount, setConvertedAmount] = useState(0)
    const [formData, setFormData] = useState({
        amount: '',
        baseCurrency: '',
        targetCurrency: ''
    })

    const fetchCurrencyCodes = () => {
        apiClient.get('/currency/codes').then((res) => {
            setCurrencyCodes(res.data?.currencyCodes)
        })
    }
    const fetchHistory = () => {
        apiClient.get('/currency/history').then((res) => {
            setHistory(res.data?.historyLogs)
        })
    }

    useEffect(() => {
        fetchCurrencyCodes();
        fetchHistory()
    }, [])

    const handleCurrencyChange = (e) => {
        e.preventDefault();
        console.log("e", formData)
        apiClient.post('/currency', formData).then((res) => {
            setConvertedAmount(res.data?.convertedAmount)
            fetchHistory()
        })
    }

    return (
        <>
            <div id='main-contt' className='main-contt'>
                <Navbarr />

                <form onSubmit={handleCurrencyChange}>
                    <div className='currency-box'>
                        <div className='currency-wrapper w-100'>
                            <div className='currency-amount w-100'>
                                <span>
                                    Amount
                                </span>
                                <InputGroup >
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control className="custom-input" aria-label="Amount (to the nearest dollar)" required onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='from-currency w-100'>
                                <span>
                                    From
                                </span>
                                <Form.Select className="custom-select" required
                                    onChange={(e) => setFormData({ ...formData, baseCurrency: e.target.value })}
                                >
                                    {currencyCodes.map(cur => <option key={cur}>{cur}</option>)}
                                </Form.Select>
                            </div>
                            <div className='to-currency w-100'>
                                <span>
                                    To
                                </span>
                                <Form.Select
                                    className="custom-select"
                                    required
                                    onChange={(e) => setFormData({ ...formData, targetCurrency: e.target.value })}
                                >
                                    {currencyCodes.map(cur => <option key={cur}>{cur}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                        <div className='convert-btn'>
                            {convertedAmount}
                            <Button variant="primary" size="lg" type='submit'>
                                Convert
                            </Button>
                        </div>
                    </div>
                </form>

                <table style={{ background: '#fff' }}>
                    <thead>
                        <tr>
                            <th>logs</th>
                            <th>created_at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((his, index) => (
                            <tr key={index}>
                                <td>{his?.logs}</td>
                                <td>{his?.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


        </>
    )
}

export default CurrencyPage