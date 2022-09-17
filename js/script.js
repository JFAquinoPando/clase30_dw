const btn1 = $("#btn1")

console.log(btn1);

console.log(btn1[0].classList);

btn1[0].classList.add("btn-success")
btn1[0].classList.remove("btn-primary")

console.log(btn1[0].classList);

btn1.on("click", function(){
    btn1.text('Otro Texto')
})

$(".btn.btn-primary").on("click", function(){
    alert("Hiciste click!")
})

// jQuery

$(".col.d-flex.align-items-start .fs-2").hover(function(){
    $(".fs-3").addClass("text-warning")
});


// js Vanilla

/* document.querySelector("col.d-flex.align-items-start .fs-2").addEventListener("hover", function(){

}) */
