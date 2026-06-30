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
    imageUrl: "https://images.unsplash.com/photo-1527814050087-379381547936?w=500&q=80"
  },
  {
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor for creators and gamers.",
    price: 349.00,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
  }
];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if products exist
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(initialProducts);
      return NextResponse.json({ success: true, message: 'Products seeded successfully' });
    }
    
    return NextResponse.json({ success: true, message: 'Products already seeded' });
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
