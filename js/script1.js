document.addEventListener("DOMContentLoaded", function() {
    var options = document.querySelectorAll(".option");
  
    options.forEach(function(option) {
      option.addEventListener("click", function() {
        options.forEach(function(option) {
          option.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  });
  