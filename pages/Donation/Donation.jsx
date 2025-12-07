import React, { useContext, useMemo, useState } from 'react';
import './Donation.css';
import { StoreContext } from '../Context/StoreContext';

const presetAmounts = [150, 300, 600];

const Donation = () => {
  const { food_list } = useContext(StoreContext);
  const [donationType, setDonationType] = useState('money');
  const [selectedAmount, setSelectedAmount] = useState(presetAmounts[0]);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [paymentError, setPaymentError] = useState('');

  const displayAmount = customAmount ? Number(customAmount) : selectedAmount;
  const selectedMeal = useMemo(
    () => food_list.find((item) => item.food_id === selectedMealId),
    [food_list, selectedMealId]
  );
  const discountedMealPrice = selectedMeal ? Math.round(selectedMeal.food_price * 0.2) : null;

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleDonationType = (type) => {
    setDonationType(type);
    if (type === 'meal') {
      setCustomAmount('');
    } else {
      setSelectedMealId(null);
    }
    resetPaymentStep();
  };

  const handleMealSelect = (mealId) => {
    setSelectedMealId((prev) => (prev === mealId ? null : mealId));
    resetPaymentStep();
  };

  const handleProceed = () => {
    if (donationType === 'meal') {
      if (!selectedMeal || !discountedMealPrice) {
        alert('Please select a meal to donate.');
        return;
      }
      setPendingDonation({
        type: 'meal',
        label: selectedMeal.food_name,
        amount: discountedMealPrice
      });
    } else {
      if (!displayAmount || displayAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
      }
      setPendingDonation({
        type: 'money',
        label: 'Custom donation',
        amount: displayAmount
      });
    }
    setShowPaymentStep(true);
    setPaymentMethod('card');
    setPaymentError('');
  };

  const resetPaymentStep = () => {
    setShowPaymentStep(false);
    setPendingDonation(null);
    setPaymentMethod('card');
    setCardDetails({ name: '', number: '', expiry: '', cvv: '' });
    setPaymentError('');
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setPaymentError('');
  };

  const handleCardInput = (event) => {
    const { name, value } = event.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardDetails = () => {
    if (paymentMethod !== 'card') return true;
    const trimmed = {
      name: cardDetails.name.trim(),
      number: cardDetails.number.replace(/\s+/g, ''),
      expiry: cardDetails.expiry.trim(),
      cvv: cardDetails.cvv.trim()
    };
    if (!trimmed.name) {
      setPaymentError('Cardholder name is required.');
      return false;
    }
    if (!/^\d{12,19}$/.test(trimmed.number)) {
      setPaymentError('Enter a valid card number (12-19 digits).');
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed.expiry)) {
      setPaymentError('Expiration must be in MM/YY format.');
      return false;
    }
    if (!/^\d{3,4}$/.test(trimmed.cvv)) {
      setPaymentError('CVV must be 3 or 4 digits.');
      return false;
    }
    setPaymentError('');
    return true;
  };

  const handleCompleteDonation = () => {
    if (!pendingDonation) return;
    if (!validateCardDetails()) {
      return;
    }
    const paymentLabel = 'card';
    alert(`Thank you! Your ${pendingDonation.label} of ${pendingDonation.amount.toLocaleString('en-EG')} EGP will be processed via ${paymentLabel}.`);
    resetPaymentStep();
  };

  return (
    <div className='donation-page'>
      <section className="donation-hero">
        <h1>Support the Tomato community</h1>
        <p>Your contribution helps us keep meals affordable and initiatives running.</p>
      </section>
      <section className="donation-card">
        <div className="donation-mode-toggle">
          <button
            type='button'
            className={donationType === 'meal' ? 'active' : ''}
            onClick={() => handleDonationType('meal')}
          >
            Donate a Meal (80% off)
          </button>
          <button
            type='button'
            className={donationType === 'money' ? 'active' : ''}
            onClick={() => handleDonationType('money')}
          >
            Donate Money
          </button>
        </div>
        {donationType === 'meal' && (
          <div className="meal-donation">
            <p>Select a dish to donate — we’ll cover 80% of the cost for you.</p>
            <div className="meal-grid">
              {food_list.map((item) => {
                const discounted = Math.round(item.food_price * 0.2);
                return (
                  <button
                    key={item.food_id}
                    type='button'
                    className={`meal-card ${selectedMealId === item.food_id ? 'active' : ''}`}
                    onClick={() => handleMealSelect(item.food_id)}
                  >
                    <p className="meal-name">{item.food_name}</p>
                    <div className="meal-pricing">
                      <span className="meal-original">{item.food_price.toLocaleString('en-EG')} EGP</span>
                      <span className="meal-discount">{discounted.toLocaleString('en-EG')} EGP</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedMeal && discountedMealPrice && (
              <div className="meal-summary">
                You chose <strong>{selectedMeal.food_name}</strong>. Your donation will be&nbsp;
                <strong>{discountedMealPrice.toLocaleString('en-EG')} EGP</strong>.
              </div>
            )}
          </div>
        )}
        {donationType === 'money' && (
          <>
            <h2>Choose an amount</h2>
            <div className="donation-presets">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type='button'
                  className={displayAmount === amount && !customAmount ? 'active' : ''}
                  onClick={() => handlePresetClick(amount)}
                >
                  {amount.toLocaleString('en-EG')} EGP
                </button>
              ))}
            </div>
            <div className="donation-custom">
              <label htmlFor="customAmount">Custom amount</label>
              <input
                id="customAmount"
                type="number"
                min="1"
                placeholder='Enter amount in EGP'
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value)}
              />
            </div>
          </>
        )}
        {!showPaymentStep && (
          <button className='primary-button donate-action' onClick={handleProceed}>
            Proceed to Donate
          </button>
        )}
      </section>
      {showPaymentStep && pendingDonation && (
        <section className='donation-payment'>
          <div className="donation-summary-banner">
            You're donating <strong>{pendingDonation.label}</strong> − total&nbsp;
            <strong>{pendingDonation.amount.toLocaleString('en-EG')} EGP</strong>
          </div>
          <h2>Payment Information</h2>
          <div className="payment-details open">
            <div className="card-form">
                <div className="form-field">
                  <label htmlFor="donationCardName">Cardholder Name</label>
                  <input
                    id="donationCardName"
                    name='name'
                    type="text"
                    value={cardDetails.name}
                    onChange={handleCardInput}
                    placeholder='Full name as on card'
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="donationCardNumber">Card Number</label>
                  <input
                    id="donationCardNumber"
                    name='number'
                    type="text"
                    inputMode='numeric'
                    value={cardDetails.number}
                    onChange={handleCardInput}
                    placeholder='1234 5678 9012 3456'
                  />
                </div>
                <div className="card-form-row">
                  <div className="form-field">
                    <label htmlFor="donationCardExpiry">Expiration Date</label>
                    <input
                      id="donationCardExpiry"
                      name='expiry'
                      type="text"
                      value={cardDetails.expiry}
                      onChange={handleCardInput}
                      placeholder='MM/YY'
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="donationCardCvv">CVV</label>
                    <input
                      id="donationCardCvv"
                      name='cvv'
                      type="text"
                      inputMode='numeric'
                      value={cardDetails.cvv}
                      onChange={handleCardInput}
                      placeholder='123'
                    />
                  </div>
                </div>
                {paymentError && <p className='payment-error'>{paymentError}</p>}
              </div>
          </div>
          <div className="payment-actions">
            <button className='primary-button' onClick={handleCompleteDonation}>
              Complete Donation
            </button>
            <button className='text-button' onClick={resetPaymentStep}>Back</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Donation;

