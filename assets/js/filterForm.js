const searchInput = document.getElementById("search");
console.log(searchInput);




searchInput.addEventListener("change", (e) => {
  e.preventDefault();
 console.log(e.target.value);
});
