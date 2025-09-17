import PaymentMethod from '../models/paymentMethod.js';
import errorHandler from '../middlewares/errorHandler.js';

async function getPaymentMethods(req, res) {
  try {
    const paymentMethods = await PaymentMethod.find({ isActive: true }).populate('user');
    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
}

async function getPaymentMethodById(req, res) {
  try {
    const id = req.params.id;
    const paymentMethod = await PaymentMethod.findById(id).populate('user');
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    res.json(paymentMethod);
  } catch (error) {
    next(error);
  }
}

async function getPaymentMethodsByUser(req, res) {
  try {
    const userId = req.params.userId;
    const paymentMethods = await PaymentMethod.find({
      user: userId,
      isActive: true
    }).populate('user');

    if (paymentMethods.length === 0) {
      return res.status(404).json({ message: 'No payment methods found for this user' });
    }
    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
}

async function createPaymentMethod(req, res) {
  try {
    const {
      user,
      type,
      cardNumber,
      cardHolderName,
      expiryDate,
      paypalEmail,
      bankName,
      accountNumber,
      isDefault = false
    } = req.body;

    // Validaciones básicas
    if (!user || !type) {
      return res.status(400).json({ error: 'User and type are required' });
    }

    const validTypes = ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid payment method type' });
    }

    // Validaciones específicas por tipo
    if (type === 'credit_card' || type === 'debit_card') {
      if (!cardNumber || !cardHolderName || !expiryDate) {
        return res.status(400).json({
          error: 'Card number, card holder name, and expiry date are required for card payments'
        });
      }
      // Validación básica del número de tarjeta (16 dígitos)
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        return res.status(400).json({ error: 'Card number must be 16 digits' });
      }
      // Validación del formato de fecha de expiración (MM/YY)
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        return res.status(400).json({ error: 'Expiry date must be in MM/YY format' });
      }
    } else if (type === 'paypal') {
      if (!paypalEmail) {
        return res.status(400).json({ error: 'PayPal email is required for PayPal payments' });
      }
      // Validación básica de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        return res.status(400).json({ error: 'Invalid PayPal email format' });
      }
    } else if (type === 'bank_transfer') {
      if (!bankName || !accountNumber) {
        return res.status(400).json({ error: 'Bank name and account number are required for bank transfers' });
      }
    }

    // Si se marca como default, desmarcar otros métodos default del usuario
    if (isDefault) {
      await PaymentMethod.updateMany(
        { user: user, isDefault: true },
        { isDefault: false }
      );
    }

    const newPaymentMethod = await PaymentMethod.create({
      user,
      type,
      cardNumber: type === 'credit_card' || type === 'debit_card' ? cardNumber : undefined,
      cardHolderName: type === 'credit_card' || type === 'debit_card' ? cardHolderName : undefined,
      expiryDate: type === 'credit_card' || type === 'debit_card' ? expiryDate : undefined,
      paypalEmail: type === 'paypal' ? paypalEmail : undefined,
      bankName: type === 'bank_transfer' ? bankName : undefined,
      accountNumber: type === 'bank_transfer' ? accountNumber : undefined,
      isDefault,
      isActive: true
    });

    await newPaymentMethod.populate('user');
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    next(error);
  }
}

async function updatePaymentMethod(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    // Campos permitidos para actualizar
    const allowedFields = ['cardHolderName', 'expiryDate', 'paypalEmail', 'bankName', 'accountNumber', 'isDefault', 'isActive'];
    const filteredUpdate = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredUpdate[field] = updateData[field];
      }
    }

    // Validaciones específicas según el tipo
    if (paymentMethod.type === 'credit_card' || paymentMethod.type === 'debit_card') {
      if (filteredUpdate.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(filteredUpdate.expiryDate)) {
        return res.status(400).json({ error: 'Expiry date must be in MM/YY format' });
      }
    } else if (paymentMethod.type === 'paypal') {
      if (filteredUpdate.paypalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(filteredUpdate.paypalEmail)) {
        return res.status(400).json({ error: 'Invalid PayPal email format' });
      }
    }

    // Si se marca como default, desmarcar otros métodos default del usuario
    if (filteredUpdate.isDefault === true) {
      await PaymentMethod.updateMany(
        { user: paymentMethod.user, isDefault: true, _id: { $ne: id } },
        { isDefault: false }
      );
    }

    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      filteredUpdate,
      { new: true }
    ).populate('user');

    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    next(error);
  }
}

async function setDefaultPaymentMethod(req, res) {
  try {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    if (!paymentMethod.isActive) {
      return res.status(400).json({ message: 'Cannot set inactive payment method as default' });
    }

    // Desmarcar otros métodos default del usuario
    await PaymentMethod.updateMany(
      { user: paymentMethod.user, isDefault: true },
      { isDefault: false }
    );

    // Marcar este como default
    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    ).populate('user');

    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    next(error);
  }
}

async function deactivatePaymentMethod(req, res) {
  try {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      { isActive: false, isDefault: false },
      { new: true }
    ).populate('user');

    res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    next(error);
  }
}

async function deletePaymentMethod(req, res) {
  try {
    const { id } = req.params;

    const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(id);
    if (!deletedPaymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getDefaultPaymentMethod(req, res) {
  try {
    const userId = req.params.userId;
    const defaultPaymentMethod = await PaymentMethod.findOne({
      user: userId,
      isDefault: true,
      isActive: true
    }).populate('user');

    if (!defaultPaymentMethod) {
      return res.status(404).json({ message: 'No default payment method found for this user' });
    }

    res.json(defaultPaymentMethod);
  } catch (error) {
    next(error);
  }
}

export {
  getPaymentMethods,
  getPaymentMethodById,
  getPaymentMethodsByUser,
  createPaymentMethod,
  updatePaymentMethod,
  setDefaultPaymentMethod,
  deactivatePaymentMethod,
  deletePaymentMethod,
  getDefaultPaymentMethod,
};
