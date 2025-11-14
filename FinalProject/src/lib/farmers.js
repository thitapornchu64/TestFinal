import { aspects } from './survey.js'

export const farmers = [
  {
    id: 'F001',
    name: 'นายสมชาย ใจดี',
    province: 'เชียงใหม่',
    surveys: aspects.map(a => ({
      ...a,
      note: a.category === 'water' || a.category === 'soil'
        ? 'บันทึกข้อมูลแล้ว'
        : 'ยังไม่มีข้อมูล',
      ctaLabel: a.category === 'water' || a.category === 'soil'
        ? 'แก้ไขข้อมูล'
        : 'เพิ่มข้อมูล'
    }))
  },
  {
    id: 'F002',
    name: 'นางสาวอารีย์ ผลดี',
    province: 'ลพบุรี',
    surveys: aspects.map(a => ({
      ...a,
      note: a.category === 'fert-chem'
        ? 'บันทึกข้อมูลแล้ว'
        : 'ยังไม่มีข้อมูล',
      ctaLabel: a.category === 'fert-chem'
        ? 'แก้ไขข้อมูล'
        : 'เพิ่มข้อมูล'
    }))
  },
  {
    id: 'F003',
    name: 'นายอภินันท์ ปัญญา',
    province: 'กรุงเทพ',
    surveys: aspects.map(a => ({
      ...a,
      note: a.category === 'fert-chem'
        ? 'บันทึกข้อมูลแล้ว'
        : 'ยังไม่มีข้อมูล',
      ctaLabel: a.category === 'fert-chem'
        ? 'แก้ไขข้อมูล'
        : 'เพิ่มข้อมูล'
    }))
  }
]
