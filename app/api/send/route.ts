import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Use your domain once verified
            to: ['kmnaeeim@gmail.com'],
            subject: `New Message from ${name}`,
            replyTo: email,
            text: message,
        });

        if (error) return NextResponse.json({ error }, { status: 500 });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}