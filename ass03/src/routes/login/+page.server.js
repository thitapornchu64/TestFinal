import { redirect, fail } from '@sveltejs/kit';
import { db, login } from '$lib/server/db.js';
import bcrypt from 'bcrypt'; 

export const actions = {
    create: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            return fail(422, { error: 'กรุณากรอก Username และ Password' });
        }

        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

            if (!user) {
                return fail(422, { error: 'ไม่พบ Username นี้' });
            }

            // @ts-ignore
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return fail(422, { error: 'Password ไม่ถูกต้อง' });
            }

            cookies.set('session_id', user.id, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: false,
                maxAge: 60 * 60 * 24
            });

            throw redirect(303, '/profile');

        } catch (err) {
            return fail(500, { error: 'Server Error: ' + err.message });
        }
    }
};