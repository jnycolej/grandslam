let multiplayer = false;

async function fetchJSONData() {
    try {
        const res = await fetch("../data/output.json")
        if(!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null;
    }
}


async function generateHand(){
    const deck = await fetchJSONData();
    const hand = document.getElementById("hand");
    hand.innerHTML = '';

    for(let i = 0; i < 5; i++){
        let randNum = Math.floor(Math.random() * (deck.cards.length));
        let card = deck.cards[randNum];

        let cardElement = document.createElement('p');
        cardElement.innerHTML = `<div class="col">${card.description}<br><br>${card.penalty}<br><br>Points: ${card.points}</div>`;
        cardElement.className = 'card';
        cardElement.style.cursor = 'pointer';

        cardElement.addEventListener('click', () => {
            
            if (multiplayer) {
                socket.emit('play card', roomCode, card);
            } else {
                useCard(card, cardElement, deck);
            }
        });

        hand.appendChild(cardElement);
    }
}

let totalPoints = 0;

function useCard(card, cardElement, deck){ 
    console.log(`Card clicked: ${card.description}, Points: ${card.points}`);
    totalPoints += parseInt(card.points, 10);
    console.log(`Total Points: ${totalPoints}`);

    document.getElementById("totalPoints").textContent = totalPoints;

    var randNum = Math.floor(Math.random() * deck.cards.length);
    const newCard = deck.cards[randNum];
    cardElement.innerHTML = `${newCard.description}<br><br>${newCard.penalty}<br><br>Points: ${newCard.points}`;
}