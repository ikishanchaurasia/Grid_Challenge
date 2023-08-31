document.addEventListener("DOMContentLoaded", () => {
  const dotGrid = document.getElementById("dotGrid");
  const imageContainer1 = document.getElementById("imageContainer1");
  const yesButton1 = document.getElementById("yesButton1");
  const noButton1 = document.getElementById("noButton1");

  const imageContainer2 = document.getElementById("imageContainer2");
  const yesButton2 = document.getElementById("yesButton2");
  const noButton2 = document.getElementById("noButton2");

  const totalDots = 90;
  let darkerDotIndex = Math.floor(Math.random() * totalDots);
  const hiddenDotIndices = generateRandomIndices(totalDots, 20); // Hide 20 dots
  let dotSelectionEnabled = false;
  let selectedDotCount = 0;

  function generateDots() {
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === darkerDotIndex) {
        dot.classList.add("darker-dot");
      } else if (hiddenDotIndices.includes(i)) {
        dot.style.visibility = "hidden";
      }
      dotGrid.appendChild(dot);
    }
  }

  function toggleDotSelection(event) {
    const dot = event.target;
    if (dot.classList.contains("selected-dot")) {
      dot.classList.remove("selected-dot");
      selectedDotCount--;
    } else if (selectedDotCount < 2) {
      dot.classList.add("selected-dot");
      selectedDotCount++;
    }
  }

  function regenerateDarkerDotPosition() {
    const dots = dotGrid.querySelectorAll(".dot");
    let newDarkerDotIndex;
    dots[darkerDotIndex].classList.remove("darker-dot");

    do {
      newDarkerDotIndex = Math.floor(Math.random() * totalDots);
      if(newDarkerDotIndex==darkerDotIndex){
        newDarkerDotIndex = Math.floor(Math.random() * totalDots);
      }
    } while (hiddenDotIndices.includes(newDarkerDotIndex));
    darkerDotIndex=newDarkerDotIndex;
    dots[darkerDotIndex].classList.add("darker-dot");
  }

  function regenerateDotGrid() {
    const dots = dotGrid.querySelectorAll(".dot");
    dots[darkerDotIndex].classList.remove("darker-dot");

    dotSelectionEnabled = true;
    if (dotSelectionEnabled) {
        for(let i=0; i<totalDots; i++){
        dots[i].addEventListener("click", toggleDotSelection);
        }
      }
  }

  function showImageWithButtons1() {
    dotGrid.style.display = "none";
    imageContainer1.style.display = "block";
  }
  function showImageWithButtons2() {
    dotGrid.style.display = "none";
    imageContainer2.style.display = "block";
  }

  function hideImageWithButtons1() {
    imageContainer1.style.display = "none";
    dotGrid.style.display = "grid";
    regenerateDarkerDotPosition();
    setTimeout(showImageWithButtons2, 3000);
  }

  function hideImageWithButtons2() {
    imageContainer2.style.display = "none";
    dotGrid.style.display = "grid";
    regenerateDotGrid();
  }

  generateDots();
  setTimeout(showImageWithButtons1, 3000);

  yesButton1.addEventListener("click", hideImageWithButtons1);
  noButton1.addEventListener("click", hideImageWithButtons1);

  yesButton2.addEventListener("click", hideImageWithButtons2);
  noButton2.addEventListener("click", hideImageWithButtons2);
});

function generateRandomIndices(maxIndex, count) {
  const indices = new Set();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    indices.add(randomIndex);
  }
  return Array.from(indices);
}
