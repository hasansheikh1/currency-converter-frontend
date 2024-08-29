import React from 'react'
import '../assets/css/CurrencyPage.scss'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Navbarr from '../components/Navbar/Navbarr'
import { Button } from 'react-bootstrap';


function CurrencyPage() {
    return (
        <>
            <div id='main-contt' className='main-contt'>
                <Navbarr />

                <div className='currency-box'>
                    <div className='currency-wrapper w-100'>
                        <div className='currency-amount w-100'>
                            <span>
                                Amount
                            </span>
                            <InputGroup >
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control className="custom-input" aria-label="Amount (to the nearest dollar)" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div className='from-currency w-100'>
                            <span>
                                From
                            </span>
                            <Form.Select className="custom-select" >
                                <option>Large select</option>
                            </Form.Select>
                        </div>
                        <div className='to-currency w-100'>
                            <span>
                                To
                            </span>
                            <Form.Select className="custom-select" >
                                <option>Large select</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className='convert-btn'>
                        <Button variant="primary" size="lg">
                            Convert
                        </Button>
                    </div>
                </div>

            </div>


        </>
    )
}

export default CurrencyPage