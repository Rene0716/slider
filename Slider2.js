let imgs=document.getElementsByClassName("open");                                    //打開slider的小圖li
let sliderBox=document.querySelector(".fullscreen")                                  //fullscreen sliderBox
sliderBox.classList.add('hide');                                                     //fullscreen sliderBox 先藏起來  
let closeBtn=document.querySelector(".close");                                            //close button
let slider=document.querySelector(".slider")                                               //slider 這個div
let sliderUl=document.querySelector(".sliderUl");                                           //slider ul
let prev=document.querySelector(".prev");                                                          
let next=document.querySelector(".next");
let slides=document.getElementsByClassName('slides');                                   //slider li
let small=document.querySelector(".small")
let sliderW=window.getComputedStyle(slider, null).getPropertyValue("width");
console.log(sliderW)
let imgCount=imgs.length;

sliderW=sliderW.replace("px","");                                                         //slider width    
let sliderUlWidth=sliderW*imgCount+"px";                                                  //slider ul total width
let sliderLiW=sliderW;                                                                                                          //slider width=slider li width
sliderUl.style.width=  sliderUlWidth; 


function doFirst(){
    
   for(let i=0;i<imgCount;i++){
       imgs[i].addEventListener('click', openSliderBoard);                          //點小圖秀大圖
       imgs[i].addEventListener('touch', openSliderBoard);
       console.log("111")
    }
    closeBtn.onclick=openSliderBoard;                                         //close  button to close the slider

}


function openSliderBoard(){                                                      //如果 sliderBox的display:none==true就移除
    if(sliderBox.classList.contains('hide')==true){
        sliderBox.classList.remove('transition');
        sliderBox.classList.remove('hide');
    }else if(sliderBox.classList.contains('hide')==false){
        
        sliderBox.classList.add('hide');
    }
    
    for (let i=0;i<slides.length;i++){
        slides[i].addEventListener('dragstart',startDrag);               //打開sliderBox後,可以滑鼠壓住的方式做圖片張數的切換
        // slides[i].addEventListener('touchstart',startDrag); 
        console.log("222")
        slides[i].addEventListener('drag',moveImg);
        // slides[i].addEventListener('touchmove',moveImg);   
        console.log("444")
        slides[i].addEventListener('dragend',endDrag);
        // slides[i].addEventListener('touchend',endDrag);
        console.log("slides.length:",slides.length)    
    }
}

let sliderIndex=0;                                                                                                                  //slider圖片張數
function currentSlides(n){
    sliderIndex=n;
    n--;
    showSlides(sliderIndex=n);
}



function plusSlides(n){
    console.log("n=",n)
    showSlides(sliderIndex+=n);  
    console.log("slideIndexaftershow=",sliderIndex)
}

let n=0;
function showSlides(n){
    n=n%slides.length;
   console.log("sliderIndexabeforeshowSlide:", sliderIndex);
   sliderIndex=0;
   sliderIndex+=n;
   console.log("n==",n);
    if(n<0){
        sliderIndex=4;                                                                      //如果點第一張照片後按左鍵(n=-1),讓slider的張數變成最後一張
        sliderUl.style.left=(sliderW*-sliderIndex)+"px";
        sliderUl.style.transitionDuration="100ms";
    }else if(n>4){                                                                          //如果點到最後一張照片後按右鍵(n>4),讓slider從第一張重新開始
        sliderIndex=(n%5);
        sliderUl.style.left=(sliderW*-sliderIndex)+"px";
        sliderUl.style.transitionDuration="100ms";
    }else{
        sliderUl.style.left=(sliderW*-sliderIndex)+"px";
        sliderUl.style.transitionDuration="600ms";
    }
}
let dragDownStart; let dragDownEnd;
let dragStart;let dragEnd;
let sliderH=window.getComputedStyle(slider, null).getPropertyValue("height").replace("px","");       //抓大圖高度


function startDrag(e){
    // e.preventDefault();
    dragStart=e.clientX;
    dragDownStart=e.clientY;
}

function moveImg(e){
    // e.preventDefault();
    dragEnd=e.clientX;
}

function endDrag(e){
    // e.preventDefault();
    dragEnd=e.clientX;
    dragDownEnd=e.clientY;
    console.log("e.clientXEndDrag",e.clientX)
    console.log("e.clientYEndDrag",e.clientY)
    if(dragDownEnd-dragDownStart>Number(sliderH*0.5)){              //如果結束抓的clientY-開始抓的clientY的距離大於半張圖片-->燈箱消失
        sliderBox.style.transitionDuration="600ms";
        sliderBox.classList.add('hide');
    }

    if(dragEnd-dragStart>=0){                                   //右滑=回上1張-->n-1:距離>0
        plusSlides(n-1);
    }else if(dragEnd-dragStart<0){
        plusSlides(n+1);                                        //左滑=下1張-->n+1:距離<0
    }
}




window.addEventListener("resize",doFirst);
window.addEventListener("load", doFirst);