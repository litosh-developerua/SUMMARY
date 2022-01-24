const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.wigth = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position 
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.wigth/80)
};

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //method to draw individual practicle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
    //check particle position 
    update() {
        if(this.x > canvas.wigth || this.x < 0 ) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.wigth || this.y < 0 ) {
            this.directionY = -this.directionY;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size) {
            if(mouse.x < this.x && this.x < canvas.wigth - this.size * 10) {
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if(mouse.x < this.y && this.x < canvas.height - this.size * 10) {
                this.x += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle
        this.draw();
    }
}

//create perticle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.wigth) / 9000;
    for(let i = 0; i < numberOfParticles*3; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#FFFFFF';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.wigth/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000)
                ctx.strokeStyle = 'rgba(255, 43, 114,' + opacityValue + ' )';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animation loop 
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);

window.addEventListener('mouseout', 
    function(){
        mouse.x = undefined;
        mouse.x = undefined;
    }
)

init();
animate();

//animation block

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');
    for(var i = 0; i < reveals.length; i++){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}