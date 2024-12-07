const challenges = [
    { id: 1, description: "Beber 2 litros de água", reward: 10 },
    { id: 2, description: "Adicionar vegetais à refeição", reward: 15 },
    { id: 3, description: "Evitar alimentos processados", reward: 20 },
  ];
  
  const rewards = [
    { id: 1, name: "Recompensa 1", cost: 1, img: "DALL·E 2024-11-24 21.04.58 - A reward-themed image representing a sleek water bottle as a prize. The bottle should have a modern, minimalist design with a metallic finish and a st.webp" },
    { id: 2, name: "Recompensa 2", cost: 2, img: "DALL·E 2024-11-24 21.02.56 - A reward-themed image representing one year of free whey protein. A sleek container of whey protein with a stylish label featuring a bold fitness desi.webp" },
    { id: 3, name: "Recompensa 3", cost: 3, img: "DALL·E 2024-11-24 20.59.55 - A reward-themed image representing a lifetime gym membership. A golden gym pass card with a sleek design, featuring a fitness logo (like dumbbells or .webp" },
  ];
  
  let user = JSON.parse(localStorage.getItem("user")) || {
    coins: 0,
    completedChallenges: {}, 
    claimedRewards: [], 
  };
  
  const updateCoinBalance = () => {
    document.getElementById("coin-balance").textContent = user.coins;
    localStorage.setItem("user", JSON.stringify(user)); 
  };
  
  const renderChallenges = () => {
    const challengeList = document.getElementById("challenge-list");
    challengeList.innerHTML = ""; 
  
    challenges.forEach((challenge) => {
      const lastCompleted = user.completedChallenges[challenge.id];
      const now = new Date().getTime();
      const canComplete = !lastCompleted || now - lastCompleted >= 24 * 60 * 60 * 1000; 
  
      const li = document.createElement("li");
      li.className = "challenge-item";
      li.innerHTML = `
        <span>${challenge.description} - ${challenge.reward} pontos</span>
        <button 
          onclick="completeChallenge(${challenge.id}, ${challenge.reward})" 
          ${canComplete ? "" : "disabled"}>
          ${canComplete ? "Completar" : "Aguarde"}
        </button>
      `;
      challengeList.appendChild(li);
    });
  };
  
  const completeChallenge = (id, reward) => {
    const now = new Date().getTime();
    user.coins += reward;
    user.completedChallenges[id] = now; 
    updateCoinBalance();
    renderChallenges();
    renderRewards();
    alert("Desafio completo! Pontos adicionados.");
  };
  
  const renderRewards = () => {
    const rewardsList = document.querySelector(".rewards-list");
    rewardsList.innerHTML = ""; 
  
    rewards.forEach((reward) => {
      const canClaim = user.coins >= reward.cost && !user.claimedRewards.includes(reward.id);
  
      const div = document.createElement("div");
      div.className = "reward-item";
      div.innerHTML = `
        <span>${reward.name} - ${reward.cost} pontos</span>
        <button 
          onclick="claimReward(${reward.id}, '${reward.name}', ${reward.cost}, '${reward.img}')" 
          ${canClaim ? "" : "disabled"}>
          ${canClaim ? "Resgatar" : "Bloqueado"}
        </button>
      `;
      rewardsList.appendChild(div);
    });
  };
  
  const claimReward = (id, name, cost, img) => {
    if (user.coins < cost) {
      alert("Pontos insuficientes!");
      return;
    }
  
    user.coins -= cost;
    user.claimedRewards.push(id); 
    updateCoinBalance();
    renderRewards();
    showPopup(name, img);
  };
  
  const showPopup = (name, img) => {
    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popup-image");
    const popupMessage = document.getElementById("popup-message");
  
    popupImage.src = img;
    popupMessage.textContent = `${name} foi resgatado com sucesso!`;
  
    popup.classList.remove("hidden");
  };
  
  const closePopup = () => {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateCoinBalance();
    renderChallenges();
    renderRewards();
  });
  