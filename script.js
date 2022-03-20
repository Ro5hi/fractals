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
        let sides = 5;
        let maxLevel = 3;
        let scale = 0.5;
        let spread = 0.8;
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
        drawBranch(0);

    /* for (let i = 0; i < sides; i++){
        // Rotate Sides 
        ctx.rotate((Math.PI * 2) / sides);
     } */

  })