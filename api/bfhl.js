export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ is_success: false, message: 'Method not allowed' });
  }

  try {
    const fullName = 'swarit_sharma';
    const dob = '10122002';
    const email = 'swarit2430.be22@chitkara.edu.in';
    const rollNumber = '2210992430';

    function isNumber(str) {
      return /^\d+$/.test(str);
    }

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
      } else {
        if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
          for (let ch of item) allAlphaChars.push(ch);
        } else {
          if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item.toUpperCase());
            for (let ch of item) {
              if (/[a-zA-Z]/.test(ch)) allAlphaChars.push(ch);
            }
          } else {
            special_characters.push(item);
          }
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
}
