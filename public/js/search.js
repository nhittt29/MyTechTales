// const searchInput = document.getElementById("search-input");
// const searchResults = document.getElementById("search-results");

// if (searchInput) {
//   let pages = [];

//   // ✅ Đảm bảo đúng đường dẫn (sửa theo baseURL của bạn)
//   fetch("/MyTechTales/index.json")
//     .then(res => res.json())
//     .then(data => {
//       pages = data;
//     });

//   searchInput.addEventListener("input", function () {
//     const query = this.value.toLowerCase().trim();
//     searchResults.innerHTML = "";

//     if (query.length < 2) return; // chỉ hiện khi gõ ≥ 2 ký tự

//     const filtered = pages.filter(p =>
//       p.title.toLowerCase().includes(query) ||
//       p.summary.toLowerCase().includes(query) ||
//       p.content.toLowerCase().includes(query)
//     );

//     if (filtered.length === 0) {
//       searchResults.innerHTML = "<p>Không tìm thấy kết quả.</p>";
//       return;
//     }

//     filtered.slice(0, 8).forEach(p => {
//       const item = document.createElement("a");
//       item.href = p.permalink;
//       item.classList.add("search-item");
//       item.innerHTML = `
//         <strong>${p.title}</strong>
//         <p>${p.summary || p.content.slice(0, 80)}...</p>
//       `;
//       searchResults.appendChild(item);
//     });
//   });
// }

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput) {
  let pages = [];

  // ✅ Đảm bảo đúng đường dẫn dựa trên baseURL (sửa thành đường dẫn tuyệt đối)
  fetch("{{ .Site.BaseURL }}index.json")
    .then(res => {
      if (!res.ok) throw new Error("Không thể tải index.json");
      return res.json();
    })
    .then(data => {
      pages = data;
      console.log("Dữ liệu từ index.json:", data); // Gỡ lỗi để kiểm tra
    })
    .catch(error => console.error("Lỗi khi tải index.json:", error));

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query.length < 2) return; // Chỉ hiện khi gõ ≥ 2 ký tự

    const filtered = pages.filter(p =>
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.summary && p.summary.toLowerCase().includes(query)) ||
      (p.content && p.content.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = "<p>Không tìm thấy kết quả.</p>";
      return;
    }

    filtered.slice(0, 8).forEach(p => {
      const item = document.createElement("a");
      item.href = p.permalink;
      item.classList.add("search-item");
      // Trích xuất đoạn chứa từ khóa
      const snippet = extractSnippet(p.content || p.summary || p.description || "", query);
      item.innerHTML = `
        <strong>${p.title || "Tiêu đề không có"}</strong>
        <p>${snippet}</p>
        <small>Nguồn: ${p.permalink.includes("/blog/") ? "Blog" : p.permalink.includes("/profile/") ? "Profile" : "Khác"}</small>
      `;
      searchResults.appendChild(item);
    });
  });

  // --- Hàm trích xuất đoạn văn chứa từ khóa ---
  function extractSnippet(content, keyword) {
    if (!content || typeof content !== "string") return "Không tìm thấy nội dung phù hợp.";
    const lowerContent = content.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    const index = lowerContent.indexOf(lowerKeyword);
    if (index === -1) return content.length > 160 ? content.slice(0, 160) + "..." : content;

    const start = Math.max(0, index - 80);
    const end = Math.min(content.length, index + keyword.length + 80);
    const snippet = content.slice(start, end).replace(new RegExp(`(${keyword})`, "gi"), "<mark>$1</mark>");
    return snippet + (end < content.length ? "..." : "");
  }
}