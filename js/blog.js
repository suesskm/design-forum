// // Function to handle icon click event
// function openPopup(imageUrl) {
//     // Open a new window with the specified image URL
//     window.open(imageUrl, '_blank', 'width=600,height=400');
// }

// // Add click event listener to icon
// document.getElementById("icon").addEventListener('click', function() {
//     // Call the openPopup function with the URL of the image you want to display
//     openPopup('media/images/popup1.png');
// });



const button = document.getElementById('myButton');
// Add a click event listener to the button
button.addEventListener('click', () => {
  // Run your animation code here
  // For example, you can use CSS animations or a JavaScript animation library
  button.classList.add('bg-anim');
  console.log('Button clicked');
    // Remove the animation class after the animation ends
    button.addEventListener('animationend', () => {
        button.classList.remove('bg-anim');
        console.log('Animation ended');
    });
});
document.addEventListener('keydown',(event) => {
    if(event.key === 'a'){
        button.classList.add('bg-anim');
        // remove the animation
        button.addEventListener('animationend', () => {
            button.classList.remove('bg-anim');
        });
    }
} );


function createParticle (x, y) {
    var size = Math.random() * 50 + 10;
    
    x -= (size / 2);
    y -= (size / 2);
    
    var particle = document.createElement('div');
    document.body.appendChild(particle);
    
    TweenMax.set(particle, {
      x: x, 
      y: y,
      width: size,
      height: size,
      background: function () {
        return `hsl(${Math.random() *90+200}, 50%, 50%)`
      }
    });
    TweenMax.to(particle, Math.random() * 2 + 1, {
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      opacity: 0,
      scale:0,
      ease: Power2.easeOut,
      onComplete: function () {
        document.body.removeChild(particle);
      }
    })
  }
  
  window.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    createParticle(x, y);
  });
  document.body.addEventListener('touchmove', function (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    e.preventDefault();
    createParticle(x, y);
  });