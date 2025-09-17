import ShippingAddress from '../models/shippingAddress.js';

// Crear una nueva dirección de envío
const createShippingAddress = async (req, res, next) => {
  try {
    const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;
    const user = req.user.userId; // Asumiendo que tienes middleware de autenticación

    // Si esta dirección se marca como default, desmarcar las demás
    if (isDefault) {
      await ShippingAddress.updateMany(
        { user },
        { isDefault: false }
      );
    }

    const newAddress = new ShippingAddress({
      user,
      name,
      address,
      city,
      state,
      postalCode,
      country: country || 'México',
      phone,
      isDefault: isDefault || false,
      addressType: addressType || 'home'
    });

    await newAddress.save();

    res.status(201).json({
      message: 'Shipping address created successfully',
      address: newAddress
    });
  } catch (error) {
    next(error);
  }
};

// Obtener todas las direcciones del usuario
const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const addresses = await ShippingAddress.find({ user: userId })
      .sort({ isDefault: -1, _id: -1 }); // Default primero, luego más recientes

    res.status(200).json({
      message: 'Addresses retrieved successfully',
      count: addresses.length,
      addresses
    });
  } catch (error) {
    next(error);
  }
};

// Obtener una dirección específica
const getAddressById = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.userId;

    const address = await ShippingAddress.findOne({ _id: addressId, user: userId });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({
      message: 'Address retrieved successfully',
      address
    });
  } catch (error) {
    next(error);
  }
};

// Obtener la dirección por defecto del usuario
const getDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const defaultAddress = await ShippingAddress.findOne({ user: userId, isDefault: true });

    if (!defaultAddress) {
      return res.status(404).json({ message: 'No default address found' });
    }

    res.status(200).json({
      message: 'Default address retrieved successfully',
      address: defaultAddress
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar una dirección
const updateShippingAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;
    const userId = req.user.userId;

    const shippingAddress = await ShippingAddress.findOne({ _id: addressId, user: userId });

    if (!shippingAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Si esta dirección se marca como default, desmarcar las demás
    if (isDefault && !shippingAddress.isDefault) {
      await ShippingAddress.updateMany(
        { user: userId, _id: { $ne: addressId } },
        { isDefault: false }
      );
    }

    // Actualizar campos
    shippingAddress.name = name;
    shippingAddress.address = address;
    shippingAddress.city = city;
    shippingAddress.state = state;
    shippingAddress.postalCode = postalCode;
    shippingAddress.country = country || shippingAddress.country;
    shippingAddress.phone = phone;
    shippingAddress.isDefault = isDefault !== undefined ? isDefault : shippingAddress.isDefault;
    shippingAddress.addressType = addressType || shippingAddress.addressType;

    await shippingAddress.save();

    res.status(200).json({
      message: 'Address updated successfully',
      address: shippingAddress
    });
  } catch (error) {
    next(error);
  }
};

// Marcar dirección como default
const setDefaultAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.userId;

    const address = await ShippingAddress.findOne({ _id: addressId, user: userId });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Desmarcar todas las direcciones como default
    await ShippingAddress.updateMany(
      { user: userId },
      { isDefault: false }
    );

    // Marcar la dirección actual como default
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      message: 'Default address updated successfully',
      address
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar una dirección
const deleteShippingAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const userId = req.user.userId;

    const address = await ShippingAddress.findOne({ _id: addressId, user: userId });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await ShippingAddress.findByIdAndDelete(addressId);

    res.status(200).json({
      message: 'Address deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export {
  createShippingAddress,
  getUserAddresses,
  getAddressById,
  getDefaultAddress,
  updateShippingAddress,
  setDefaultAddress,
  deleteShippingAddress
};