import { handleGenerate, handleDownloadRecon, handleDownloadMini } from './controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerate = document.getElementById("btn-generate");
  const btnDownloadRecon = document.getElementById("btn-download-recon");
  const btnDownloadMini = document.getElementById("btn-download-mini");

  if (btnGenerate) btnGenerate.addEventListener("click", handleGenerate);
  if (btnDownloadRecon) btnDownloadRecon.addEventListener("click", handleDownloadRecon);
  if (btnDownloadMini) btnDownloadMini.addEventListener("click", handleDownloadMini);
});
