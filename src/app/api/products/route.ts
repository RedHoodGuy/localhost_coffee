import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  const { name } = await request.json();
  const newTodo = await prisma.product.create({
    data: {
        name,
        description: 'undefined',
        categoryId: 'undefined',
        quantity: 0,
        price: 0.00
    },
  });
  return NextResponse.json(newTodo);
}

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}