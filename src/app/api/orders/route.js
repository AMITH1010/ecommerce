import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { user, items, totalAmount } = body;

    if (!user || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid order data' }, { status: 400 });
    }

    const order = await Order.create({
      user,
      items,
      totalAmount
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
