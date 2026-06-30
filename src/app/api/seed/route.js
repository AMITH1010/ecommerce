export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

const initialProducts = [
  {
    name: "Wireless Headphones",
    description: "High quality noise-canceling wireless headphones.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile switches.",
    price: 129.50,
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with adjustable DPI.",
    price: 59.99,
    // Fixed image URL for the mouse
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c9085?w=500&q=80"
  },
  {
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor for creators and gamers.",
    price: 349.00,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
  },
  {
    name: "Pro Laptop",
    description: "High performance laptop for developers and creatives.",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"
  },
  {
    name: "Smartphone",
    description: "Latest 5G smartphone with an incredible camera.",
    price: 899.00,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
  },
  {
    name: "Smartwatch",
    description: "Fitness tracker and smartwatch with heart-rate monitoring.",
    price: 199.00,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof bluetooth speaker with deep bass.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
  },
  {
    name: "Web Camera",
    description: "1080p HD webcam for streaming and video calls.",
    price: 49.50,
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80"
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear out the old products first so we can cleanly insert the new ones
    await Product.deleteMany({});
    
    // Insert the fixed and new products
    await Product.insertMany(initialProducts);
    
    return NextResponse.json({ success: true, message: 'Products seeded and updated successfully! 9 items total.' });
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
