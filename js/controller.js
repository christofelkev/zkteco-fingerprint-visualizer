import { sha256Bytes, makeRng } from './model.js';
import { clearCanvas, drawRidges, drawMinutiae, downloadCanvas, showAlert } from './view.js';

export async function handleGenerate() {
  const template = document.getElementById("tpl").value.trim();

  if (!template) {
    showAlert("Please paste a ZKTeco Base64 template first.", "warning");
    return;
  }

  try {
    const bytes = await sha256Bytes(template);

    const recon = document.getElementById("recon");
    const mini = document.getElementById("mini");

    const rctx = recon.getContext("2d");
    const mctx = mini.getContext("2d");

    clearCanvas(rctx, 520, 620);
    clearCanvas(mctx, 520, 620);

    const rand1 = makeRng(bytes);
    drawRidges(rctx, rand1, false);

    rctx.fillStyle = "#6c757d"; // Bootstrap text-muted
    rctx.font = "13px system-ui, -apple-system, sans-serif";
    rctx.fillText("Pseudo reconstruction from template hash", 18, 600);

    const rand2 = makeRng(bytes);
    const pos = drawRidges(mctx, rand2, true);
    drawMinutiae(mctx, rand2, pos.cx, pos.cy);

    mctx.fillStyle = "#6c757d"; // Bootstrap text-muted
    mctx.font = "13px system-ui, -apple-system, sans-serif";
    mctx.fillText("Pseudo minutiae map from template hash", 18, 545);

  } catch (error) {
    console.error(error);
    showAlert("An error occurred during generation.", "danger");
  }
}

export function handleDownloadRecon() {
  downloadCanvas("recon", "rekonstruksi.png");
}

export function handleDownloadMini() {
  downloadCanvas("mini", "minutiae.png");
}
