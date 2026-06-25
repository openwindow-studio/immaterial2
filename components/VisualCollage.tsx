'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn'

// Dynamically import the torus to avoid SSR issues
const LCTorus = dynamic(() => import('./LCTorus'), {
  ssr: false,
  loading: () => <div style={{width: '100%', height: '600px', background: 'transparent'}} />
})

const CollageSection = () => {
  const [scale, setScale] = useState(1)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920)
  useScrollFadeIn() // Initialize scroll animations

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const designWidth = 1920
      setScale(viewportWidth / designWidth)
      setViewportHeight(window.innerHeight)
      setWindowWidth(viewportWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Helper function to add viewport height to positions after Untitled-4.png
  const addSpacing = (topValue: number) => topValue + viewportHeight

  // Calculate responsive height - reduce on mobile
  const isMobile = windowWidth < 768
  const baseHeight = isMobile ? 10500 : 13172 // Reduced height for mobile to eliminate black space
  const calculatedHeight = baseHeight * scale + viewportHeight

  return (
    <div className="relative w-full" style={{height: `${calculatedHeight}px`, paddingTop: '0px'}}>
      <style jsx global>{`
        /* Fade-in animation for collage images */
        .fade-in-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Different blend modes need opacity transition */
        .fade-in-scroll.mix-blend {
          transform: translateY(20px);
        }

        .fade-in-scroll.visible.mix-blend {
          transform: translateY(0);
        }
      `}</style>

      {/* LCTorus positioned halfway down immaterial_2.png with highest z-index */}
      <div
        className="absolute overflow-hidden fade-in-scroll"
        data-delay="200"
        style={{
          width: `${1800 * scale}px`,
          height: `${1800 * scale}px`,
          left: `${60 * scale}px`,
          top: `${(9380 - 1144) * scale + viewportHeight}px`,
          pointerEvents: 'auto',
          zIndex: 9999
        }}
      >
        <LCTorus
          size={0.9}
          enableOrbitControls={true}
          cameraPosition={[4, -2, 10]}
          background="transparent"
        />
      </div>

      {/* Elements that appear above the collage */}
      <img
        src="/assets/immaterialsite/ribbonblack_2.png"
        alt=""
        className="absolute z-20 mix-blend-difference fade-in-scroll mix-blend"
        data-delay="0"
        style={{
          width: `${1291 * scale}px`,
          height: `${1291 * scale}px`,
          left: `${-310 * scale}px`,
          top: `${-210 * scale}px`,
          objectFit: 'cover'
        }}
      />
      <img
        src="/assets/immaterialsite/reddot.png"
        alt=""
        className="absolute z-20 mix-blend-difference fade-in-scroll mix-blend"
        data-delay="50"
        style={{
          width: `${645 * scale}px`,
          height: `${646 * scale}px`,
          left: `${1239 * scale}px`,
          top: `${(-50 + 13) * scale}px`,
          objectFit: 'cover'
        }}
      />

      <div
        className="absolute origin-top-left"
        style={{
          width: '1920px',
          height: `${13670 + viewportHeight}px`,
          transform: `scale(${scale})`,
          top: `${(-50 - 1144) * scale}px`
        }}
      >

        {/* Main white background sections */}
        <div className="absolute w-[1920px] h-[5819px] top-[1344px] bg-[#FFF4F4]" />
        <div className="absolute w-[2149px] h-[3356px] left-[-115px] bg-[#FFF4F4]" style={{top: `${addSpacing(7324)}px`}} />

        {/* Top section images with blend modes */}

        <div className="absolute w-[690px] h-[384px] left-0 top-[2055px] mix-blend-plus-darker rounded-[20px] overflow-hidden opacity-[0.5] fade-in-scroll mix-blend" data-delay="100">
          <Image src="/assets/immaterialsite/greencoco.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[807px] h-[530px] left-0 top-[1774px] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/immaterialsite/moca2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1161px] h-[760px] left-0 top-[2304px] mix-blend-difference fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/immaterialsite/mocascreen_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[818px] h-[819px] right-0 top-[2930px] mix-blend-difference fade-in-scroll mix-blend" data-delay="250">
          <Image src="/assets/immaterialsite/nts.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1808px] h-[506px] left-0 top-[2677px] mix-blend-difference fade-in-scroll mix-blend" data-delay="300">
          <Image src="/assets/immaterialsite/carminelogo_black_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1920px] h-[1085px] left-0 top-[4126px] fade-in-scroll" data-delay="100">
          <Image src="/assets/add/Frame 44.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>


        <div className="absolute w-[1291px] h-[1290px] left-0 top-[2772px] mix-blend-difference fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/immaterialsite/matrixblack_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1291px] h-[769px] left-[115px] top-[2608px] mix-blend-difference fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/immaterialsite/redd_slashlogo.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1289px] h-[653px] left-0 top-[3577px] mix-blend-difference fade-in-scroll mix-blend" data-delay="250">
          <Image src="/assets/immaterialsite/redd_white_2000.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[690px] h-[443px] left-[1249px] top-[3717px] mix-blend-difference rounded-[20px] overflow-hidden fade-in-scroll mix-blend" data-delay="300">
          <Image src="/assets/immaterialsite/yellowcoco.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1322px] h-[1322px] left-[581px] top-[1455px] mix-blend-difference opacity-[0.4] fade-in-scroll mix-blend" data-delay="100">
          <Image src="/assets/immaterialsite/Untitled-4.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* Add viewport height spacing after Untitled-4.png */}

        <div className="absolute w-[1920px] h-[1920px] left-0 mix-blend-difference fade-in-scroll mix-blend" style={{top: `${addSpacing(3700)}px`}} data-delay="150">
          <Image src="/assets/immaterialsite/Untitled-3-2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>


        <div className="absolute w-[1291px] h-[1290px] left-[-200px] top-[calc(4461px+100vh)] mix-blend-difference fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/immaterialsite/VolSmileblack_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>


        {/* Bottom section images - moved up by ~1200px */}
        <div className="absolute w-[1500px] h-[1271px] left-[-404px] top-[calc(5362px+100vh)] mix-blend-difference rounded-[20px] overflow-hidden fade-in-scroll mix-blend" data-delay="100">
          <Image src="/assets/immaterialsite/browncoco.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[2000px] h-[1143px] left-[297px] top-[calc(5413px+100vh)] mix-blend-difference fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/immaterialsite/cre_up.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* Steel overlay with soft light */}
        <div className="absolute w-[2000px] h-[1143px] left-[297px] top-[calc(5413px+100vh)] mix-blend-soft-light z-[2] fade-in-scroll mix-blend" data-delay="200">
          <Image src="/frontpage/steel.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[2000px] h-[1925px] left-[-40px] top-[calc(6514px+100vh)] fade-in-scroll" data-delay="100">
          <Image src="/assets/immaterialsite/01_TradeAdvanced.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1500px] h-[1109px] left-[420px] top-[calc(8058px+100vh)] mix-blend-difference fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/immaterialsite/bk_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1987px] h-[1118px] left-[-34px] top-[calc(9031px+100vh)] mix-blend-luminosity fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/immaterialsite/immaterial_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>


        <div className="absolute w-[1920px] h-[1080px] left-0 top-[calc(10130px+100vh)] fade-in-scroll" data-delay="100">
          <Image src="/assets/add/traysi/Screenshot-2025-06-20-at-10.12.04-PM.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>


        <div className="absolute w-[1250px] h-[795px] left-0 top-[calc(11195px+100vh)] mix-blend-hard-light fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/immaterialsite/c0c0_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1920px] h-[1080px] left-0 top-[calc(11293px+100vh)] mix-blend-difference fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/specimen.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1824px] h-[1026px] left-[48px] top-[calc(12040px+100vh)] rounded-[20px] overflow-hidden fade-in-scroll" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} data-delay="100">
          <Image src="/assets/add/lc_frontpage.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* 08 and 06 images with soft light after lc_frontpage - moved down 300px */}
        <div className="absolute w-[1600px] h-[1000px] left-[160px] top-[calc(12800px+100vh)] mix-blend-soft-light z-[3] fade-in-scroll mix-blend" data-delay="150">
          <Image src="/frontpage/08marcokane_IBM_style_super_trendy_tech_image_of_a_hand_putting_a_74421afa-9bd2-4f88-9eb9-49787a8780e2-1.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1920px] h-[900px] left-[0px] top-[calc(12900px+100vh)] mix-blend-soft-light z-[4] fade-in-scroll mix-blend" style={{transform: 'scaleX(-1)'}} data-delay="200">
          <Image src="/frontpage/06_for_esteemed_guest.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[2000px] h-[847px] left-[-592px] top-[calc(8320px+100vh)] mix-blend-difference rounded-[20px] overflow-hidden fade-in-scroll mix-blend" data-delay="250">
          <Image src="/assets/immaterialsite/cocologo_2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* Life is too short section - moved down 600px */}
        <div className="absolute w-[1920px] h-[1200px] left-0 top-[calc(13766px+100vh)] fade-in-scroll" data-delay="100">
          <Image src="/assets/add/world.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* Booklet with soft light - 1000px size */}
        <div className="absolute w-[1000px] h-[1000px] left-[460px] top-[calc(13766px+100vh)] z-[5] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="150">
          <Image src="/assets/add/layeredsection/booklet-front 2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        {/* Vector elements on top - soft light */}
        <div className="absolute w-[700px] h-[700px] left-[610px] top-[calc(13916px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="200">
          <Image src="/assets/add/layeredsection/Vector 1.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[750px] h-[750px] left-[585px] top-[calc(13891px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="220">
          <Image src="/assets/add/layeredsection/Vector 2.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[680px] h-[680px] left-[620px] top-[calc(13926px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="240">
          <Image src="/assets/add/layeredsection/Vector 4.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[720px] h-[720px] left-[600px] top-[calc(13906px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="260">
          <Image src="/assets/add/layeredsection/Vector 5.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[760px] h-[760px] left-[580px] top-[calc(13886px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="280">
          <Image src="/assets/add/layeredsection/Vector 7.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[900px] h-[900px] left-[510px] top-[calc(13816px+100vh)] z-[6] mix-blend-soft-light fade-in-scroll mix-blend" data-delay="300">
          <Image src="/assets/add/layeredsection/Ellipse 10.png" fill alt="" style={{objectFit: 'cover'}} />
        </div>

        <div className="absolute w-[1600px] left-[160px] top-[calc(14107px+100vh)] z-[10] fade-in-scroll" data-delay="350">
          <p className="font-['NeueHaasGroteskDisp_W02'] text-[120px] leading-[130px] font-medium text-black text-center">
            life is too short to use <span className="font-semibold">ugly software</span>. we believe software should be <span className="font-semibold">simple, elegant</span>, and above all, <span className="font-semibold">a pleasure to use</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CollageSection