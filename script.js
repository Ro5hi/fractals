window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas Settings
        ctx.fillStyle = 'darkslategrey';
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shaddowOffsetX = 10;
        ctx.shaddowOffsetY = 5;
        ctx.shadowBlur = 10;

    // Control Fractal
        const randomizeButton = document.getElementById('randomizeButton');


    // Effect Settings
        // Determines size of the canvas based on device used
        let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        
        // Randomizes color of the fractal
        let color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        // Scale Determines size of the segments
        let scale = 0.4;
        let lineWidth = Math.floor(Math.random() * 20 + 10);
        
        let sides = 5;
        // Spread determines angle or radians from the parent branch
        let spread = 0.1;

        // Max Level determines the dept of the fractal
        const maxLevel = 3;
        // Branches determines number of branches created within the fractal
        const branches = 5;

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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = lineWidth;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.translate(canvas.width/2,canvas.height/2);
            
            for (let i = 0; i < sides; i++){ 
                ctx.rotate((Math.PI * 2) / sides);
                drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    // Controls
    function randomizeFractal() {
        lineWidth = Math.floor(Math.random() * 20 + 10);
        sides = Math.random() * 7 + 2;
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        drawFractal();
    }
    randomizeButton.addEventListener('click', 
    randomizeFractal);

  });