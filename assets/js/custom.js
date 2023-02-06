$(function(){

    //페이지 로드 후 애니메이션
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.querySelector('#screen');
    const ctx = canvas.getContext('2d');

    const frameCount = 65;

    const currentFrame = (idx) => {
    return `./assets/images/canvas/${idx.toString()}.png`;
    };

    const images = [];
    const card = {
        frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i + 1);
        images.push(img);
    }

    gsap.to(card, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
        trigger: '.sc_intro .sticky_inner',
        scrub: 1,
        start: '-52px top',
        end: '108% top',
        pin: true,
        // markers: true
    },
    onUpdate: render,
    });

    images[0].onload = render;

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[card.frame], 0, 0);
    }


    const loadMotion = gsap.timeline();
    loadMotion
    .to(".sc_intro .group_sequence canvas", {duration:0.2, opacity:1},'+=0.8')
    .to(".sc_intro .intro_title, .sc_intro .watch_list,.sc_intro .intro_headline, .sc_intro .group_sequence canvas", {opacity:1, scale: 1, y:0, duration: 1.3, ease: Power4.easeInOut},'+=0.2');

    // intro 캔버스 이미지 시퀀스
    // var canvas = document.getElementById('screen');
    // var context = canvas.getContext('2d');
    // var scrollYPos = 0;
    // var img = new Image();

    // img.src = "./assets/images/canvas/0.png";//스크롤 전 첫 이미지

    // window.addEventListener('scroll', function(e){
    //     scrollYPos = Math.round(window.scrollY/12);

    //     if(scrollYPos > 64) {
    //         scrollYPos = 64;
    //     }

    //     player(scrollYPos);
    // })

    // function player(num) {
    //     img.src = "./assets/images/canvas/" + num + ".png";
    // }

    // img.addEventListener('load', function(e) {
    //     context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //     context.drawImage(img, 0, 0);
    // });



    //sticky_nav 백그라운드
    $(window).scroll(function(){
        const scroll = $(window).scrollTop();

        if(scroll > 42) {
            $('.sticky_background').addClass('scrolled');
        } else {
        $('.sticky_background').removeClass('scrolled');
        }
    });


    //intro 타이틀, 왓치리스트 오파시티
    gsap.to(".sc_intro .intro_inner", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sc_intro",
            start: "15% top",
            end: "28% top",
            scrub: 1,
        },
    });

    //intro 헤드라인 사이즈,오파시티
    gsap.set('.sc_intro .intro_headline',{scale:1})//로딩 gsap와 겹치면서 발생하는 모션 수정
    const headlineAni = gsap.timeline({scrollTrigger: {
        trigger: ".sc_intro",
        start: "-96px top",
        end: "35% top",
        scrub: true,
    }});
    headlineAni
    .to(".sc_intro .intro_headline", {duration:1, scale:1.15})
    .to(".sc_intro .intro_headline", {opacity:0},"-=0.5");

    //intro 서브 영역 사이즈, 오파시티
    const subareaAni = gsap.timeline({scrollTrigger: {
        trigger:".sc_intro",
        start: "39% top",
        end: "55% top",
        scrub: true,
    }});
    subareaAni
    .to(".sc_intro .sub_area", {duration:1, scale:0.92, opacity:1})
    .to(".sc_intro .sub_area", {duration:1, scale:1, opacity:0});


    //value 백그라운드 동영상
    const valuebgAni = gsap.timeline({scrollTrigger: {
        trigger: ".sc_value .video_area",
        start: "-10% top",
        end: "180% top",
        scrub: true,
    }});
    valuebgAni
    .to(".sc_value .video_area",{duration:0.1, opacity:1})
    .to(".sc_value .video_area", {duration:0.2, opacity:0},"1")
    .to(".sc_value .video_frame .btn_control", {opacity:0},"-=0.3");


    //value 컨텐츠 리스트 오파시티
    /** 
    * @i = 인덱스
    * @l = 엘리먼트
    */
    valueContentEl = document.querySelectorAll('.sc_value .content_item');
    let i = 0;
    valueContentEl.forEach(l => {
        const tl4 = gsap.timeline({scrollTrigger: {
            trigger: l,
            start: "0% 70%",
            end: "130% 70%",
            scrub: 1,
        }});
        if(i === 4){                       //마지막 엘리먼트는 opacity:1 유지
            tl4.to(l, {opacity:1},"-=0.2")
        }else{
            tl4.to(l, {opacity:1},"-=0.2")
            .to(l, {duration:0.2, opacity:0.15})
        }
        i++;
    });
    // $('.sc_value .content_item').each(function(i,l){
    //     const tl4 = gsap.timeline({scrollTrigger: {
    //         trigger: l,
    //         start: "0% 70%",
    //         end: "130% 80%",
    //         scrub: 1,
    //         markers: true
    //     }});
    //     tl4.to(l, {opacity: 1},"-=0.2")
    //        .to(l, {duration: 0.2, opacity: 0.15})
    // });


    //audio group_xray 스티키
    const xrayScrollAni = gsap.timeline({scrollTrigger: {
        defaults:{
            ease:'none'
        },
        trigger: ".group_xray",
        start: "0% top",
        end: "100% 150%",
        scrub: true,
    }});
    gsap.set('.group_xray .desc01,.group_xray .desc02,.group_xray .desc03',{y:150, opacity:0})
    xrayScrollAni
    .addLabel('a')
    .to(".group_xray .desc01",{y:-50, opacity:1},'a')
    .to(".group_xray .desc01", {y:-200,opacity:0},'a+1')
    .to(".group_xray .desc02",{y:-50, opacity:1},'a+1.5')
    .to(".group_xray .desc02", {y:-200, opacity:0},'a+2')
    .to(".group_xray .lockup_left img", {duration:2,scale:0.9},'a')
    .to(".group_xray .lockup_left img", {opacity:0},'a+2')
    .addLabel('b')
    .to(".group_xray .lockup_right img", {opacity:1, scale:0.95},'b')
    .to(".group_xray .lockup_right img", {scale:0.86},'b+0.6')
    .to(".group_xray .lockup_right img", {opacity:0},'b+0.6')
    .to(".group_xray .desc03",{y:-50, opacity:1},'b')
    .to(".group_xray .desc03", {y:-200,opacity:0},'b+0.6')
    .addLabel('c')
    .to(".group_xray .glitter_area img", {opacity:1},'c-=0.6')
    .to(".group_xray .glitter_area img", {duration:2, scale:0.78},'c')   
    .to(".group_xray .glitter_area video", {opacity:1, scale:1},'c-=0.1')
    .to(".group_xray .glitter_area .btn_control", {opacity:1},'c-=0.1');

    gsap.to(".group_xray .glitter_area", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sc_noise",
            start: "0% bottom",
            end: "13% bottom",
            scrub: 1,
        },
    });


    //noise 통풍구
    const noiseAni = gsap.timeline({scrollTrigger: {
        trigger: ".sc_noise .group_canceling",
        start:"0% center",
        end:"50% center",
        scrub: true,
    }});
    noiseAni
    .fromTo(".sc_noise .right_area img", {opacity:0.2, y:100}, {duration:1, opacity:1, y:0})
    .fromTo(".sc_noise .right_area .bar", {height:10}, {duration:1, height:350},"-=1");

    //noise 이어팁 슬라이딩
    gsap.set('.sc_noise .group_eartip .eartip_sequence',{opacity: 0, x: 30});
    const noiseslide = gsap.timeline({scrollTrigger: {
        trigger: ".sc_noise .group_eartip",
        start:"5% center",
        end:"30% center",
        scrub: 1,
    }});
    noiseslide.to('.sc_noise .group_eartip .eartip_sequence',{opacity:1, x: 0, stagger:0.1});

    //noise 스와이프 터치 닷
    const dotMove = gsap.timeline({scrollTrigger: {
        trigger: ".sc_noise .group_control",
        start:"top center",
        end:"50% center",
        toggleActions: "restart none restart none",
    }});
    dotMove
    .fromTo(".sc_noise .dot",{opacity: 0.8},{duration:1, opacity:0, top:0, ease: Power2.easeIn})
    .fromTo(".sc_noise .dot",{opacity: 0.8},{duration:1, opacity:0, top:170, delay:0.3, ease: Power2.easeIn})


    //personalize 댄서 동영상 스크롤 컨트롤
    const vid1 = document.getElementById('dancer_video');
    ScrollTrigger.create({
        trigger:".sc_personalize .group_dancer",
        start:"0% 0%",
        end:"100% 50%",
        onEnter:function(self){
            setInterval(function(){
                vid1.currentTime = self.progress.toFixed(6)*4;//toFixed:3자리수까지, *4: 4초
            }, 40);
        },
    });
    gsap.to('.sc_personalize .group_dancer .video_area',{
        scrollTrigger: {
            trigger: ".sc_case",
            start:"top 50%",
            end:"top 30%",
            scrub: 1,
        },
        opacity:0,
    });

    //personalize 댄서 동영상 텍스트 스크롤
    gsap.set('.sc_personalize .text_wrap01',{opacity:0})
    $('.sc_personalize .text_wrap01').each(function(i,l){
        const txtScroll1 = gsap.timeline({scrollTrigger: {
            trigger: l,
            start: "0% 60%",
            end: "100% 40%",
            scrub: true,
        }});
        txtScroll1
        .to(l, {y:10, opacity:1},"-=0.2")
        .to(l, {y:-100, opacity:0})
    });


    //case 동영상 스크롤 컨트롤
    const vid2 = document.getElementById('case_video');
    ScrollTrigger.create({
        trigger:".sc_case .group_case",
        start:"0% 0%",
        end:"70% 50%",
        scrub:1,
        onEnter:function(self){
            setInterval(function(){
                vid2.currentTime = self.progress.toFixed(3)*5.5;
            }, 40);
        },
    });

    //case 동영상 텍스트 스크롤
    gsap.set('.sc_case .group_case .bar',{height:0});
    gsap.set('.sc_case .side .text_wrap01,.sc_case .bottom .text_wrap01, .sc_case .closed02 .text_wrap01',{opacity:0, y:25});
    const txtScroll2 = gsap.timeline({scrollTrigger:{
        trigger:".sc_case .group_case",
        start:"25% center",
        end:"100% 110%",
        scrub: 1,
    }});
    txtScroll2
    .to('.sc_case .group_case .front .text_wrap01',{y:-20, opacity:0})
    .addLabel('d')
    .to('.sc_case .group_case .side .bar',{height:429, delay:0.6},'d')
    .to('.sc_case .group_case .side .bar',{height:0, delay:1.3},'d')
    .to('.sc_case .group_case .side .text_wrap01',{y:0, opacity:1, delay:0.6},'d')
    .to('.sc_case .group_case .side .text_wrap01',{y:-10, opacity:0, delay:1.3},'d')   
    .addLabel('e')
    .to('.sc_case .group_case .bottom .bar',{height:284, delay:-0.1},'e')
    .to('.sc_case .group_case .bottom .bar',{height:0, delay:0.5},'e')
    .to('.sc_case .group_case .bottom .text_wrap01',{y:0, opacity:1, delay:-0.1},'e')
    .to('.sc_case .group_case .bottom .text_wrap01',{y:-10, opacity:0, delay:0.7},'e')    
    .to('.sc_case .group_case .closed02 .text_wrap01',{y:0, opacity:1})


    // sc_experience 이미지, 영상 애니메이션
    gsap.set('.sc_experience .img_wrap01',{opacity:0, scale:1.1})
    gsap.set('.sc_experience video, .sc_experience .img_wrap02, .sc_experience .img_wrap, .sc_experience .text_area',{opacity:0})
    const experienceScrollAni = gsap.timeline({scrollTrigger: {
        trigger:".sc_experience .group_magical .sticky_inner",
        start: "50% center",
        end: "145% center",
        scrub: 1,
    }});
    experienceScrollAni
    .addLabel('f')
    .to(".sc_experience .img_wrap01", {opacity:1, scale:1},'f')
    .to(".sc_experience video, .sc_experience .img_wrap02", {opacity:1},'f+0.5')
    .to('.sc_experience .lockup_top .text_area', {duration:1.5, opacity:1, y:-50},'f+0.5')
    .addLabel('g')
    .to('.sc_experience .lockup_top .text_area', {opacity:0, y:-100},'g+1.5')
    .to('.sc_experience .img_wrap', {duration:0.2, opacity:1},'g+2')
    .to('.sc_experience .lockup_bottom .text_area', {duration:2, opacity:1, y:-50},'g+2')


    //동영상 재생 버튼 
    $('.btn_control').click(function(){
        if($(this).hasClass('on')){
            $(this).parents('.video_frame').find('video').get(0).play();
            $(this).attr('aria-label','정지').removeClass('on')
        }else{
            $(this).parents('.video_frame').find('video').get(0).pause();
            $(this).attr('aria-label','재생').addClass('on')
        }
    });
    
});

    

