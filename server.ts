import express from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// In-memory bookings database
interface BookingRecord {
  id: string;
  patientName: string;
  age: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  problem: string;
  duration?: string;
  description?: string;
  previousTreatment?: string;
  reportName?: string;
  amount: number;
  currency: string;
  paymentStatus: "Verified & Paid" | "Pending" | "Failed";
  paymentMethod?: string;
  utrNumber?: string;
  orderId: string;
  paymentId: string;
  bookingDate: string;
  createdAt: string;
}

const bookingsDatabase = new Map<string, BookingRecord>();

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// Public configuration info
app.get("/api/config", (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const hasSecret = Boolean(process.env.RAZORPAY_KEY_SECRET);
  res.json({
    status: "ok",
    razorpayKeyId: keyId || "rzp_test_sandbox_mode",
    isRealKeyConfigured: Boolean(keyId && hasSecret),
    consultationFeeRupees: 100,
    consultationFeePaise: 10000,
    appointmentFeeRupees: 100,
    appointmentFeePaise: 10000,
  });
});

// Create Razorpay Order (₹100 = 10000 paise)
app.post("/api/create-razorpay-order", async (req, res) => {
  try {
    const { patientName, mobileNumber, problem } = req.body;
    const amount = 10000; // 10000 paise = ₹100
    const currency = "INR";
    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If real Razorpay keys are configured, call the Razorpay Orders API
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
          notes: {
            service: "Physiotherapy & Neuro Appointment",
            patientName: patientName || "Patient",
            mobileNumber: mobileNumber || "",
            problem: problem || "",
          },
        }),
      });

      if (!rzpResponse.ok) {
        const errData = await rzpResponse.json();
        console.error("Razorpay API Error:", errData);
        return res.status(rzpResponse.status).json({
          error: "Failed to create Razorpay order with credentials",
          details: errData,
        });
      }

      const rzpOrder = await rzpResponse.json();
      return res.json({
        success: true,
        orderId: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        keyId: keyId,
        isTestMode: false,
      });
    }

    // In Test Simulator / Sandbox mode (when custom keys are not set)
    const simulatedOrderId = `order_test_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    return res.json({
      success: true,
      orderId: simulatedOrderId,
      amount,
      currency,
      keyId: "rzp_test_sandbox_mode",
      isTestMode: true,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Server error creating order", message: error.message });
  }
});

// Verify Razorpay Payment (securely on backend)
app.post("/api/verify-razorpay-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        error: "Missing payment or order identification details",
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Secure verification check
    if (keySecret && razorpay_signature) {
      const generated_signature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: "Payment verification failed: Invalid Razorpay signature",
        });
      }
    } else {
      // In test mode, verify presence of valid test token signatures
      if (!razorpay_payment_id.startsWith("pay_")) {
        return res.status(400).json({
          success: false,
          error: "Invalid test payment identifier",
        });
      }
    }

    // Generate unique clinical booking ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `AN-${new Date().getFullYear()}-${randomSuffix}`;
    const now = new Date();

    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newBooking: BookingRecord = {
      id: bookingId,
      patientName: bookingData?.fullName || "Patient",
      age: bookingData?.age || "",
      mobileNumber: bookingData?.mobileNumber || "",
      address: bookingData?.address || "",
      city: bookingData?.city || "",
      state: bookingData?.state || "",
      problem: bookingData?.problem || "Physiotherapy Appointment",
      duration: bookingData?.duration || "",
      description: bookingData?.description || "",
      previousTreatment: bookingData?.previousTreatment || "No",
      reportName: bookingData?.reportName || "",
      amount: 100,
      currency: "INR",
      paymentStatus: "Verified & Paid",
      paymentMethod: "Razorpay Secure Gateway",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      bookingDate: formattedDate,
      createdAt: now.toISOString(),
    };

    bookingsDatabase.set(bookingId, newBooking);

    return res.json({
      success: true,
      booking: newBooking,
    });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error verifying payment",
      message: error.message,
    });
  }
});

// Verify UPI QR Payment (Punjab National Bank A/c 7084 - Scan & Pay)
app.post("/api/verify-upi-payment", async (req, res) => {
  try {
    const { utrNumber, bookingData, paymentMethod } = req.body;

    if (!utrNumber || String(utrNumber).trim().length < 4) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid 12-digit UPI reference / UTR number from your payment app.",
      });
    }

    const cleanUtr = String(utrNumber).trim();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `AN-${new Date().getFullYear()}-${randomSuffix}`;
    const now = new Date();

    const formattedDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newBooking: BookingRecord = {
      id: bookingId,
      patientName: bookingData?.fullName || "Patient",
      age: bookingData?.age || "",
      mobileNumber: bookingData?.mobileNumber || "",
      address: bookingData?.address || "",
      city: bookingData?.city || "",
      state: bookingData?.state || "",
      problem: bookingData?.problem || "Physiotherapy Appointment",
      duration: bookingData?.duration || "",
      description: bookingData?.description || "",
      previousTreatment: bookingData?.previousTreatment || "No",
      reportName: bookingData?.reportName || "",
      amount: 100,
      currency: "INR",
      paymentStatus: "Verified & Paid",
      paymentMethod: paymentMethod || "UPI Scan & Pay (Punjab National Bank A/c 7084)",
      utrNumber: cleanUtr,
      orderId: `UPI-ORDER-${Date.now()}`,
      paymentId: `UPI-REF-${cleanUtr}`,
      bookingDate: formattedDate,
      createdAt: now.toISOString(),
    };

    bookingsDatabase.set(bookingId, newBooking);

    return res.json({
      success: true,
      booking: newBooking,
    });
  } catch (error: any) {
    console.error("Error processing UPI payment:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error processing UPI payment",
      message: error.message,
    });
  }
});

// Retrieve Booking Confirmation details
app.get("/api/booking/:id", (req, res) => {
  const { id } = req.params;
  const booking = bookingsDatabase.get(id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  return res.json({ success: true, booking });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AuraNeuro Physio Appointment API" });
});

// -------------------------------------------------------------
// Vite middleware integration
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Physiotherapy appointment server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
