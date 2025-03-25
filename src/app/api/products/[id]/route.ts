/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const { name, description, categoryId, quantity, price, imageUrl } = await request.json();
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params; // Get the product ID from the URL parameters

        // Perform the deletion logic
        const deletedProduct = await prisma.product.delete({
            where: { id: String(id) },
        });

        // Return a success response
        return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
    }
}