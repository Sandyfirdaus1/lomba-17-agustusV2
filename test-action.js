const axios = require("axios");

// Test quick action route
async function testQuickAction() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/peserta/test-id/action",
      {
        action: "Lolos",
      }
    );

    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

// Test dengan action yang berbeda
async function testAllActions() {
  const actions = ["Lolos", "Juara 1", "Juara 2", "Juara 3", "DQ"];

  for (const action of actions) {
    try {
      console.log(`\nTesting action: ${action}`);
      const response = await axios.post(
        "http://localhost:5000/api/peserta/test-id/action",
        {
          action: action,
        }
      );
      console.log("Success:", response.data.message);
    } catch (error) {
      console.error(
        `Error with ${action}:`,
        error.response?.data?.message || error.message
      );
    }
  }
}

// Jalankan test
console.log("Testing Quick Action Route...\n");
testAllActions();
