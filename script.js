let selectedElement = null;

  function addText() {
  const canvas = document.getElementById("canvasArea");
  const text = document.createElement("div");
  text.textContent = "Editable Text";
  text.className = "draggable-text";
  text.style.display = "inline-block";
text.style.minWidth = "30px";
text.style.minHeight = "20px";
text.style.position = "relative";
text.style.paddingRight = "12px"; // spacing for resizer

  text.onclick = () => selectElement(text);

  // Add resize handle
  const resizer = document.createElement("div");
  resizer.style.position = "absolute";
resizer.style.right = "0";
resizer.style.top = "50%";
resizer.style.transform = "translateY(-50%)";
resizer.style.cursor = "ew-resize";
resizer.style.width = "8px";
resizer.style.height = "20px";
resizer.style.background = "#444";
resizer.style.borderRadius = "2px";


  resizer.addEventListener("mousedown", function (e) {
    e.stopPropagation(); // prevent click from selecting text
    const startY = e.clientY;
    const startFontSize = parseInt(window.getComputedStyle(text).fontSize);

    function onMouseMove(eMove) {
      const diff = eMove.clientY - startY;
      const newFontSize = Math.max(10, startFontSize + diff);
      text.style.fontSize = newFontSize + "px";

      // Update the property panel font size input
      if (selectedElement === text) {
        const sizeInput = document.querySelector("#propertiesPanel input[type='number']");
        if (sizeInput) sizeInput.value = newFontSize;
      }
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  text.appendChild(resizer);
  canvas.appendChild(text);
  selectElement(text);
}

  function selectElement(el) {
    selectedElement = el;
    const panel = document.getElementById("propertiesPanel");
    panel.innerHTML = `
      <label>Text</label>
      <input type="text" value="${el.textContent}" oninput="selectedElement.textContent = this.value">

      <label>Font Size (px)</label>
      <input type="number" value="${parseInt(el.style.fontSize)}" oninput="selectedElement.style.fontSize = this.value + 'px'">

      <label>Font Weight</label>
      <select onchange="selectedElement.style.fontWeight = this.value">
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="lighter">Lighter</option>
        <option value="bolder">Bolder</option>
      </select>

     <label>Font Family</label>
<select onchange="selectedElement.style.fontFamily = this.value">
  <option value="'Segoe UI', sans-serif">Segoe UI</option>
  <option value="Arial, sans-serif">Arial</option>
  <option value="'Helvetica Neue', sans-serif">Helvetica Neue</option>
  <option value="Georgia, serif">Georgia</option>
  <option value="'Times New Roman', serif">Times New Roman</option>
  <option value="Verdana, sans-serif">Verdana</option>
  <option value="Tahoma, sans-serif">Tahoma</option>
  <option value="'Courier New', monospace">Courier New</option>
  <option value="'Lucida Console', monospace">Lucida Console</option>
  <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
  <option value="'Gill Sans', sans-serif">Gill Sans</option>
  <option value="'Palatino Linotype', serif">Palatino Linotype</option>
  <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
  <option value="'Impact', sans-serif">Impact</option>
  <option value="'Franklin Gothic Medium', sans-serif">Franklin Gothic Medium</option>
  <!-- Google Fonts -->
  <option value="'Roboto', sans-serif">Roboto</option>
  <option value="'Poppins', sans-serif">Poppins</option>
  <option value="'Lato', sans-serif">Lato</option>
  <option value="'Montserrat', sans-serif">Montserrat</option>
  <option value="'Open Sans', sans-serif">Open Sans</option>
  <option value="'Oswald', sans-serif">Oswald</option>
  <option value="'Merriweather', serif">Merriweather</option>
  <option value="'Raleway', sans-serif">Raleway</option>
  <option value="'Ubuntu', sans-serif">Ubuntu</option>
</select>

      <label>Text Color</label>
<input type="color" oninput="selectedElement.style.color = this.value">
      <label>Background Color</label>
<input type="color" oninput="selectedElement.style.backgroundColor = this.value">

      <label>Text Align</label>
      <select onchange="selectedElement.style.textAlign = this.value">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <label>Padding (px)</label>
      <input type="text" placeholder="e.g. 10px 15px" oninput="selectedElement.style.padding = this.value">

      <label>Margin (px)</label>
      <input type="text" placeholder="e.g. 10px 0" oninput="selectedElement.style.margin = this.value">

      <label>Line Height</label>
      <input type="text" placeholder="e.g. 1.5" oninput="selectedElement.style.lineHeight = this.value">

      <label>Letter Spacing</label>
      <input type="text" placeholder="e.g. 1px" oninput="selectedElement.style.letterSpacing = this.value">

      <label>Text Shadow</label>
      <input type="text" placeholder="e.g. 2px 2px #000" oninput="selectedElement.style.textShadow = this.value">

      <label>Opacity</label>
      <input type="number" step="0.1" min="0" max="1" value="1" oninput="selectedElement.style.opacity = this.value">

      <label>Transform (Rotate)</label>
      <input type="text" placeholder="e.g. rotate(15deg)" oninput="selectedElement.style.transform = this.value">

      <label>Text Transform</label>
      <select onchange="selectedElement.style.textTransform = this.value">
        <option value="none">None</option>
        <option value="uppercase">Uppercase</option>
        <option value="lowercase">Lowercase</option>
        <option value="capitalize">Capitalize</option>
      </select>
    `;
  }

  function showPresets() {
    document.getElementById("presetModal").style.display = "flex";
  }
  
  function closePresetModal() {
    document.getElementById("presetModal").style.display = "none";
  }
  
  function applyPreset(type) {
    const canvas = document.getElementById("canvasArea");
    canvas.innerHTML = ""; // Clear existing content
  
    if (type === 'hotel') {
      canvas.innerHTML = `
        <h1 style="font-size: 36px; margin-bottom: 10px;">Welcome to Paradise Hotel</h1>
        <p style="font-size: 18px;">Book luxury rooms and enjoy your stay.</p>
      `;
    } else if (type === 'travel') {
      canvas.innerHTML = `
        <h1 style="font-size: 36px;">Explore the World</h1>
        <p style="font-size: 18px;">Discover your next adventure with us.</p>
      `;
    } else if (type === 'product') {
      canvas.innerHTML = `
        <h1 style="font-size: 36px;">Smart Tech Solutions</h1>
        <p style="font-size: 18px;">Innovative gadgets for everyday use.</p>
      `;
    } else if (type === 'education') {
      canvas.innerHTML = `
        <h1 style="font-size: 36px;">Online Learning Platform</h1>
        <p style="font-size: 18px;">Empowering students with knowledge.</p>
      `;
    }
  
    closePresetModal();
  }
  
