/** @typedef {'pass'|'warn'|'none'} SurveyStatus */

/**
 * @typedef {Object} SurveyAspect
 * @property {string} slug
 * @property {string} title
 * @property {string=} lastUpdated
 * @property {SurveyStatus} status
 * @property {string=} note
 * @property {string=} ctaLabel
 * @property {string=} imageAlt
 */

/** @type {SurveyAspect[]} */
export const aspects = [
  { slug: 'water',       title: 'การจัดการน้ำ',      lastUpdated: '26/02/2568 เวลา 19:00 น.', status: 'warn', note: 'น้ำทิ้งยังมีโอกาสปนเปื้อน', ctaLabel: 'ทำแบบประเมินอีกครั้ง', imageAlt: 'water' },
  { slug: 'soil',        title: 'การจัดการที่ดิน',    lastUpdated: '26/02/2568 เวลา 19:00 น.', status: 'pass', note: 'แปลงเพาะปลูกเป็นตามมาตรฐาน', ctaLabel: 'ดูรายละเอียด', imageAlt: 'soil' },
  { slug: 'fert-chem',   title: 'การใช้ปุ๋ยและยา',    status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'fert-chem' },
  { slug: 'tools',       title: 'ยานพาหนะ อุปกรณ์',  status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'tools' },
  { slug: 'harvest',     title: 'การเก็บเกี่ยว',      status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'harvest' },
  { slug: 'postharvest', title: 'การพักผลผลิต',       status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'postharvest' },
  { slug: 'facilities',  title: 'สถานที่ต่าง ๆ',       status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'facilities' },
  { slug: 'workers',     title: 'ผู้ปฏิบัติงาน',       status: 'none', note: 'ไม่มีการบันทึกข้อมูล', ctaLabel: 'ทำแบบประเมิน', imageAlt: 'workers' }
]


export const surveyData = {
  soil: {
    title: "การจัดการดิน",
    questions: [
      { id: 1, text: "มีการตรวจสภาพดินก่อนปลูกหรือไม่?", type: "radio" },
      { id: 2, text: "มีการปรับปรุงดินด้วยปุ๋ยอินทรีย์หรือไม่?", type: "radio" }
    ]
  },
  water: {
    title: "การจัดการน้ำ",
    questions: [
      { id: 1, text: "มีการตรวจคุณภาพน้ำหรือไม่?", type: "radio" },
      { id: 2, text: "อัปโหลดรูปแหล่งน้ำของคุณ", type: "file" }
    ]
  },
  safety: {
    title: "ความปลอดภัยของผู้ปฏิบัติงาน",
    questions: [
      { id: 1, text: "มีการสวมอุปกรณ์ป้องกันระหว่างทำงานหรือไม่?", type: "radio" },
      { id: 2, text: "มีการตรวจสุขภาพประจำปีหรือไม่?", type: "radio" }
    ]
  }
}