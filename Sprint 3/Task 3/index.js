function btntog() 
{
    var list = document.getElementById("list");
    var button = document.getElementById("show-button")
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