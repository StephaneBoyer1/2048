let grille;
let ligne;
let score = 0;

function isGameWon(){
    for (let i = 0; i < 4; i++) {       
            for (let j = 0; j < 4; j++) {
                if(grille[i][j] == 2048){
                    return true;
                }
            }
        }
    return false;
}



function isGameOver(){
    for (let i = 0; i < 4; i++) {       
            for (let j = 0; j < 4; j++) {

                if(grille[i][j] == 0){
                    return false;
                }

                if(i !== 3 && grille[i][j] == grille[i + 1][j]){
                    return false;
                }

                if(j !== 3 && grille[i][j] == grille[i][j + 1]){
                    return false;
                }
            }
        }
 return true;
}


function grilleVide(){
 return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];

}

function setup() {
    createCanvas(400, 400);
    grille = grilleVide();
    console.table(grille);
    ajouterNombre();
    ajouterNombre();
    console.table(grille);

}
   



//on ajoute un nombre
function ajouterNombre() {
    let option = []; //on crée un tableau vide
    for (let i = 0; i < 4; i++) {       //on boucle le tableau d'origine
        for (let j = 0; j < 4; j++) {
            if (grille[i][j] === 0) {   //si toutes les cases sont à 0
                option.push({           //alors on met dans le nouveau tableau option les valeurs à 0
                    x: i,
                    y: j
                });
            }
        }
    }

    if(option.length >0){ //si le tableau n'est pas vide
    let point = random(option); //on prend un point au hasard sur la nouvelle grille
    grille[point.x][point.y] = random(1) > 0.2 ? 2 : 4 //on choisit le 2 ou le 4 aléatoirement
    }
}


function compare(a,b){
    
    for (let i = 0; i < 4; i++) {       
            for (let j = 0; j < 4; j++) {
              if(a[i][j] !== b[i][j]){
                return true;
              }
            }
        }
        return false;
}

function copyGrille(){
    let extra = grilleVide();
    for (let i = 0; i < 4; i++) {       
            for (let j = 0; j < 4; j++) {
                extra[i][j] = grille[i][j];
            }
        }
    return extra;    
}

//Inverse la grille
function flipGrille(grille){
    for (let i = 0; i < 4; i++) {
        grille[i].reverse();
    }
    return grille;
}

function rotateGrille(grille){
    let nouvelleGrille = grilleVide();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++){
            nouvelleGrille[i][j] = grille[j][i];
        }
       
    }
    return nouvelleGrille;
}



//mouvement vers le bas
function keyPressed(){
let flipped = false;
let rotaded = false;
let played = true;

    if(keyCode === DOWN_ARROW){
        //Ne rien faire
    } else if (keyCode === UP_ARROW){
        grille = flipGrille(grille); //On renverse la grille.s
        flipped = true; //ono dit que la grille a été retournée.
    } else if (keyCode === RIGHT_ARROW){
        
        grille = rotateGrille(grille);
        rotaded = true;
    } else if (keyCode === LEFT_ARROW){
        grille = rotateGrille(grille);
        grille = flipGrille(grille);
        rotaded = true;
        flipped = true;
    } else { 
        played = false; 
    }


    if(played){
    let past =  copyGrille(grille);
    
    for(let i = 0; i < 4; i++){grille[i] = operate(grille[i]);}
           
    
    let changed = compare(past, grille);
    
    if(flipped){
    grille = flipGrille(grille); 
    }
        
    if(rotaded){
        grille = rotateGrille(grille);
        grille = rotateGrille(grille);
        grille = rotateGrille(grille);
    }

    if(changed){
    ajouterNombre(); 
    }
    
    let gameWon = isGameWon();
    if(gameWon){
        alert('Gagné');
    }

    let gameOver = isGameOver();
    if(gameOver){
        alert('Jeux Fin');
    }
   
   }            
}


function operate(ligne){
    ligne = slide(ligne);
    ligne = combine(ligne);
    ligne = slide(ligne);
    return ligne;
}
    
function draw() {
    background('grey');
    celluleDemarrage();
    select('#score').html(score);
    }



//On fait glisser les lignes
function slide(ligne){
    let arr = ligne.filter(val =>val);
    let missing = 4 -arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

//on fusionne les chiffres identiques
function combine(ligne){
    for(let i = 3; i>=1; i--){

        let a = ligne[i];
        let b = ligne[i - 1];
        if(a == b){
        ligne[i] = a + b;
        score += ligne[i];
        ligne[i - 1] = 0;
       
        }
    }
    return ligne;
}

 function celluleDemarrage(){
    let l = 100 ;
    for (let i = 0; i < 4; i++) {       
            for (let j = 0; j < 4; j++) {
                noFill(); //On crée le rectangle avec la grille
                strokeWeight(2);
                stroke(0);
                rect(i*l, j*l, l, l,10);
                let val = grille[i][j];
                if(grille[i][j] !== 0 ){
                textAlign(CENTER,CENTER);
                textSize(64);
                fill(5);
                noStroke();
                text(val, i * l + l / 2, j * l + l / 2)
            }

        }
    }
 }







