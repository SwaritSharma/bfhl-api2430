// bajaj/api/bfhl.js

// This is a serverless function for Vercel.
// It handles both GET requests to the root path and POST requests to /bfhl.

module.exports = async (req, res) => {
  // --- 1. Handle GET request for the root path (/) ---
  // This is crucial for Vercel's default health check and for users visiting the base URL.
  if (req.method === "GET" && req.url === "/") {
    return res.status(200).json({
      message: "BFHL API is running. Send a POST request to /bfhl with your data.",
      status: "success",
      user_id: "swarit_sharma_1022002", // Include placeholders as per project requirements
      email: "swarit2430.be22@chitkara.edu.in",
      roll_number: "2210992430"
    });
  }

  // --- 2. Handle POST request for /bfhl ---
  if (req.method !== "POST") {
    // If the method is not POST, return 405 Method Not Allowed
    return res.status(405).json({
      is_success: false,
      user_id: "swarit_sharma_1022002",
      email: "swarit2430.be22@chitkara.edu.in",
      roll_number: "2210992430",
      message: "Method Not Allowed. This endpoint only accepts POST requests."
    });
  }

  // --- Parse the request body ---
  // Vercel's @vercel/node runtime typically parses JSON automatically,
  // but we add a try-catch for robustness in case of malformed JSON.
  let data;
  try {
    // req.body should already be parsed by Vercel's runtime for application/json
    data = req.body.data;
  } catch (e) {
    return res.status(400).json({
      is_success: false,
      user_id: "swarit_sharma_1022002",
      email: "swarit2430.be22@chitkara.edu.in",
      roll_number: "2210992430",
      message: "Invalid JSON in request body."
    });
  }

  // --- Validate input: 'data' must be an array ---
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: "swarit_sharma_1022002",
      email: "swarit2430.be22@chitkara.edu.in",
      roll_number: "2210992430",
      message: "Invalid input: 'data' must be an array."
    });
  }

  // --- Define static user details ---
  const userId = "swarit_sharma_1022002";
  const email = "swarit2430.be22@chitkara.edu.in";
  const rollNumber = "2210992430";

  // --- Initialize result arrays and variables ---
  let evenNumbers = [];
  let oddNumbers = [];
  let alphabets = [];
  let specialCharacters = [];
  let sum = 0;
  let concatStringSource = ''; // Temporary string to build for concat_string

  // --- Process each item in the input data array ---
  data.forEach(item => {
    // Ensure item is treated as a string for consistent checks
    const itemStr = String(item).trim(); // Trim whitespace

    // Skip empty strings
    if (itemStr === '') {
      return;
    }

    // Check if it's a number (can be parsed as an integer)
    // Use a regex to ensure it's a valid integer string before parsing
    if (/^-?\d+$/.test(itemStr)) {
      const num = parseInt(itemStr, 10); // Specify radix 10 for safety
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(itemStr); // Push as string as per requirement
      } else {
        oddNumbers.push(itemStr); // Push as string as per requirement
      }
    } else if (/^[a-zA-Z]+$/.test(itemStr)) {
      // Check if it's purely alphabetic (handles single chars and words like "ABcD")
      alphabets.push(itemStr.toUpperCase());
      concatStringSource += itemStr; // Add to source string for concatenation
    } else {
      // If not a number and not purely alphabetic, it's a special character
      specialCharacters.push(itemStr);
    }
  });

  // --- Generate concat_string: reverse order, alternating caps ---
  let finalConcatString = '';
  const reversedSource = concatStringSource.split('').reverse().join('');
  for (let i = 0; i < reversedSource.length; i++) {
    const char = reversedSource[i];
    if (i % 2 === 0) {
      finalConcatString += char.toUpperCase();
    } else {
      finalConcatString += char.toLowerCase();
    }
  }

  // --- Return the final structured response ---
  return res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets: alphabets,
    special_characters: specialCharacters,
    sum: sum.toString(), // Sum returned as a string
    concat_string: finalConcatString
  });
};