import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend istemcisini başlat
// API Key yoksa hata vermesin diye boş string fallback'i koyuyoruz ama çalışmaz.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, subject, message } = body;

        // Basit doğrulama
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: 'Lütfen zorunlu alanları doldurun.' },
                { status: 400 }
            );
        }

        // API Key kontrolü
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing");
            return NextResponse.json(
                { error: 'Sunucu yapılandırma hatası: API Key eksik.' },
                { status: 500 }
            );
        }

        // E-posta gönderimi
        // Not: Free tier'da sadece 'onboarding@resend.dev' adresinden kendi onaylı mailinize atabilirsiniz.
        // Domain ayarları yapılana kadar 'to' kısmı sizin kendi mailiniz olmalı.
        const data = await resend.emails.send({
            from: 'Mr Fix Contact <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL || 'emirhan61rz@hotmail.com'],
            subject: `[Mr. Fix Form] ${subject || 'Yeni Mesaj'}`,
            replyTo: 'no-reply@mrfix.com', // Kullanıcının maili elimizde olmadığı için dummy
            html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <br/>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return NextResponse.json({ error: `Resend Error: ${data.error.message}` }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Beklenmedik bir sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}
