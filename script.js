window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    // Canvas Settings
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';


    // Effect Settings
        let size = 200;
        let sides = 5;
        let maxLevel = 1;
        let spread = 0.5;
        let branches = 2;
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(1,1);
        ctx.rotate(0);
        ctx.fillRect(0,0,canvas.height, canvas.width);

    // Draw Branches
        function drawBranch(level){
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(size, 0);
            ctx.stroke();
            
            for (let i = 0; i < branches; i++){
                ctx.save();
                ctx.translate(size/2,0);
                ctx.rotate(spread);
                ctx.scale(0.8,0.8);
                drawBranch(level + 1);
                ctx.restore();
    
                ctx.save();
                ctx.translate(size/2,0);
                ctx.rotate(-spread);
                ctx.scale(0.8,0.8);
                drawBranch(level + 1);
                ctx.restore();                
            }
        }
        drawBranch(0);

    /* for (let i = 0; i < sides; i++){
        // Rotate Sides 
        ctx.rotate((Math.PI * 2) / sides);
     } */

  })