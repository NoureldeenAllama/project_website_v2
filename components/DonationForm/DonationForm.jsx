import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [donationType, setDonationType] = useState('Money');
    const [amount, setAmount] = useState('');
    const [foodName, setFoodName] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [message, setMessage] = useState('');

    const resetForm = () => {
        setAmount('');
        setFoodName('');
        setFoodQuantity('');
    };

    const validate = () => {
        if (donationType === 'Money') {
            if (!amount || Number(amount) <= 0) {
                return 'Please enter an amount greater than 0 EGP.';
            }
        } else {
            if (!foodName.trim()) {
                return 'Please enter the food name.';
            }
            if (!foodQuantity || Number(foodQuantity) <= 0) {
                return 'Please enter a quantity greater than 0.';
            }
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationMessage = validate();
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }

        const payload = {
            donationType,
            amount: donationType === 'Money' ? Number(amount) : null,
            foodName: donationType === 'Food' ? foodName : null,
            foodQuantity: donationType === 'Food' ? Number(foodQuantity) : null,
        };

        console.log('Donation submitted:', payload);
        setMessage('Thank you for supporting our community!');
        resetForm();
    };

    return (
        <div className='donation-form' id='donation'>
            <h2>Make a Donation</h2>
            <p>Support our efforts with a monetary or food donation.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="donationType">Donation type</label>
                <select
                    id="donationType"
                    value={donationType}
                    onChange={(event) => setDonationType(event.target.value)}
                >
                    <option value="Money">Money</option>
                    <option value="Food">Food</option>
                </select>

                {donationType === 'Money' ? (
                    <div className="form-field">
                        <label htmlFor="moneyAmount">Amount in EGP</label>
                        <input
                            type="number"
                            id="moneyAmount"
                            placeholder='Amount in EGP'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </div>
                ) : (
                    <>
                        <div className="form-field">
                            <label htmlFor="foodName">Food name</label>
                            <input
                                type="text"
                                id="foodName"
                                placeholder='e.g. Greek salad'
                                value={foodName}
                                onChange={(event) => setFoodName(event.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="foodQuantity">Quantity or servings</label>
                            <input
                                type="number"
                                id="foodQuantity"
                                placeholder='Number of portions'
                                value={foodQuantity}
                                onChange={(event) => setFoodQuantity(event.target.value)}
                            />
                        </div>
                    </>
                )}

                <button type="submit">Submit donation</button>
                {message && <p className="donation-message">{message}</p>}
            </form>
        </div>
    );
};

export default DonationForm;

