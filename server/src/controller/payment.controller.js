import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/order.model.js";

// Dummy test data for order creation since Cart integration is pending
// This ensures we have valid ObjectIds if needed, but we'll try to just
// save a pending order with placeholder customer/restaurant if necessary,
// or we can require them from frontend. For this test implementation,
// we will expect `amount` from the frontend, but in production, ALWAYS
// calculate amount from cart/DB.

export const createOrder = async (req, res) => {
  try {
    const {
      amount,
      currency = "INR",
      receipt = `receipt_${Date.now()}`,
    } = req.body;

    // IMPORTANT: Security check
    // In a real application, you MUST calculate the amount server-side based on the cart.
    // For this test integration, we will accept the amount from the frontend to allow testing.

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
      payment_capture: 1, // Auto capture
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create a pending order in the database (Optional, depending on flow)
    // We will skip full DB order creation here since we lack restaurantId/customerId
    // But we'll demonstrate it if you pass IDs.

    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      application_order_id,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required payment details" });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Payment verification failed: Invalid signature",
        });
    }

    // Signature is valid.
    // If application_order_id is passed, update the order in DB
    if (application_order_id) {
      await Order.findByIdAndUpdate(application_order_id, {
        "paymentDetails.paymentStatus": "completed",
        "paymentDetails.razorpayOrderId": razorpay_order_id,
        "paymentDetails.razorpayPaymentId": razorpay_payment_id,
        "paymentDetails.razorpaySignature": razorpay_signature,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        razorpay_payment_id,
        razorpay_order_id,
      },
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
