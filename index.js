const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


const fullName = 'swarit_sharma'; 
const dob = '10122002';       
const email = 'swarit2430.be22@chitkara.edu.in';
const rollNumber = '2210992430';

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabetic(str) {
  return /^[a-zA-Z]+$/.test(str);
}

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input, 'data' should be an array." });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphaChars = [];

    data.forEach(item => {
      if (typeof item !== 'string') {
        item = String(item);
      }

      if (isNumber(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (isAlphabetic(item)) {
        alphabets.push(item.toUpperCase());
        for (let ch of item) allAlphaChars.push(ch);
      } else {
        let hasAlpha = false;
        for (let ch of item) {
          if (/[a-zA-Z]/.test(ch)) {
            allAlphaChars.push(ch);
            hasAlpha = true;
          }
        }
        if (hasAlpha && /^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
        } else if (hasAlpha) {
          special_characters.push(item);
        } else {
          special_characters.push(item);
        }
      }
    });

    const reversedAlpha = allAlphaChars.reverse();
    let concat_string = '';
    reversedAlpha.forEach((ch, i) => {
      concat_string += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    });

    res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum.toString(),
      concat_string: concat_string
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
