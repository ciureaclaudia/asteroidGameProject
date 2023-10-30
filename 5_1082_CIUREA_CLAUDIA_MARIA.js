window.onload = function (){
    const canvas=document.getElementById('canvas1');
    const context=canvas.getContext('2d');
    
    canvas.width=750;
    canvas.height=550;


    class Asteroid{
        constructor(x,y,dx,dy){
            this.Xasterioid=x
            this.Yasteroid=y
            this.dx=dx //viteza
            this.dy=dy//viteza
            this.nrVieti=Math.floor(Math.random() *4 )+1 ;
            this.vizibilitate=true    
                
        }//CONSTRUCTOR-END

        draw(){
           
            //desenez doar daca vizibilitatea e true
        if(this.vizibilitate==true){

            if(this.nrVieti==4){
                this.radiusasteroid=30
                this.colorasteroid="green"
            }else
            if(this.nrVieti==3){
                this.radiusasteroid=25
                this.colorasteroid="blue"
            }else
            if(this.nrVieti==2){
                this.radiusasteroid=20
                this.colorasteroid="purple"
            }else
            if(this.nrVieti==1){
                this.radiusasteroid=15
                this.colorasteroid="pink"
            }

            context.beginPath();
            context.arc(this.Xasterioid,this.Yasteroid,this.radiusasteroid,0*Math.PI,2*Math.PI)
            context.fillStyle = this.colorasteroid;
            context.fill();

            context.strokeStyle=this.colorasteroid;
            context.lineWidth = 3;
            context.fillStyle = 'white';
            context.textAlign = 'center';
       
            if(this.radiusasteroid==30 || this.radiusasteroid==25 ||this.radiusasteroid==20){
                context.font = '20pt Calibri';
                context.fillText(this.nrVieti, this.Xasterioid,this.Yasteroid+7);
            }
            else
                if(this.radiusasteroid==15){
                    context.font = '12pt Calibri';    
                    context.fillText(this.nrVieti, this.Xasterioid,this.Yasteroid+4);
                }
            context.closePath()
            context.stroke()
        }
        }//DRAW-END

        update(){
            if(this.Xasterioid + this.radiusasteroid > canvas.width || this.Xasterioid - this.radiusasteroid  < 0){
                this.dx = -this.dx
            }
            if(this.Yasteroid + this.radiusasteroid > canvas.height  || this.Yasteroid - this.radiusasteroid < 0){
                this.dy = -this.dy
            }
            this.Xasterioid += this.dx;
            this.Yasteroid += this.dy;

            this.draw()
        }
    }//END CLASA ASTEROID

    
    class NavaSpatiala{
        constructor(){
            this.xNava=canvas.width/2;
            this.yNava=2* canvas.height/3 +50;
            this.dx=0; //velx
            this.dy=0;//vely
            this.raza=15;
            // this.angle=0
           
        }

        draw(){
       
        context.beginPath();
        context.strokeStyle='white';
        context.lineWidth = 2.5;

        context.moveTo(this.xNava + this.dx, this.yNava + this.dy);
        context.lineTo(this.xNava-20 + this.dx, this.yNava+50 + this.dy);
        context.lineTo(this.xNava+20 + this.dx, this.yNava+50 + this.dy);
        
    
        context.closePath();
        context.stroke();
        }

    
        update(){
        
        // Constrangeri pentru iesirea navei din canvcas 
        if(this.xNava<this.raza){
            this.xNava=canvas.width;
        }
        if(this.yNava<this.raza){
            this.yNava=canvas.height;
        }
        if(this.xNava>canvas.width){
            this.xNava=this.raza;
        }
        if(this.yNava>canvas.height){
            this.yNava=this.raza;
        } 

        // incetineste nava cand nu e apasata tastatura
        this.dx*=0.96;
        this.dy*=0.96;

        // Miscare nava 
        this.xNava+=this.dx;
        this.yNava+=this.dy;

        this.draw()
        }
        
    }
//glont= racheta
class Glont{

    constructor(xGlont,yGlont,dxGlont,dyGlont){
        this.xGlont=xGlont;
        this.yGlont=yGlont;
        this.dxGlont=dxGlont //deplasare
        this.dyGlont=dyGlont
        this.raza=3
        this.timerUrmatorulGlont=0;
        this.vizibilitate=true
    }

    draw(){
        context.beginPath()
        context.arc(this.xGlont,this.yGlont,this.raza,0,Math.PI*2)
        context.fillStyle='red'
        context.fill()
        context.closePath()
    }
    update(){
        this.draw()
        this.xGlont+=this.dxGlont
        this.yGlont+=this.dyGlont
    }
}

class Scor{
    constructor(){
        this.nrVietiRamase=12 //asta trebuie scazut de fiecare data cand se atinge de un aster
        this.puncte=0
        this.asteroiziDistrusi=0

    }
}

    let gameOver=false;
    let coliziuneAsteroidNava=false;
    let nava=new NavaSpatiala()
    let gloanteLista=[] //vector pt gloante
    let glont=new Glont(nava.xNava,nava.yNava,0,-3)
    let intarziere=1
    var keys=[] //vector pt tastatura
    let scor=new Scor()

    

    //event si handler event
    window.addEventListener("keydown",handlerKeyDown);
    window.addEventListener("keyup",handlerKeyup);
    function handlerKeyDown(event){
        keys[event.keyCode]=true; //pt fiecare tasta apasata
        
        if(keys[37]){// STANGA
            nava.dx-=2
            console.log("apasat stanga")
        }
        if(keys[38]){// SUS
            nava.dy-=2
            console.log("apasat sus")
        }
        if(keys[39]){// DREAPTA
            nava.dx+=2
            console.log("apasat dreapta")
        }
        if(keys[40]){// JOS
            nava.dy+=2
            console.log("apasat jos") 
        }
        if(keys[90]){// ROTIRE STANGA
            console.log("rotire stg") 
      
            // context.save()
            // context.clearRect(0, 0, innerWidth, innerHeight);
            // context.translate(nava.xNava,nava.yNava)//canvas origin point
            
            // console.log("x rotire", nava.xNava)

            // let degree=30
            // let radians=(-1)*(degree*Math.PI/180) //transform gradele in radiani
            // context.rotate(radians)

            // nava.draw()

            // context.restore()

        }
        if(keys[67]){// ROTIRE DREAPTA
            console.log("rotire dreapta") 
            // nava.rotire(1)
        }
        if(keys[88]){//laseaza racheta
              gloanteLista.push(new Glont(nava.xNava,nava.yNava,0,-11))
        }  
        event.preventDefault();
        // nava.draw() 
    }

    function handlerKeyup(event){
        //mark keys that were releses
        keys[event.keyCode]=false;
    }
    

    const Asteroizi=[]
    for(let i=0; i<6;i++){
        //pt fiecare asteroid generez x, y random si viteza dx dy
        let x=(Math.random()* canvas.width) +10
        let y=(Math.random() * (canvas.height)) +10
        let dx= (Math.random()-1) *4
        let dy=(Math.random()-1) *5
        Asteroizi.push(new Asteroid(x,y,dx,dy))
    }

    poateFiLovita = true;
    function onNavaLovita(){
        if(poateFiLovita == true){
            scor.nrVietiRamase--
            poateFiLovita = false;
            setTimeout(()=>{poateFiLovita =true},1000)
        }       

    }

    function animare() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        nava.update()

        for(let i=0;i<gloanteLista.length;i++){
            //daca gloantele ies din canvas in partea de sus
            if( gloanteLista[i].y + gloanteLista[i].raza <=0 ){
                gloanteLista.splice(i,1) //scot din lista     
            }
            else{
                gloanteLista[i].update()
            }    
        }
    
        //SCOR
        context.fillStyle='white'
        context.font='15px Verdana'
        context.fillText("SCOR : " + scor.puncte, 40, 27);
        context.font='13.2px Verdana'
        context.fillText("Asteroizi distrusi : " + scor.asteroiziDistrusi , 70, 50);

        context.font='15px Verdana'
        context.fillText(scor.nrVietiRamase+" Vieti ramase" , 660, 25);

        let xast,yast;
        let xx, yy;//pt glont
        
        //parcurg asteroizii
        for(let i = 0; i < Asteroizi.length; i++){ 

            Asteroizi[i].update()
            Asteroizi[i].vizibilitate=true //setez din nou vizibilitatea pentru elementele ramase in lista
            coliziuneAsteroidNava=false

            xast=Asteroizi[i].Xasterioid
            yast=Asteroizi[i].Yasteroid

            //Coliziune asteroid-nava
            //asteroid Asteroizi[i] atinge nava => scor.nrVietiRamase-=1        
             const distantaVarf1=Math.sqrt(Math.pow( xast- nava.xNava ,2) +Math.pow(yast- (nava.yNava+30),2))
             const distantaVarf2=Math.sqrt(Math.pow( xast- (nava.xNava -20),2) +Math.pow(yast- (nava.yNava +50),2))
             const distantaVarf3=Math.sqrt(Math.pow( xast- (nava.xNava +20),2) +Math.pow(yast- (nava.yNava +50),2))
 
            
             if((distantaVarf1< Asteroizi[i].radiusasteroid || distantaVarf2< Asteroizi[i].radiusasteroid || distantaVarf3< Asteroizi[i].radiusasteroid) && Asteroizi[i].vizibilitate==true && Asteroizi[i].radiusasteroid!=0){
                console.log("Ast "+i+" atinge nava")
                onNavaLovita()
                // coliziuneAsteroidNava=true
            }
            
            if(coliziuneAsteroidNava===true){
                scor.nrVietiRamase--
                coliziuneAsteroidNava=false   
            }

            //Coliziune asteroid-racheta
            //pt fiecare asteroid parcurg lista de gloante
            for(let j=0;j<gloanteLista.length;j++){

                xx=gloanteLista[j].xGlont
                yy=gloanteLista[j].yGlont
                // console.log(xx, yy)
                if( yy < yast +Asteroizi[i].radiusasteroid && yy > yast -Asteroizi[i].radiusasteroid && (xx< xast+ Asteroizi[i].radiusasteroid && xx>xast- Asteroizi[i].radiusasteroid)){
                    
                        gloanteLista.splice(j,1)
                        Asteroizi[i].nrVieti--;
                        
                        if(Asteroizi[i].nrVieti==0 ){
                            scor.puncte+=5
                            scor.asteroiziDistrusi++

                            //creste scor
                            if(scor.asteroiziDistrusi%2==0 &&scor.asteroiziDistrusi!=0)
                            scor.nrVietiRamase+=1
 
                            Asteroizi[i].vizibilitate=false
                            Asteroizi.splice(i,1) //scot un aster din lista de la poz i
    
                            j=gloanteLista.length //ies din vectorul de gloante

                        }
                }
            }

             
            if(scor.asteroiziDistrusi==6 || scor.nrVietiRamase==0){
                window.removeEventListener("keydown", handlerKeyDown);
                window.removeEventListener("keyup", handlerKeyup);
                gameOver=true; // toti ast au fost distrusi
            
            }
        }

        if(!gameOver) //jocul nu e gata
            requestAnimationFrame(animare)

        else {
            
            //jocul e gata-> s au distrus toti astr
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle='white'

            context.font='30px Verdana'
            context.fillText("JOC TERMINAT", canvas.width/2, canvas.height/2);

            context.font='20px Verdana'
            context.fillText("SCOR : " + scor.puncte, canvas.width/2, canvas.height/2+30);
            context.fillText("Asteroizi distrusi : " + scor.asteroiziDistrusi , canvas.width/2, canvas.height/2+60);
            context.fillText(" Vieti ramase:"+scor.nrVietiRamase, canvas.width/2, canvas.height/2+90);
        }
        // console.log(scor.puncte)
    }
    animare()
}


