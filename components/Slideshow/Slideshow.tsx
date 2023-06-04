import React, { useEffect, useState } from 'react';
import slideStyles from "./Slideshow.module.css";
import Image from "next/image";
import {
  SLIDE_1,
  SLIDE_1_IMG,
  SLIDE_2,
  SLIDE_2_IMG,
  SLIDE_3,
  SLIDE_3_IMG,
  SLIDE_4,
  SLIDE_4_IMG,
  SLIDE_5,
  SLIDE_5_IMG,
  SLIDE_6,
  SLIDE_6_IMG,
  SLIDE_7,
  SLIDE_7_IMG,
  SLIDE_8,
  SLIDE_8_IMG,
  SLIDE_9,
  SLIDE_9_IMG,
} from '../../const/contractAddresses';


export function Slideshow(){ 

  useEffect(() => {
    let slideIndex = 1;
    showSlides1(slideIndex);
    showSlides2(slideIndex);
    showSlides3(slideIndex);
    showSlides4(slideIndex);
    
    var plusSlides1Btn = document.querySelector("#plusSlides1Minus");
    var plusSlides1BtnPlus = document.querySelector("#plusSlides1Plus");
    var plusSlides2Btn = document.querySelector("#plusSlides2Minus");
    var plusSlides2BtnPlus = document.querySelector("#plusSlides2Plus");
    var plusSlides3Btn = document.querySelector("#plusSlides3Minus");
    var plusSlides3BtnPlus = document.querySelector("#plusSlides3Plus");
    var plusSlides4Btn = document.querySelector("#plusSlides4Minus");
    var plusSlides4BtnPlus = document.querySelector("#plusSlides4Plus");
    // Next/previous controls

    if(plusSlides1Btn && plusSlides1BtnPlus && plusSlides2Btn && plusSlides2BtnPlus && plusSlides3Btn && plusSlides3BtnPlus && plusSlides4Btn && plusSlides4BtnPlus){
    plusSlides1Btn.addEventListener("click", async() => {
        let n = -1;
        showSlides1(slideIndex += n);
    });
    
    plusSlides1BtnPlus.addEventListener("click", async() => {
        let n = 1;
        showSlides1(slideIndex += n);
    });

    plusSlides2Btn.addEventListener("click", async() => {
        let n = -1;
        showSlides2(slideIndex += n);
    });
    
    plusSlides2BtnPlus.addEventListener("click", async() => {
        let n = 1;
        showSlides2(slideIndex += n);
    });

    plusSlides3Btn.addEventListener("click", async() => {
        let n = -1;
        showSlides3(slideIndex += n);
    });
    
    plusSlides3BtnPlus.addEventListener("click", async() => {
        let n = 1;
        showSlides3(slideIndex += n);
    });

    plusSlides4Btn.addEventListener("click", async() => {
        let n = -1;
        showSlides4(slideIndex += n);
    });
    
    plusSlides4BtnPlus.addEventListener("click", async() => {
        let n = 1;
        showSlides4(slideIndex += n);
    });
  }
    
    // Thumbnail image controls
    function currentSlide1(n) {
        showSlides1(slideIndex = n);
    }
    function currentSlide2(n) {
        showSlides2(slideIndex = n);
    }
    function currentSlide3(n) {
    showSlides3(slideIndex = n);
    }
    function currentSlide4(n) {
    showSlides4(slideIndex = n);
        }
    
    function showSlides1(n) {
        let i;
        let slides = document.querySelectorAll("#mySlides1");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }
    
    function showSlides2(n) {
      let i;
      let slides = document.querySelectorAll("#mySlides2");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex-1].style.display = "block";
    }

    function showSlides3(n) {
      let i;
      let slides = document.querySelectorAll("#mySlides3");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex-1].style.display = "block";
    }
    
    function showSlides4(n) {
    let i;
    let slides = document.querySelectorAll("#mySlides4");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    }

    })

  return (
    
    <div> 
        <div className={`${slideStyles.slideshowContainer} ${slideStyles.slide1}`}>
            <a className={slideStyles.prev} id="plusSlides1Minus">&#10094;</a>
            <a className={slideStyles.next} id="plusSlides1Plus">&#10095;</a>
              <div id="mySlides1" className={`${slideStyles.mySlides1} ${slideStyles.fade}`}>
                <Image
                  src={SLIDE_1_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_1}`)}
                  value={SLIDE_1}
                />
          
                <Image
                  src={SLIDE_2_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_2}`)}
                  value={SLIDE_2}
                />
            
                <Image
                  src={SLIDE_3_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_3}`)}
                  value={SLIDE_3}
                />
            
                <Image
                  src={SLIDE_4_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_4}`)}
                  value={SLIDE_4}
                />
            </div>

            <div id="mySlides1" className={`${slideStyles.mySlides1} ${slideStyles.fade}`}>
                <Image
                  src={SLIDE_5_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_5}`)}
                  value={SLIDE_5}
                />

                <Image
                  src={SLIDE_6_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_6}`)}
                  value={SLIDE_6}
                />
            
                <Image
                  src={SLIDE_7_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_7}`)}
                  value={SLIDE_7}
                />
            
                <Image
                  src={SLIDE_8_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_8}`)}
                  value={SLIDE_8}
                />
            </div>
          </div>

          <div className={`${slideStyles.slideshowContainer} ${slideStyles.slide2}`}>
            <div id="mySlides2" className={slideStyles.mySlides2, slideStyles.fade}>
            <Image
                  src={SLIDE_1_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_1}`)}
                  value={SLIDE_1}
                />
          
                <Image
                  src={SLIDE_2_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_2}`)}
                  value={SLIDE_2}
                />
            
                <Image
                  src={SLIDE_3_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_3}`)}
                  value={SLIDE_3}
                />
                
            </div>

            <div id="mySlides2" className={slideStyles.mySlides2, slideStyles.fade}>
                <Image
                  src={SLIDE_4_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_4}`)}
                  value={SLIDE_4}
                />

                <Image
                  src={SLIDE_5_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_5}`)}
                  value={SLIDE_5}
                />

                <Image
                  src={SLIDE_6_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_6}`)}
                  value={SLIDE_6}
                />
              </div>

              <div id="mySlides2" className={slideStyles.mySlides2, slideStyles.fade}>
                <Image
                  src={SLIDE_7_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_7}`)}
                  value={SLIDE_7}
                />
            
                <Image
                  src={SLIDE_8_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_8}`)}
                  value={SLIDE_8}
                />

                <Image
                  src={SLIDE_9_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_9}`)}
                  value={SLIDE_9}
                />
              </div>
                
            
            <a className={slideStyles.prev} id="plusSlides2Minus">&#10094;</a>
            <a className={slideStyles.next} id="plusSlides2Plus">&#10095;</a>
          </div>

          <div className={`${slideStyles.slideshowContainer} ${slideStyles.slide3}`}>
            <div id="mySlides3" className={slideStyles.mySlides3, slideStyles.fade}>
              
                <Image
                  src={SLIDE_1_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_1}`)}
                  value={SLIDE_1}
                />
          
                <Image
                  src={SLIDE_2_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_2}`)}
                  value={SLIDE_2}
                />
                
            </div>


            <div id="mySlides3" className={slideStyles.mySlides3, slideStyles.fade}>
              
                <Image
                  src={SLIDE_3_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_3}`)}
                  value={SLIDE_3}
                />
          
                <Image
                  src={SLIDE_4_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_4}`)}
                  value={SLIDE_4}
                />
                
            </div>

            <div id="mySlides3" className={slideStyles.mySlides3, slideStyles.fade}>
              
                <Image
                  src={SLIDE_5_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_5}`)}
                  value={SLIDE_5}
                />
          
                <Image
                  src={SLIDE_6_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_6}`)}
                  value={SLIDE_6}
                />
                
            </div>

            <div id="mySlides3" className={slideStyles.mySlides3, slideStyles.fade}>
              
                <Image
                  src={SLIDE_7_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_7}`)}
                  value={SLIDE_7}
                />
          
                <Image
                  src={SLIDE_8_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_8}`)}
                  value={SLIDE_8}
                />
                
            </div>
            <a className={slideStyles.prev} id="plusSlides3Minus">&#10094;</a>
            <a className={slideStyles.next} id="plusSlides3Plus">&#10095;</a>
          </div>

          <div className={`${slideStyles.slideshowContainer} ${slideStyles.slide4}`}>
            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_1_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_1}`)}
                  value={SLIDE_1}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_2_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_2}`)}
                  value={SLIDE_2}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_3_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_3}`)}
                  value={SLIDE_3}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_4_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_4}`)}
                  value={SLIDE_4}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_5_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_5}`)}
                  value={SLIDE_5}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_6_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_6}`)}
                  value={SLIDE_6}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_7_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_7}`)}
                  value={SLIDE_7}
                />
                
            </div>

            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_8_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_8}`)}
                  value={SLIDE_8}
                />
                
            </div>


            <div id="mySlides4" className={slideStyles.mySlides4, slideStyles.fade}>
                <Image
                  src={SLIDE_9_IMG}
                  width={250}
                  height={250}
                  alt="Market gm ☕️"
                  className = {slideStyles.imageStyle}
                  onClick={(e)=>(location.href = `/collection/${SLIDE_9}`)}
                  value={SLIDE_9}
                />
                
            </div>
           
            <a className={slideStyles.prev} id="plusSlides4Minus">&#10094;</a>
            <a className={slideStyles.next} id="plusSlides4Plus">&#10095;</a>
          </div>
    </div>
  )

}
  