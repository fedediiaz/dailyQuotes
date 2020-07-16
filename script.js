(function () {
  // Cache Elements
  quoteText = document.getElementById("quote");
  quoteAuthor = document.getElementById("cite");

  async function getData() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getQuote(data) {
    const quoteNum = randomBetween(0, length);
    const selectedQuote = data[quoteNum];

    const { text, author } = selectedQuote;

    if (text && author) return { text, author };

    getQuote(data);
  }

  getData()
    .then((data) => {
      length = data.length;

      const selectedQuote = getQuote(data);

      quoteText.textContent = selectedQuote.text;
      quoteAuthor.textContent = selectedQuote.author;
    })
    .catch((err) => {
      console.log(err);
    });

  // End of IIFE
})();
