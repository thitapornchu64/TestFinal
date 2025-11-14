

/**
 * @typedef {Object} SurveyAspect
 * @property {string} category
 * @property {string} title
 * @property {string=} lastUpdated
 * @property {string=} note
 * @property {string=} ctaLabel
 * @property {string=} imageAlt
 */

/** @type {SurveyAspect[]} */
export const aspects = [
  { category: 'water', title: 'การจัดการน้ำ',      lastUpdated: '26/02/2568 เวลา 19:00 น.', note: 'บันทึกข้อมูลแล้ว', ctaLabel: 'แก้ไขข้อมูล', imageAlt: '/images/water.png' },
  { category: 'soil', title: 'การจัดการที่ดิน',    lastUpdated: '26/02/2568 เวลา 19:00 น.', note: 'บันทึกข้อมูลแล้ว', ctaLabel: 'แก้ไขข้อมูล', imageAlt: '/images/soil.png' },
  { category: 'fert-chem',title: 'การใช้ปุ๋ยและยา', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/fert-chem.png' },
  { category: 'tools',title: 'ยานพาหนะ อุปกรณ์', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/tools.png' },
  { category: 'harvest',title: 'การเก็บเกี่ยว', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/harvest.png' },
  { category: 'postharvest',title: 'การพักผลผลิต', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/postharvest.png' },
  { category: 'facilities',title: 'สถานที่ต่าง ๆ', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/facilities.png' },
  { category: 'workers',title: 'ผู้ปฏิบัติงาน', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'เพิ่มข้อมูล', imageAlt: '/images/workers.png' }
]