    $(function(){
    let hand = [];
    let handContainer = document.getElementById("hand")
    let deck = {
        amount: 108,
        cards : ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'rPlus2', 'rReverse', 'rSkip', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'rPlus2', 'rReverse', 'rSkip','b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'bPlus2', 'bReverse', 'bSkip', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'bPlus2', 'bReverse', 'bSkip','g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'gPlus2', 'gReverse', 'gSkip', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'gPlus2', 'gReverse', 'gSkip','y0', 'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'yPlus2', 'yReverse', 'ySkip', 'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'yPlus2', 'yReverse', 'ySkip','BWild', 'BPlus4','BWild', 'BPlus4','BWild', 'BPlus4','BWild', 'BPlus4',],
        shuffle : function(cards = this.cards){
            let shufflingCards = [];
            
            for(let i = 0; i < cards.length; i++){
                let randy = Math.floor(Math.random() * cards.length)
                if(shufflingCards[randy] == undefined){
                    shufflingCards[randy] = cards[i]
                }else{
                    --i;
                }
            }
            for(let i = 0; i < shufflingCards.length; i++){
                this.drawPile.push(shufflingCards[i])
            }
            console.log(this.drawPile)

        },
        drawPile: [],
        usedCards: [],
    }
    
    function drawCard(amount = 1){
        let cardDrawn = deck.drawPile.shift();
        hand.push(cardDrawn)
        
        let newCard = document.createElement("div");
        newCard.classList += "card"
        let color = cardDrawn.charAt(0)
        switch(color){
            case 'r':
                newCard.style.backgroundColor = "red"
                newCard.style.color = "white"
                break;
            case 'b':
                newCard.style.backgroundColor = "blue"
                newCard.style.color = "white"
                break;
            case 'g':
                newCard.style.backgroundColor = "green"
                newCard.style.color = "white"
                break;
            case 'y':
                newCard.style.backgroundColor = "yellow"
                break;
            default:
                newCard.style.backgroundColor = "black"
                newCard.style.color = "white"
        }
        // Text on the card
        let text = cardDrawn.substring(1)
        newCard.innerHTML = text;
        // Onclick 
        newCard.on("click", function(){playCard(cardDrawn)})

        handContainer.append(newCard);
    }

    function playCard(card){
        console.log(card)
    }

    deck.shuffle();

    $('.drawPile').on("click", drawCard)
})