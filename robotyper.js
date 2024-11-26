document.addEventListener("DOMContentLoaded", () => {
    let started = false;
    let completed = false;
    let startTime, endTime;
    let texts = [
        `The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela`,
        `Try not to become a man of success. Rather become a man of value. - Albert Einstein`,
        `In the middle of every difficulty lies opportunity. - Albert Einstein`,
        `Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill`,
        `You miss 100% of the shots you don’t take. - Wayne Gretzky`,
        `The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt`,
        `It does not matter how slowly you go as long as you do not stop. - Confucius`,
        `Life is what happens when you're busy making other plans. - John Lennon`,
        `Do what you can, with what you have, where you are. - Theodore Roosevelt`,
        `Happiness is not something ready made. It comes from your own actions. - Dalai Lama`,
        `If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein`,
        `The best way to predict the future is to invent it. - Alan Kay`,
        `You cannot shake hands with a clenched fist. - Indira Gandhi`,
        `The only way to do great work is to love what you do. - Steve Jobs`,
        `Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs`,
        `It always seems impossible until it’s done. - Nelson Mandela`,
        `To handle yourself, use your head; to handle others, use your heart. - Eleanor Roosevelt`,
        `What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar`,
        `Perfection is not attainable, but if we chase perfection we can catch excellence. - Vince Lombardi`
      ];
      
    const selectText = () => texts[Math.floor(Math.random() * texts.length)];
    let currentText = selectText();
  
    const displayNode = document.getElementById("display");
    const inputNode = document.getElementById("type-speed-input");
    const newTestNode = document.getElementById("newTest");
  
    const wordCountNode = document.getElementById("word-count");
    const errorCountNode = document.getElementById("error-count");
    const accuracyNode = document.getElementById("accuracy");
    const wpmNode = document.getElementById("wpm");
    const timeNode = document.getElementById("typing-time");
    const mistypedNode = document.getElementById("mistyped-words");
  
    const resetMetrics = () => {
      wordCountNode.textContent = "0";
      errorCountNode.textContent = "0";
      accuracyNode.textContent = "100%";
      wpmNode.textContent = "0";
      timeNode.textContent = "(not done)";
      mistypedNode.textContent = "0";
    };
  
    const startTest = () => {
      started = true;
      completed = false;
      startTime = new Date();
    };
  
    const updateDisplayWithCursor = (userInput) => {
      let inputWords = userInput.split(" ").filter(Boolean);
      let currentWords = currentText.split(" ");
      let highlightedText = "";
  
      for (let i = 0; i < currentWords.length; i++) {
        if (i < inputWords.length - 1) {
          // Highlight correctly typed words in green
          if (inputWords[i] === currentWords[i]) {
            highlightedText += `<span style="background-color: lightgreen;">${currentWords[i]}</span> `;
          } else {
            // Highlight mistyped words in red
            highlightedText += `<span style="background-color: lightcoral;">${currentWords[i]}</span> `;
          }
        } else if (i === inputWords.length - 1) {
          // Add cursor for the current word
          let typedSoFar = inputWords[i] || "";
          let remaining = currentWords[i].slice(typedSoFar.length);
          highlightedText += `
            <span style="background-color: lightyellow;">
              <span style="text-decoration: underline;">${typedSoFar}</span>${remaining}
            </span> `;
        } else {
          // Leave untyped words unhighlighted
          highlightedText += `${currentWords[i]} `;
        }
      }
  
      displayNode.innerHTML = highlightedText.trim();
    };
  
    const calculateMetrics = () => {
      let userInput = inputNode.value;
      let inputWords = userInput.split(" ").filter(Boolean);
      let currentWords = currentText.split(" ");
      wordCountNode.textContent = inputWords.length;
  
      let errors = inputWords.reduce((acc, word, index) => acc + (word !== currentWords[index] ? 1 : 0), 0);
      errorCountNode.textContent = errors;
      mistypedNode.textContent = errors;
  
      let accuracy = ((userInput.length - errors) / userInput.length) * 100 || 0;
      accuracyNode.textContent = `${Math.round(accuracy)}%`;
  
      if (inputWords.length === currentWords.length) {
        completed = true;
        endTime = new Date();
        let elapsedSeconds = (endTime - startTime) / 1000;
        timeNode.textContent = `${Math.floor(elapsedSeconds / 60)}m ${Math.floor(elapsedSeconds % 60)}s`;
  
        let wpm = (inputWords.length / (elapsedSeconds / 60)).toFixed(2);
        wpmNode.textContent = wpm;
      }
  
      updateDisplayWithCursor(userInput);
    };
  
    inputNode.addEventListener("input", () => {
      if (!started) startTest();
      calculateMetrics();
    });
  
    newTestNode.addEventListener("click", () => {
      resetMetrics();
      currentText = selectText();
      displayNode.innerHTML = currentText;
      inputNode.value = "";
      started = false;
      completed = false;
    });
  
    // Initialize the first test
    displayNode.innerHTML = currentText;
  });
  