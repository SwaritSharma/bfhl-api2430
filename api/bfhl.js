// api/bfhl.js
module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input" });
  }

  const userId = "swarit_sharma_1022002";
  const email = "swarit2430.be22@chitkara.edu.in";
  const rollNumber = "2210992430";

  let evenNumbers = [];
  let oddNumbers = [];
  let alphabets = [];
  let specialCharacters = [];
  let sum = 0;
  let concatString = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      const num = parseInt(item);
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      concatString += item;
    } else {
      specialCharacters.push(item);
    }
  });

  concatString = concatString.split('').reverse().map((char, index) =>
    index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
  ).join('');

  return res.status(200).json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets: alphabets,
    special_characters: specialCharacters,
    sum: sum.toString(),
    concat_string: concatString
  });
};
