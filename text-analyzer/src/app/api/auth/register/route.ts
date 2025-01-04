import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // get user data from request body
    const { name, email, password } = await request.json(); 

    // basic validations:
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }, // find user by email, kinda like SQL select * from users where email = email
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10); 
    // 10 is the number of rounds to hash the password, could do more but it's slower

    // create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: 'user' },
    });

    // remove password from response so it's never sent on the line
    const { password: _, ...userWithoutPassword } = user; // _ is a convention to ignore a variable

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'User created successfully',
    });
    
  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}