window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas Settings
        ctx.lineCap = 'round';
        ctx.shadowColor = 'black';
        ctx.shaddowOffsetX = 2;
        ctx.shaddowOffsetY = 2;
        ctx.shadowBlur = 10;

    // Control Settings
        const randomizeButton = document.getElementById('randomizeButton');
        const resetButton = document.getElementById('resetButton');
        const slider_spread = document.getElementById('spread');
        const label_spread = document.querySelector('[for="spread"]');
        slider_spread.addEventListener('change', function(e){
            spread = e.target.value;
            updateSliders();
            drawFractal();
        });
        slider_sides = document.getElementById('sides');
        label_sides = document.querySelector('[for="sides"]');
        slider_sides.addEventListener('change', function(e){
            sides = e.target.value;
            updateSliders();
            drawFractal();
        });
        
    // Effect Settings
        // Determines size of the canvas based on device used
        let size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
        let lineWidth = 10;
        
        // Randomizes color of the fractal
        let color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        // Scale Determines size of the segments
        let scale = 0.75;
        
        // Determines nunber of parent branches
        let sides = 10;
        // Spread determines angle or radians from the parent branch
        let spread = -0.2;

        // Max Level determines the dept of the fractal, too much can cause lag
        const maxLevel = 5;
        // Branches determines number of branches created within the fractal
        const branches = 1;

    // Set Bezier Curve
        let pointX = 0;
        let pointY = size;

    // Draw Branches
        function drawBranch(level){
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(pointX, pointY);
            ctx.bezierCurveTo(/* startpoint */ 0, size * spread * -3, 
                              /* x */ size * 5, 
                              /* y */ size * 5, size * 10, 
                              /* endpoint */ 0,0);
            ctx.lineTo(size, 0);
            ctx.stroke();
            
            for (let i = 0; i < branches; i++){
                ctx.save();
                ctx.translate(pointX, pointY);
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
            // Add Circle Shape
            ctx.beginPath();
            ctx.arc(-size/2, 
                    0, 40, 
                    0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw Fractal   
        function drawFractal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.lineWidth = lineWidth;
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.translate(canvas.width/2, 
                          canvas.height/2);
            
            for (let i = 0; i < sides; i++){ 
                ctx.rotate((Math.PI * 6) / sides);
                ctx.scale(0.95,0.95);
                drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    // Controls
        // Randomize Settings
        function randomizeFractal() {
            lineWidth = Math.floor(Math.random() * 30 + 10);
            sides = Math.floor(Math.random() * 18 + 2);
            spread = Math.random() * 0.6 - 0.3;
            color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        }
        randomizeButton.addEventListener('click', function(){
            randomizeFractal();
            updateSliders();
            drawFractal();
        });

        // Reset Settings
        function resetFractal() {
            lineWidth = 30;
            sides = 15;
            scale = 0.35;
            spread = 0.2;
            color = 'hsl(45, 100%, 50%)';
        }
        resetButton.addEventListener('click', function(){
            resetFractal();
            updateSliders();
            drawFractal();
        });

        function updateSliders(){
            slider_spread.value = spread;
            label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);
            slider_sides.value = sides;
            label_sides.innerText = 'Sides: ' + Number(sides).toFixed(1);
        }
        updateSliders();

        // Resize Canvas based on device used
        window.addEventListener('resize', function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            size = canvas.width < canvas.height ? canvas.width * 0.04 : canvas.height * 0.04;
            ctx.shadowColor = 'black';
            ctx.shaddowOffsetX = 2;
            ctx.shaddowOffsetY = 2;
            ctx.shadowBlur = 10;
            
            drawFractal();
        });
    }
);