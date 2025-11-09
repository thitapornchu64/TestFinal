import { register, login } from '$lib/server/db.js';
import bcrypt from 'bcrypt';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {

  register: async ({ request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);

    let errors = {};

    // Validation
    if (!data.userType) errors.userType = 'โปรดเลือกประเภทผู้ใช้งาน';
    if (!data.email) errors.email = 'โปรดกรอกอีเมล';
    if (!data.password) errors.password = 'โปรดกรอกรหัสผ่าน';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    if (!data.firstname) errors.firstname = 'โปรดกรอกชื่อ';
    if (!data.idcard || !/^\d{13}$/.test(data.idcard)) errors.idcard = 'กรุณากรอกเลขบัตร 13 หลัก';
    if (!data.phone || !/^\d{10}$/.test(data.phone)) errors.phone = 'กรุณากรอกเบอร์โทร';

    if (Object.keys(errors).length > 0) {
      return fail(400, { data, errors }); // ✅ ส่งกลับไปให้ form แสดง
    }

    // ✅ Hash Password ก่อนเก็บ
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ บันทึกข้อมูลลง database
    const userId = await register({
      userType: data.userType,
      email: data.email,
      password: hashedPassword,
      prefix: data.prefix,
      firstname: data.firstname,
      lastname: data.lastname,
      idcard: data.idcard,
      phone: data.phone,
      durianType: data.durianType || '',
      durianOther: data.durianOther || ''
    });

    if (!userId) {
      return fail(400, {
        data,
        errors: { email: 'อีเมลนี้ถูกใช้แล้วในระบบ' }
      });
    }

    return { success: true };
  },

  login: async ({ request }) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    const user = await login(email);

    if (!user) {
      return fail(400, { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ✅ เปรียบเทียบ password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return fail(400, { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ✅ Login สำเร็จ → ไปหน้าหลัง login
    throw redirect(303, '/dashboard');
  }
};