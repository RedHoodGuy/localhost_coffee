import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
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

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function PUT(request: Request) {
  const { id, name, description, categoryId, quantity, price, imageUrl } = await request.json();
  const updatedProduct = await prisma.product.update({
    where: {
      id
    },
    data: {
      name,
      description,
      categoryId,
      quantity,
      price,
      imageUrl
    }
  });
  return NextResponse.json({ message: 'Product updated' }, { status: 200 });
}