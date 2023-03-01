import "./style.css";

// HTML
const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".app-control-color");

const resetButton = document.getElementById(
  "app-controls-reset"
) as HTMLButtonElement;

// FUNCTIONS
function resetCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function loadImage(
  ctx: CanvasRenderingContext2D,
  src: string
): Promise<void> {
  return new Promise((resolve) => {
    // Load image from URL and draw it on canvas
    const img = new Image();
    img.addEventListener("load", () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve();
    });
    img.src = src;
  });
}

function drawMaterial(ctx: CanvasRenderingContext2D, src: string) {
  // Load image from URL and draw it on canvas
  const img = new Image();

  img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
  img.src = src;
}

// ENTRY POINT
if (ctx) {
  resetCanvas(ctx);
  loadImage(ctx, "/assets/pants_clear.png");
  resetButton.addEventListener("click", async () => {
    resetCanvas(ctx);
    await loadImage(ctx, "/assets/pants_clear.png");
  });

  colors.forEach((color) => {
    color.addEventListener("click", async (e) => {
      const target = e.target as HTMLImageElement;
      const color = target.src;
      resetCanvas(ctx);
      await loadImage(ctx, "/assets/pants_clear.png");

      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = 0.5;
      drawMaterial(ctx, color);
      ctx.restore();
    });
  });
}
