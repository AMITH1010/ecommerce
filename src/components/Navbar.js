"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="brand">E-Shop</Link>
      <Link href="/cart" className="cart-link">
        Cart ({totalItems})
      </Link>
    </nav>
  );
}
