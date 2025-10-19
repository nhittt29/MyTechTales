const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput) {
  let pages = [];

  // ✅ Đảm bảo đúng đường dẫn (sửa theo baseURL của bạn)
  fetch("/MyTechTales/index.json")
    .then(res => res.json())
    .then(data => {
      pages = data;
    });

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query.length < 2) return; // chỉ hiện khi gõ ≥ 2 ký tự

    const filtered = pages.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = "<p>Không tìm thấy kết quả.</p>";
      return;
    }

    filtered.slice(0, 8).forEach(p => {
      const item = document.createElement("a");
      item.href = p.permalink;
      item.classList.add("search-item");
      item.innerHTML = `
        <strong>${p.title}</strong>
        <p>${p.summary || p.content.slice(0, 80)}...</p>
      `;
      searchResults.appendChild(item);
    });
  });
}
