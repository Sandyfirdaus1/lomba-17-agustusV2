const express = require("express");
const router = express.Router();
const Peserta = require("../models/Peserta");

// GET - Mendapatkan semua peserta (untuk ditampilkan ke semua orang)
router.get("/", async (req, res) => {
  try {
    const peserta = await Peserta.find()
      .sort({ tanggalDaftar: -1 }) // Urutkan berdasarkan tanggal daftar terbaru
      .select("-__v"); // Exclude field __v

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta",
      error: error.message,
    });
  }
});

// GET - Mendapatkan peserta berdasarkan jenis lomba
router.get("/lomba/:jenisLomba", async (req, res) => {
  try {
    const { jenisLomba } = req.params;
    const peserta = await Peserta.find({ jenisLomba })
      .sort({ tanggalDaftar: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta berdasarkan lomba",
      error: error.message,
    });
  }
});

// POST - Quick action untuk turnamen (harus di atas /:id)
router.post("/:id/action", async (req, res) => {
  try {
    const {
      action,
      babak,
      skor,
      waktuPenyelesaian,
      ranking,
      alasanDiskualifikasi,
      hadiah,
      catatanJuri,
    } = req.body;

    console.log("Action received:", action); // Debug log
    console.log("Request body:", req.body); // Debug log

    let updateData = {};

    switch (action) {
      case "Lolos":
        updateData = {
          status: "Lolos ke Babak Selanjutnya",
          isLolos: true,
          isDiskualifikasi: false,
          isJuara: false,
        };
        if (babak) updateData.babak = babak;
        if (skor !== undefined) updateData.skor = skor;
        if (waktuPenyelesaian !== undefined)
          updateData.waktuPenyelesaian = waktuPenyelesaian;
        if (ranking !== undefined) updateData.ranking = ranking;
        if (catatanJuri) updateData.catatanJuri = catatanJuri;
        break;

      case "Juara 1":
      case "Juara 2":
      case "Juara 3":
        updateData = {
          status: action,
          juara: action,
          isJuara: true,
          isLolos: true,
          isDiskualifikasi: false,
        };
        if (hadiah) updateData.hadiah = hadiah;
        if (catatanJuri) updateData.catatanJuri = catatanJuri;
        break;

      case "DQ":
        updateData = {
          status: "Diskualifikasi",
          alasanDiskualifikasi:
            alasanDiskualifikasi || "Diskualifikasi oleh admin",
          tanggalDiskualifikasi: new Date(),
          isDiskualifikasi: true,
          isLolos: false,
          isJuara: false,
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: `Action "${action}" tidak valid. Action yang tersedia: Lolos, Juara 1, Juara 2, Juara 3, DQ`,
        });
    }

    console.log("Update data:", updateData); // Debug log

    const peserta = await Peserta.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    console.log("Updated peserta:", peserta); // Debug log

    res.status(200).json({
      success: true,
      message: `Peserta berhasil diupdate ke status "${action}"`,
      data: peserta,
    });
  } catch (error) {
    console.error("Error in quick action:", error); // Debug log
    res.status(400).json({
      success: false,
      message: "Error saat melakukan action",
      error: error.message,
    });
  }
});

// GET - Mendapatkan peserta berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findById(req.params.id).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta",
      error: error.message,
    });
  }
});

// POST - Mendaftarkan peserta baru
router.post("/", async (req, res) => {
  try {
    // Validate required fields
    const { nama, email, noTelepon, usia, alamat, jenisLomba } = req.body;

    if (!nama || !email || !noTelepon || !usia || !alamat || !jenisLomba) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
        missingFields: {
          nama: !nama ? "Nama wajib diisi" : null,
          email: !email ? "Email wajib diisi" : null,
          noTelepon: !noTelepon ? "Nomor telepon wajib diisi" : null,
          usia: !usia ? "Usia wajib diisi" : null,
          alamat: !alamat ? "Alamat wajib diisi" : null,
          jenisLomba: !jenisLomba ? "Jenis lomba wajib dipilih" : null,
        },
      });
    }

    // Validate usia range
    if (usia < 1 || usia > 120) {
      return res.status(400).json({
        success: false,
        message: "Usia harus antara 1-120 tahun",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    const peserta = await Peserta.create(req.body);

    res.status(201).json({
      success: true,
      message: "Peserta berhasil didaftarkan",
      data: peserta,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Check if it's a duplicate name + lomba combination
      if (
        error.keyPattern &&
        error.keyPattern.nama &&
        error.keyPattern.jenisLomba
      ) {
        return res.status(400).json({
          success: false,
          message: `Nama "${req.body.nama}" sudah terdaftar untuk lomba "${req.body.jenisLomba}"`,
          duplicateField: "nama",
          duplicateValue: req.body.nama,
          duplicateLomba: req.body.jenisLomba,
        });
      }
      // Check if it's a duplicate email
      if (error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({
          success: false,
          message: "Email sudah terdaftar sebelumnya",
          duplicateField: "email",
          duplicateValue: req.body.email,
        });
      }
      // Generic duplicate error
      return res.status(400).json({
        success: false,
        message: "Data sudah terdaftar sebelumnya",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Data tidak valid",
        errors: validationErrors,
      });
    }

    res.status(400).json({
      success: false,
      message: "Error saat mendaftarkan peserta",
      error: error.message,
    });
  }
});

// PUT - Update data peserta
router.put("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data peserta berhasil diupdate",
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat update data peserta",
      error: error.message,
    });
  }
});

// PUT - Update status turnamen peserta
router.put("/:id/turnamen", async (req, res) => {
  try {
    const {
      status,
      babak,
      skor,
      waktuPenyelesaian,
      ranking,
      alasanDiskualifikasi,
      juara,
      hadiah,
      catatanJuri,
    } = req.body;

    const updateData = {};

    if (status) updateData.status = status;
    if (babak) updateData.babak = babak;
    if (skor !== undefined) updateData.skor = skor;
    if (waktuPenyelesaian !== undefined)
      updateData.waktuPenyelesaian = waktuPenyelesaian;
    if (ranking !== undefined) updateData.ranking = ranking;
    if (alasanDiskualifikasi)
      updateData.alasanDiskualifikasi = alasanDiskualifikasi;
    if (juara) updateData.juara = juara;
    if (hadiah) updateData.hadiah = hadiah;
    if (catatanJuri) updateData.catatanJuri = catatanJuri;

    // Auto-update boolean flags
    if (status === "Diskualifikasi") {
      updateData.isDiskualifikasi = true;
      updateData.tanggalDiskualifikasi = new Date();
      updateData.isLolos = false;
      updateData.isJuara = false;
    } else if (status === "Lolos ke Babak Selanjutnya") {
      updateData.isLolos = true;
      updateData.isDiskualifikasi = false;
      updateData.isJuara = false;
    } else if (status.includes("Juara")) {
      updateData.isJuara = true;
      updateData.isLolos = true;
      updateData.isDiskualifikasi = false;
    }

    const peserta = await Peserta.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status turnamen peserta berhasil diupdate",
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat update status turnamen",
      error: error.message,
    });
  }
});

// PUT - Diskualifikasi peserta
router.put("/:id/diskualifikasi", async (req, res) => {
  try {
    const { alasanDiskualifikasi } = req.body;

    if (!alasanDiskualifikasi) {
      return res.status(400).json({
        success: false,
        message: "Alasan diskualifikasi wajib diisi",
      });
    }

    const peserta = await Peserta.findByIdAndUpdate(
      req.params.id,
      {
        status: "Diskualifikasi",
        alasanDiskualifikasi,
        tanggalDiskualifikasi: new Date(),
        isDiskualifikasi: true,
        isLolos: false,
        isJuara: false,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Peserta berhasil didiskualifikasi",
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat mendiskualifikasi peserta",
      error: error.message,
    });
  }
});

// PUT - Set juara
router.put("/:id/juara", async (req, res) => {
  try {
    const { juara, hadiah, catatanJuri } = req.body;

    if (!juara || !["Juara 1", "Juara 2", "Juara 3"].includes(juara)) {
      return res.status(400).json({
        success: false,
        message: "Juara harus diisi dengan Juara 1, 2, atau 3",
      });
    }

    const peserta = await Peserta.findByIdAndUpdate(
      req.params.id,
      {
        status: juara,
        juara,
        hadiah: hadiah || "",
        catatanJuri: catatanJuri || "",
        isJuara: true,
        isLolos: true,
        isDiskualifikasi: false,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: `Peserta berhasil diset sebagai ${juara}`,
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat set juara",
      error: error.message,
    });
  }
});

// PUT - Lolos ke babak selanjutnya
router.put("/:id/lolos", async (req, res) => {
  try {
    const { babak, skor, waktuPenyelesaian, ranking, catatanJuri } = req.body;

    const updateData = {
      status: "Lolos ke Babak Selanjutnya",
      isLolos: true,
      isDiskualifikasi: false,
      isJuara: false,
    };

    if (babak) updateData.babak = babak;
    if (skor !== undefined) updateData.skor = skor;
    if (waktuPenyelesaian !== undefined)
      updateData.waktuPenyelesaian = waktuPenyelesaian;
    if (ranking !== undefined) updateData.ranking = ranking;
    if (catatanJuri) updateData.catatanJuri = catatanJuri;

    const peserta = await Peserta.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Peserta berhasil lolos ke babak selanjutnya",
      data: peserta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error saat update status lolos",
      error: error.message,
    });
  }
});

// GET - Peserta berdasarkan status turnamen
router.get("/turnamen/status/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const peserta = await Peserta.find({ status })
      .sort({ ranking: 1, skor: -1, waktuPenyelesaian: 1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta berdasarkan status",
      error: error.message,
    });
  }
});

// GET - Peserta berdasarkan babak
router.get("/turnamen/babak/:babak", async (req, res) => {
  try {
    const { babak } = req.params;
    const peserta = await Peserta.find({ babak })
      .sort({ ranking: 1, skor: -1, waktuPenyelesaian: 1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data peserta berdasarkan babak",
      error: error.message,
    });
  }
});

// GET - Ranking peserta berdasarkan lomba
router.get("/turnamen/ranking/:jenisLomba", async (req, res) => {
  try {
    const { jenisLomba } = req.params;
    const peserta = await Peserta.find({
      jenisLomba,
      status: { $nin: ["Diskualifikasi", "Ditolak"] },
      isLolos: true,
    })
      .sort({ ranking: 1, skor: -1, waktuPenyelesaian: 1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: peserta.length,
      data: peserta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil ranking peserta",
      error: error.message,
    });
  }
});

// GET - Juara berdasarkan lomba
router.get("/turnamen/juara/:jenisLomba", async (req, res) => {
  try {
    const { jenisLomba } = req.params;
    const juara = await Peserta.find({
      jenisLomba,
      status: { $in: ["Juara 1", "Juara 2", "Juara 3"] },
    })
      .sort({
        status: 1, // Juara 1, 2, 3
      })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: juara.length,
      data: juara,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil data juara",
      error: error.message,
    });
  }
});

// DELETE - Hapus peserta
router.delete("/:id", async (req, res) => {
  try {
    const peserta = await Peserta.findByIdAndDelete(req.params.id);

    if (!peserta) {
      return res.status(404).json({
        success: false,
        message: "Peserta tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Peserta berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat menghapus peserta",
      error: error.message,
    });
  }
});

// GET - Statistik peserta
router.get("/stats/summary", async (req, res) => {
  try {
    const totalPeserta = await Peserta.countDocuments();
    const pesertaPerLomba = await Peserta.aggregate([
      {
        $group: {
          _id: "$jenisLomba",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const statusCounts = await Peserta.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPeserta,
        pesertaPerLomba,
        statusCounts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saat mengambil statistik",
      error: error.message,
    });
  }
});

module.exports = router;
