
window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

  

    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;
    

    const randomizebtn = document.getElementById("randomizebtn")
    
    ctx.lineCap = "round";
    ctx.fillStyle = "green"
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // this is to crete variable size;
    let size = canvas.width < canvas.height? canvas.width*0.3 : canvas.height*0.3;
    
    const branches = 4

    const maxLevel = 3;
    let sides = 5
    let spread = 0.1
   
    let scale  = 0.5
    let color = 'hsl('+Math.random() * 360 + ', 100%, 50%)'
   let lineWidth = Math.floor(Math.random()*20 +10)

//    spread controls
    const slider_spread = document.getElementById("spread");
    const label_slider = document.querySelector("#spreadlabel")
    console.log(label_slider)
    slider_spread.addEventListener("change", function(e){
        spread = e.target.value;
        updateSliders()
        drawFractal()
        
    })

    // side controls
    const sideInput = document.getElementById("sideNumber");
    const sideLabel = document.getElementById("sideNumber_label");
    const resetBtn = document.getElementById("resetBtn");
    
    sideInput.addEventListener("change", function(e){
        sides = e.target.value;
        updateSliders()
        drawFractal()
    })
    function drawBranch(level){
        if(level >= maxLevel) return;
        ctx.beginPath()
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.lineWidth = lineWidth;
        ctx.stroke()
      
        for(let i =0; i < branches; i++){
        ctx.save();
        ctx.translate(size - (size/branches)*i, 0);
        ctx.scale(scale, scale)
        
        ctx.save()
        ctx.rotate(spread)
        drawBranch(level + 1)
        ctx.restore()
        
        
        ctx.save();
        ctx.rotate(-spread)
        ctx.scale(scale,scale)
        drawBranch(level + 1)
        ctx.restore()

        ctx.restore();
        }
        
        
     
    }
    
   function drawFractal(){
       ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.save()
    ctx.strokeStyle = color
    ctx.translate(canvas.width/2, canvas.height/2);
   
    for(let i = 0; i < sides; i++){
       
        ctx.rotate((Math.PI*2)/sides);
        drawBranch(0)

        ctx.beginPath()
        ctx.fillStyle = "yellow";
        ctx.arc(0, sides, 50, 0, Math.PI*2);
        ctx.fill()
    
    }
    ctx.restore()
   }
  drawFractal()

   
    

    function randomizefractal(){
         sides = Math.floor(Math.random()*7 +2);
         scale  = Math.random()*0.2 +0.4;
         spread = Math.random() * 2.9 +0.1
         lineWidth = Math.floor(Math.random()*20 +10)
       
       
         color = 'hsl('+Math.random() * 360 + ', 100%, 50%)';
         randomizebtn.style.backgroundColor = color
       drawFractal()
    }

    function resetall(){
        sides = 3;
        scale  = 0.2;
        spread = 0.2
        lineWidth = 10
      
      
        color = 'hsl(10, 100%, 50%)';
        randomizebtn.style.backgroundColor = 'hsl(10, 100%, 50%)';
    }
    resetBtn.addEventListener("click", function(){
        resetall();
        updateSliders()
        drawFractal();


    })
    randomizebtn.addEventListener("click", function(){
randomizefractal()
updateSliders()
drawFractal()
    });

    function updateSliders(){
        slider_spread.value = spread;
        label_slider.innerText = 'spread: ' + Number(spread).toFixed(1);
        sideLabel.value = sides
        sideLabel.innerText = 'sides: ' + sides
    }
    updateSliders()


    
})