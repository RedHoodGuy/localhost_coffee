import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, description, categoryId, quantity, price, imageUrl } = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        quantity,
        price,
        imageUrl
      },
    });
    return NextResponse.json(newProduct);
  }
  catch (error) {
    console.error('Error creating product: ', error);
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  }
  catch (error) {
    console.error('Error retrieving product list: ', error);
    return NextResponse.json({ message: 'Error retrieving product list' }, { status: 500 });
  }
}