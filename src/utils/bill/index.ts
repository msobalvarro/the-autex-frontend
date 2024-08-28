import jsPDF from 'jspdf'


export const generateInvoice = async () => {
  const doc = new jsPDF()
  doc.setFontSize(12)
  doc.text('Empresa S.A.', 80, 15, { align: 'center' })
  doc.text('Dirección de la empresa', 80, 20, { align: 'center' })
  doc.text('Teléfono: +123456789', 80, 25, { align: 'center' })
  doc.text('Email: contacto@empresa.com', 80, 30, { align: 'center' })
  doc.text('RUC: 1234567890', 80, 35, { align: 'center' })

  doc.save()
}