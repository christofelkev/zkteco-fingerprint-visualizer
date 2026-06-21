export function clearCanvas(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
}

export function drawRidges(ctx, rand, light = false) {
  const cx = 260;
  const cy = 310;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let r = 18; r <= 215; r += 8) {
    ctx.beginPath();

    ctx.lineWidth = light ? 1.1 : 2.2;
    ctx.strokeStyle = light ? "rgba(0,0,0,0.16)" : "rgba(10,10,10,0.72)";

    for (let i = 0; i <= 420; i++) {
      const a = i / 420 * Math.PI * 2;

      const fingerprintCurve =
        Math.sin(a * 3 + r * 0.05) * 6 +
        Math.sin(a * 7 + r * 0.025) * 2.5;

      const corePull = Math.sin(a - 1.2) * Math.max(0, 70 - r) * 0.18;

      const rr = r + fingerprintCurve + corePull;

      const x = cx + Math.cos(a) * rr * 0.82;
      const y = cy + Math.sin(a) * rr * 1.18;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  // core spiral tengah
  ctx.beginPath();
  ctx.strokeStyle = light ? "rgba(0,0,0,0.18)" : "rgba(10,10,10,0.78)";
  ctx.lineWidth = light ? 1.2 : 2.4;

  for (let t = 0; t < Math.PI * 5.5; t += 0.05) {
    const rr = 5 + t * 3.1;
    const x = cx + Math.cos(t) * rr * 0.9;
    const y = cy + Math.sin(t) * rr * 1.05;
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();

  // noise putus-putus biar lebih natural
  if (!light) {
    for (let i = 0; i < 450; i++) {
      if (rand() < 0.5) continue;
      const a = rand() * Math.PI * 2;
      const r = 25 + rand() * 210;
      const x = cx + Math.cos(a) * r * 0.82;
      const y = cy + Math.sin(a) * r * 1.18;

      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(x, y, 2 + rand() * 5, 1 + rand() * 2);
    }
  }

  return { cx, cy };
}

export function drawMinutiae(ctx, rand, cx, cy) {
  for (let i = 0; i < 90; i++) {
    const a = rand() * Math.PI * 2;
    const r = 28 + rand() * 205;

    const x = cx + Math.cos(a) * r * 0.82;
    const y = cy + Math.sin(a) * r * 1.18;

    if (x < 40 || x > 480 || y < 45 || y > 530) continue;

    const bif = rand() > 0.72;

    ctx.strokeStyle = bif ? "#dc3545" : "#198754"; // Bootstrap colors
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * 15, y + Math.sin(a) * 15);
    ctx.stroke();

    if (bif) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a + 0.55) * 13, y + Math.sin(a + 0.55) * 13);
      ctx.stroke();
    }
  }

  // Legend
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#495057";

  ctx.strokeStyle = "#198754";
  ctx.beginPath();
  ctx.arc(50, 565, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillText("Ridge Ending", 70, 570);

  ctx.strokeStyle = "#dc3545";
  ctx.beginPath();
  ctx.arc(50, 595, 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillText("Bifurcation", 70, 600);
}

export function downloadCanvas(id, filename) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function showAlert(message, type = "danger") {
  const alertContainer = document.getElementById("alert-container");
  if (!alertContainer) return;
  
  const alert = document.createElement("div");
  alert.className = \`alert alert-\${type} alert-dismissible fade show\`;
  alert.role = "alert";
  alert.innerHTML = \`
    \${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  \`;
  
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alert);
}
