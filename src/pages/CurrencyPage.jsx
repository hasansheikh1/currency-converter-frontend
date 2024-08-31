import React, { useEffect, useState } from 'react'
import '../assets/css/CurrencyPage.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Navbarr from '../components/Navbar/Navbarr'
import { Button, Spinner } from 'react-bootstrap';
import apiClient from '../shared/apiClient';
import toast from 'react-hot-toast';
import { HistoryTable, MyComponent } from './HistoryTable';

function CurrencyPage() {
    const [currencyCodes, setCurrencyCodes] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [convertedAmount, setConvertedAmount] = useState(0);
    const [formData, setFormData] = useState({
        amount: '',
        baseCurrency: 'EUR',
        targetCurrency: ''
    });

    const fetchCurrencyCodes = () => {
        apiClient.get('/currency/codes').then((res) => {
            setCurrencyCodes(res.data?.currencyCodes);
        });
    };

    const fetchHistory = () => {
        apiClient.get('/currency/history').then((res) => {
            setHistory(res.data?.historyLogs);
        });
    };

    useEffect(() => {
        fetchCurrencyCodes();
        fetchHistory();
    }, []);

    const handleCurrencyChange = (e) => {
        e.preventDefault();
        setIsLoading(true);
        apiClient.post('/currency', formData).then((res) => {
            setConvertedAmount(res.data?.convertedAmount);
            fetchHistory();
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            toast.error(err?.response?.data.message);
            console.log("Error", err?.response?.data.message);
        });
    };

    // Function to reset the form fields
    const resetForm = () => {
        setFormData({
            amount: '',
            baseCurrency: '',
            targetCurrency: ''
        });
        setConvertedAmount(0);
    };

    // Check if the form is complete
    const isFormComplete = formData.amount && formData.baseCurrency && formData.targetCurrency;

    return (
        <>
            <div id='main-contt' className='main-contt'>
                <Navbarr />
                <div className='currency-form-wrapper'>
                    <form onSubmit={handleCurrencyChange} className='currency-form'>
                        <div className='currency-box'>
                            <div className='currency-wrapper w-100'>
                                <div className='currency-amount w-100'>
                                    <span>
                                        <b> Amount</b>
                                    </span>
                                    <InputGroup>
                                        <InputGroup.Text>{formData?.baseCurrency || "$"}</InputGroup.Text>
                                        <Form.Control
                                            className="custom-input"
                                            aria-label="Amount (to the nearest dollar)"
                                            required
                                            value={formData.amount} // Set value to reflect current state
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                        <InputGroup.Text>.00</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className='from-currency w-100'>
                                    <span>
                                        <b> From</b>
                                    </span>
                                    <Form.Select
                                        className="custom-select"
                                        required
                                        value={formData.baseCurrency} // Set value to reflect current state
                                        onChange={(e) => setFormData({ ...formData, baseCurrency: e.target.value })}
                                    >
                                        <option value="">Select Currency</option>
                                        {currencyCodes.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                                    </Form.Select>
                                </div>
                                <div className='to-currency w-100'>
                                    <span>
                                        <b> To</b>
                                    </span>
                                    <Form.Select
                                        className="custom-select"
                                        required
                                        value={formData.targetCurrency} // Set value to reflect current state
                                        onChange={(e) => setFormData({ ...formData, targetCurrency: e.target.value })}
                                    >
                                        <option value="">Select Currency</option>
                                        {currencyCodes.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                                    </Form.Select>
                                </div>
                            </div>
                            <div className='convert-btn'>
                                <Button variant="secondary" onClick={resetForm}>
                                    Reset
                                </Button>
                                <Button variant="primary" size="lg" type='submit' disabled={!isFormComplete || isLoading}>
                                    {isLoading ? <> Convert <Spinner size='sm' as="span" animation="border" /></> : 'Convert'}
                                </Button>
                            </div>

                            <div className='converted-amount'>
                                {convertedAmount}
                            </div>
                        </div>
                    </form>
                </div>

            {/* <HistoryTable history={history}/> */}


            </div>
        </>
    );
}

export default CurrencyPage;
