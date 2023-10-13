import { compare } from "bcryptjs"; 
import { sign } from 'jsonwebtoken'
import prisma from "@/lib/db/connectDB";

export async function POST(request:Request) {
    const body = await request.json()
    const { email, password } = body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return Response.json({ error: "Invalid email or password" },{status:401});
    }

    //check password
    const validPassword = await compare(password, user.password)
    
    if (!validPassword) {
        return Response.json(
          { error: "Invalid password" },
          { status: 401 }
        );
        
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    
    
}

//jony5669@bhatt