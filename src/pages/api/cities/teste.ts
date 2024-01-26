import {NextApiRequest, NextApiResponse} from 'next';
import { NextResponse } from 'next/server';
type Data = {
 name: string;
 date: Date;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
){
    const date = new Date();
    
    return res.status(200).json({ name: 'John Doe', date });
}