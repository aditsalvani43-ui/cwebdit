import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload gagal" });

    const siteName = fields.siteName;
    const token = process.env.VERCEL_TOKEN; // tambahin di Vercel env

    if (!token) return res.status(500).json({ error: "Token tidak ditemukan" });

    try {
      // Simulasi: kita cuma balikin success (implementasi asli perlu upload ke Vercel API)
      return res.status(200).json({
        success: true,
        url: `https://${siteName}.vercel.app`
      });
    } catch (e) {
      return res.status(500).json({ error: "Deploy gagal" });
    }
  });
             }
