    $(function(){
    let handContainer = document.getElementById("hand")
    let deck = {
        cards : ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'rPlus2', 'rFiftyFifty', 'rDiscard', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'rPlus2', 'rFiftyFifty', 'rDiscard','b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'bPlus2', 'bFiftyFifty', 'bDiscard', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'bPlus2', 'bFiftyFifty', 'bDiscard','g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'gPlus2', 'gFiftyFifty', 'gDiscard', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'gPlus2', 'gFiftyFifty', 'gDiscard','y0', 'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'yPlus2', 'yFiftyFifty', 'yDiscard', 'y1', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8', 'y9', 'yPlus2', 'yFiftyFifty', 'yDiscard','BWild', 'BPlus4','BWild', 'BPlus4','BWild', 'BPlus4','BWild', 'BPlus4',],
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
            console.log(shufflingCards)
            for(let i = 0; i < shufflingCards.length; i++){
                this.drawPile.push(shufflingCards[i])
            }

        },
        drawPile: [],
        discardPile: [],
        topCard: "",
    }
    
    function drawCard(){
        let cardDrawn = deck.drawPile.shift();
        
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
        newCard.setAttribute("card", cardDrawn);
        // Onclick 
        newCard.onclick = function(){playCard(cardDrawn)}

        //Adding it in the right order
        let sortNum = deck.cards.indexOf(cardDrawn);
        newCard.setAttribute("sortNum", sortNum)
        handContainer.append(newCard);
        newCard = $(`[card = ${cardDrawn}]`)
        
        let currHand = $('.card')
        if(currHand.length == 0){
            return;
        }
        for(let i = 0; i < currHand.length; i++){
            let newSortNum = $(currHand[i]).attr('sortNum')
            if(sortNum < newSortNum){
                newCard.remove();
                newCard.insertBefore(currHand[i])
                break;
            }
        }
        newCard.css("height", "14.4rem")
        newCard.css("width", "9.6rem")
        newCard.css("font-size", "2.4rem")
        newCard.css("line-height", "14.4rem")
        setTimeout(function(){
            newCard.css("height", "12rem")
            newCard.css("width", "8rem")
            newCard.css("font-size", "2rem")
            newCard.css("line-height", "12rem")
        }, 300)


    }

    function drawCards(amount = 1, delay){
        let interval = setInterval(drawCard, delay);
        setTimeout(function(){clearInterval(interval)}, delay * amount)
    }

    function playCard(card){
        let topCard = deck.topCard;
        let topColor = topCard.charAt(0);
        let newColor = card.charAt(0);
        let topType = topCard.substring(1);
        let newType = card.substring(1);

        if(topColor == newColor || topType == newType || newType == "Wild" || newType == "Plus4" || topType == "Wild" || topType == "Plus4"){
            changeTopCard(card);
            $(`[card = ${card}]`)[0].remove();
            if(newType == 'Plus4'){
                removeCards(4);
            }
            if(newType == 'Plus2'){
                removeCards(2);
            }
            if(newType == 'FiftyFifty'){
                fiftyFifty();
            }
            if(newType == 'Discard'){
                discardAll(newColor);
            }

        }
        
        if($('.card').length == 0){
            alert("CONGRATULATIONS! YOU WIN!")
        }
    }

    function removeCards(amount){
        let hand = $('.card');
        if(amount > hand.length){
            amount = hand.length;
        }
        for(let i = 0; i < amount; i++){
            hand = $('.card');
            let randy = Math.floor(Math.random() * hand.length)
            deck.discardPile.push($(hand[randy]).attr('card'))
            hand[randy].remove();
        }
    }
    function fiftyFifty(){
        let randy = Math.floor(Math.random() * 2)
        if(randy == 0){
            drawCard();
        }else{
            removeCards(1)
        }
    }
    function discardAll(color){
        let hand = $('.card');
        for(let i = 0; i < hand.length; i++){
            if(color == $(hand[i]).attr('card').charAt(0)){
                deck.discardPile.push($(hand[i]).attr('card'))
                $(hand[i]).remove();
            }
        }
    }

    

    function changeTopCard(newCard){
        deck.discardPile.push(deck.topCard)
        deck.topCard = newCard;
        let color = ""
        $('.discardPile').css("color", 'white')
        switch(newCard.charAt(0)){
            case 'r':
                color = 'red';
                break;
            case 'b':
                color = 'blue';
                break;
            case 'y':
                color = 'yellow';
                $('.discardPile').css("color", 'black')
                break;
            case 'g':
                color = 'green';
                break;
            case 'B':
                color = 'black';
                break;
        } 

        $('.discardPile').css("background-color", color).text(newCard.substring(1))

    }


    function startGame(){
        deck.shuffle();
        drawCards(7, 100);
        let firstCard = deck.drawPile.shift();
        changeTopCard(firstCard)
    }

    function reshuffle(){
        deck.discardPile.shift()
        deck.shuffle(deck.discardPile);
        deck.discardPile = [];
    }
    startGame()
    $('.drawPile').on("click", drawCard)
    $('#shuffle').on("click", reshuffle)
})