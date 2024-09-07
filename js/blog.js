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
