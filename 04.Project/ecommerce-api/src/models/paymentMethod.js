import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
  },
  // Para tarjetas de crédito/débito
  // Primer dígito: Indica el esquema de la tarjeta (por ejemplo, 4 para Visa, 5 para Mastercard).
  // Dígitos 2-6: Identifican al emisor de la tarjeta (por ejemplo, el banco o la entidad financiera).
  // Dígitos 7-15: Representan el número de cuenta individual del titular de la tarjeta.
  // Dígito 16: Es un dígito verificador calculado mediante un algoritmo para asegurar la validez de la tarjeta.
  cardNumber: {
    type: String,
  },
  cardHolderName: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  // Para PayPal
  paypalEmail: {
    type: String,
  },
  // Para transferencia bancaria
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;
