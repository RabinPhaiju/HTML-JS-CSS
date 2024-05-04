const circleCoordinates = [];

function circleIntersect(x0,y0,r0,x1,y1,r1){
    return Math.hypot(x0-x1,y0-y1) <= r0+r1;
}

function logIfIntersect(){
    const firstCirlce = circleCoordinates[0]
    const secondCircle = circleCoordinates[1]
    const x1 = firstCirlce.x;
    const y1 = firstCirlce.y;
    const r1 = firstCirlce.r;
    const x2 = secondCircle.x;
    const y2 = secondCircle.y;
    const r2 = secondCircle.r;
    return circleIntersect(x1,y1,r1,x2,y2,r2);
}

document.addEventListener("click",(e)=>{
    const totalCircles = document.querySelectorAll(".circle");
    if(totalCircles.length == 2){
        totalCircles.forEach((circle)=>{
            document.body.removeChild(circle);
        })
        circleCoordinates.length = 0;
    }

    const x = e.clientX;
    const y = e.clientY;
    const randNum = Math.floor(Math.random() * (200 - 50) + 50);
    circleCoordinates.push({x,y,r:randNum});


    const circle = document.createElement("div");
    circle.classList.add('circle');
    circle.style.top = y-randNum + "px";
    circle.style.left = x-randNum + "px";
    circle.style.width = (randNum*2) + "px";
    circle.style.height = (randNum*2) + "px";

    document.body.appendChild(circle);

    if(circleCoordinates.length == 2){
        const res = logIfIntersect();
        let text = document.querySelector('.output');
        text.innerHTML = res;
    }
});