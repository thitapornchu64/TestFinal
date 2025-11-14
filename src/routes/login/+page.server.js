import { fail, redirect } from '@sveltejs/kit';
// @ts-ignore
import { db } from '$lib/server/database'; // ต้องมี db.register ใช้งานได้จริง

export const actions = {
  login: async ({ request, cookies }) => {

    const form = await request.formData();
    const username = form.get('username')?.trim();
    const password = form.get('password')?.trim();

    
    if (!username || !password) {
      return fail(400, { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // ✔ ค้นหา user จาก db
    let foundUser = null;
    for (const [userid, user] of db.register.entries()) {
      if (user.email === username && user.password === password) {
        foundUser = { userid, ...user };
        break;
      }
    }

 
    if (!foundUser) {
      return fail(400, { error: 'Username หรือ Password ไม่ถูกต้อง' });
    }

  
    cookies.set('userid', foundUser.userid, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 วัน
    });

    throw redirect(303, '/survey');
  }
};