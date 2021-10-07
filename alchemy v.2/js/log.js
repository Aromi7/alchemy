let tabPanels = document.getElementsByClassName("tab-header")[0].getElementsByTagName("div");

for(let i = 0; i < tabPanels.length; i++){
    tabPanels[i].addEventListener("click", function(){
        document.getElementsByClassName("tab-header")[0].getElementsByClassName("active")[0].classList.remove("active");
        tabPanels[i].classList.add('active');

        document.getElementsByClassName("tab-content")[0].getElementsByClassName("active")[0].classList.remove("active");

        document.getElementsByClassName("tab-content")[0].getElementsByClassName("tab-body")[i].classList.add("active");
    });
}