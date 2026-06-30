"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { name, email },
          items: cart,
          totalAmount: totalPrice
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Order placed successfully!');
        clearCart();
        router.push('/');
      } else {
        alert('Checkout failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h2>Your Cart ({totalItems} items)</h2>
        
        {cart.length === 0 ? (
          <p style={{ marginTop: '1rem' }}>Your cart is empty.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '1rem' }}>
            <div>
              {cart.map(item => (
                <div key={item.product} className="cart-item">
                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <span>${item.price.toFixed(2)} x {item.quantity}</span>
                  </div>
                  <button className="btn-danger" onClick={() => removeFromCart(item.product)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              
              <form className="checkout-form" onSubmit={handleCheckout}>
                <h4>Checkout details</h4>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
