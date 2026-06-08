import Coupon from "../models/Coupon.js";

// @desc    Validate a promo code
// @route   POST /api/coupons/validate
// @access  Private
export const validateCoupon = async (req, res) => {
  const { code, purchaseAmount } = req.body;

  if (!code) {
    return res.status(400).json({ message: "Coupon code is required" });
  }

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    // Check expiry
    if (new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ message: "Coupon code has expired" });
    }

    // Check min purchase
    if (purchaseAmount && purchaseAmount < coupon.minPurchase) {
      return res.status(400).json({
        message: `Minimum purchase of ₹${coupon.minPurchase} is required for this coupon`,
      });
    }

    res.json({
      message: "Coupon applied successfully",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      maxDiscount: coupon.maxDiscount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin CRUD
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      Object.assign(coupon, req.body);
      const updatedCoupon = await coupon.save();
      res.json(updatedCoupon);
    } else {
      res.status(404).json({ message: "Coupon not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      await coupon.deleteOne();
      res.json({ message: "Coupon removed" });
    } else {
      res.status(404).json({ message: "Coupon not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
