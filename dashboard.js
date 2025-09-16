// Cek status login
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// Tampilkan IP
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("show-ip").textContent = "Your IP: " + data.ip;
  })
  .catch(() => {
    document.getElementById("show-ip").textContent = "Your IP: (gagal ambil)";
  });

// Handle Deploy
document.getElementById("deployForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const siteName = document.getElementById("siteName").value.trim();
  const file = document.getElementById("zipFile").files[0];
  const statusEl = document.getElementById("deployStatus");

  if (!siteName || !file) {
    statusEl.textContent = "Lengkapi form dulu!";
    return;
  }

  const formData = new FormData();
  formData.append("siteName", siteName);
  formData.append("zipFile", file);

  statusEl.textContent = "⏳ Deploying...";

  try {
    const res = await fetch("/api/deploy", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      statusEl.innerHTML = `✅ Website berhasil dibuat: <a href="https://${siteName}.vercel.app" target="_blank">${siteName}.vercel.app</a>`;
    } else {
      statusEl.textContent = "❌ Gagal: " + data.error;
    }
  } catch (err) {
    statusEl.textContent = "❌ Terjadi error.";
  }
});
