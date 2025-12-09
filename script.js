//space background
const canvas = document.querySelector('#spaceCanvas');

if (canvas) {
    // --- 1. Basic Setup ---
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510); 

    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );
    camera.position.z = 10; 

    // --- 2. Create Star Particles ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000; 
    const positions = [];
    
    const spaceDepth = 2000;
    const spaceWidth = 2000;

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * spaceWidth;
        const y = (Math.random() - 0.5) * spaceWidth;
        const z = Math.random() * spaceDepth - (spaceDepth / 2); 
        positions.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.0, 
        sizeAttenuation: true 
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);


    // --- 3. Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        // Simulate flying forward
        stars.position.z += 3.0; 
        
        // Reset stars position to create the infinite loop effect
        if (stars.position.z > 5) {
            stars.position.z = -spaceDepth / 2; 
        }

        renderer.render(scene, camera);
    }

    // Start the animation
    animate();

    // --- 4. Handle Window Resizing ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

//function works
function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

// Typewriter Effect

const texts = [
    "DEVELOPER",
    "DESIGNER",   
]

let speed  =100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

window.onload = typeWriter

// About Section
 
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents  = document.getElementsByClassName("tab-contents");

function opentab(event,tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
    
// Contact Form


    const scriptURL = 'https://script.google.com/macros/s/AKfycbxySBwYRlsPxa6tDPeszPme8EjWt3Znitoqozj2NTXKtkx74gvDBcBuHXJcYFJ-heIj/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")

    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message Sent Successfully!"
            setTimeout(function(){
                msg.innerHTML=""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
  })



