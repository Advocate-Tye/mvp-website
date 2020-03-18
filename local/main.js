const posts = document.getElementById("post");
calculateEstimate();
posts.addEventListener('input', calculateEstimate)

function showPop() {
  var popup = document.getElementById("popC");
  popup.classList.toggle("show");
}

$(".popup").hover(showPop);

function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById("post"), function(value) {
  return /^-?\d*$/.test(value);
});

function calculateEstimate() {
  var postInput = posts.value;
  console.log(postInput);
  var calculatedValue = 0;
  if (postInput > 0) {
    calculatedValue = postInput * 9 + 3;
  }

  document.getElementById("dollarAmount").innerHTML = "$" + calculatedValue;
}
