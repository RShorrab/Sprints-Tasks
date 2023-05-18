var list = document.getElementById("list");
var button = document.getElementById("show-button")

list.style.display = "none" //element.style != none!!!

function btntog() 
{
  if (list.style.display === "none") 
  {
    list.style.display = "block";
    button.innerHTML = "Less!"
  } 
  else 
  {
    list.style.display = "none";
    button.innerHTML = "Show me!"
  }
}
