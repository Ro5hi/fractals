window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas Settings
        ctx.fillStyle = 'darkslategrey';
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';


    // Effect Settings
        let size = 200;
        let sides = 8;

        // Max Level determines the dept of the fractal
        let maxLevel = 3;
        let scale = 0.4;
        let spread = 0.6;
        let branches = 6;

    // Draw Branches
        function drawBranch(level){
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(size, 0);
            ctx.stroke();
            
            for (let i = 0; i < branches; i++){
                ctx.save();
                ctx.translate(size - (size/branches )* i, 0);
                ctx.rotate(spread);
                ctx.scale(scale, scale);
                drawBranch(level + 1);
                ctx.restore();
    
                ctx.save();
                ctx.translate(size - (size/branches )* i, 0);
                ctx.rotate(-spread);
                ctx.scale(scale, scale);
                drawBranch(level + 1);
                ctx.restore();                
            }
        }
        
        // Draw Fractal   
        function drawFractal() {
            ctx.save();
            ctx.translate(canvas.width/2,canvas.height/2);
            
            for (let i = 0; i < sides; i++){ 
                ctx.rotate((Math.PI * 2) / sides);
                drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();


  })