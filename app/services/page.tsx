'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Services() {
  return (
    <div className="relative w-full min-h-screen bg-white">

      {/* Background SVG */}
      <div
        className="absolute inset-0 z-0 opacity-[0.26]"
        style={{
          backgroundImage: 'url("/untitled folder/work_bg.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'top left'
        }}
      />
      {/* Elements overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage: 'url("/untitled folder/work_bg_elements.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'top left'
        }}
      />

      <Navigation />

      {/* IMMATERIAL Logo - Positioned like frontpage */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2" style={{zIndex: 9999}}>
        <Link href="/">
          <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-transparent transition-opacity hover:opacity-80"
              style={{
                WebkitTextStroke: '1px black',
                textStroke: '1px black',
                fontKerning: 'normal',
                fontFeatureSettings: '"kern" 1'
              } as any}>
            IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
          </h1>
        </Link>
      </div>

      {/* Page Container - optimized for 1920px viewport */}
      <div className="relative w-full pt-[15%] pb-[10%]" style={{maxWidth: '1920px', margin: '0 auto'}}>

        {/* SERVICES Header */}
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-full px-4" style={{zIndex: 999}}>
          <h2
            className="text-center whitespace-nowrap"
            style={{
              fontFamily: 'NeueHaasGroteskMedium, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              lineHeight: '1.1',
              color: '#0D1EFF',
            }}>
            SERVICES
          </h2>
        </div>

        {/* Content Grid - More margin for mobile, less for desktop */}
        <div className="relative" style={{marginTop: 'clamp(15rem, 17vw, 17rem)'}}>

          {/* Row 1: STUDIO / PROFILE - Responsive grid */}
          <div className="px-4 sm:px-8 lg:px-[12.5%] grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20 mb-20">
            {/* STUDIO Section */}
            <div>
              <div className="border-t-[6px] border-black mb-6"></div>
              <h2 className="mb-8 text-black"
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.05em',
                    transform: 'scaleY(-1)',
                    display: 'inline-block'
                  }}>
                STUDIO
              </h2>
              <p className="text-black" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '22px',
                textIndent: '2em'
              }}>
                Immaterial is the design studio of Marco Braunschweiler. I create brand systems, interfaces, increasingly more, products. <a href="mailto:marcobraunschweiler@gmail.com" className="underline hover:opacity-70 transition-opacity" style={{color: '#0D1EFF'}}>Contact me</a>.
              </p>
            </div>

            {/* PROFILE Section */}
            <div>
              <div className="border-t-[6px] border-black mb-6"></div>
              <h2 className="mb-8 text-black"
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.05em',
                    transform: 'scaleY(-1)',
                    display: 'inline-block'
                  }}>
                PROFILE
              </h2>
              <p className="text-black" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '22px',
                textIndent: '2em'
              }}>
                People come here when they have a problem that they cannot solve. This could be some issue with visibility, or they're not happy with how they're being perceived, or they don't even know what they want, and we are there to figure that out together.
              </p>
            </div>
          </div>

          {/* Row 2: CLIENTS (full width) */}
          <div className="px-4 sm:px-8 lg:px-[12.5%] mb-20">
            <div className="border-t-[6px] border-black mb-6"></div>
            <h2 className="mb-8 text-black"
                style={{
                  fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  letterSpacing: '0.05em',
                  transform: 'scaleY(-1)',
                  display: 'inline-block'
                }}>
              CLIENTS
            </h2>
            <p className="text-black" style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '22px',
              textIndent: '2em',
              maxWidth: '1341px'
            }}>
              Clients that I've worked with include Tribute Labs, Carmine Finance, Redd Accounting, The Los Angeles Times, The New York Times, The Museum of Contemporary Art Los Angeles, Acura, Sonos, and others.
            </p>
          </div>

          {/* Row 3: WHO DO WE WORK WITH (full width) */}
          <div className="px-4 sm:px-8 lg:px-[12.5%] mb-20">
            <div className="border-t-[6px] border-black mb-6"></div>
            <h2 className="mb-8 text-black"
                style={{
                  fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  letterSpacing: '0.05em',
                  transform: 'scaleY(-1)',
                  display: 'inline-block'
                }}>
              WHO DO WE WORK WITH
            </h2>
            <p className="text-black" style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '22px',
              textIndent: '2em',
              maxWidth: '1341px'
            }}>
              For companies I work with, I have had the most success by creating with smart, driven people from a set of needs that are personal, values-based, and often market-driven.
            </p>
            <br />
            <p className="text-black" style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '22px',
              textIndent: '2em',
              maxWidth: '1341px'
            }}>
              Having a background in art has given me an aesthetic approach—specifically from the transliterated Latin <i>aestheticus</i>—meaning the study of sensory experience. It's all ultimately about the feeling. While research and positioning are a solid backbone for understanding a project, I prioritize intuition and feeling — nobody has ever listened to a good song and said, 'I wonder what the research was like for this.'
            </p>
          </div>

          {/* Row 4: TECHNICAL DETAILS (full width) */}
          <div className="px-4 sm:px-8 lg:px-[12.5%] mb-20">
            <div className="border-t-[6px] border-black mb-6"></div>
            <h2 className="mb-8 text-black"
                style={{
                  fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  lineHeight: '22px',
                  letterSpacing: '0.05em',
                  transform: 'scaleY(-1)',
                  display: 'inline-block'
                }}>
              TECHNICAL DETAILS
            </h2>
            <p className="text-black" style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '22px',
              textIndent: '2em',
              maxWidth: '1341px'
            }}>
              I mostly work by myself and with trusted colleagues. From 2020 to 2024, I focused on finding a rock-solid process to build brand systems and have extended that approach to experiences, both interface and full end-to-end apps like Liquid Calling. I start with a concept, find the edges of the constraints, build an accordant design system, select a technical implementation, and iterate from there.
            </p>
            <br />
            <p className="text-black" style={{
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '22px',
              textIndent: '2em',
              maxWidth: '1341px'
            }}>
              I work primarily with modern JavaScript frameworks—React and Next.js for the frontend, paired with TypeScript. For content and data-driven projects, I use Python for scripting and analysis. When working with legacy systems or specific client needs, I tend toward PHP and WordPress environments.
            </p>
          </div>

          {/* Row 5: BACKGROUND (2 columns) */}
          <div className="px-4 sm:px-8 lg:px-[12.5%] grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20 mb-20">
            <div>
              <div className="border-t-[6px] border-black mb-6"></div>
              <h2 className="mb-8 text-black"
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    letterSpacing: '0.05em',
                    transform: 'scaleY(-1)',
                    display: 'inline-block'
                  }}>
                BACKGROUND
              </h2>
              <div className="text-black" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '22px',
                textIndent: '2em'
              }}>
                My interest in design started with skateboarding as both an expressive form and a relational tool to read a design environment critically, and these two poles typify my approach.<sup style={{fontSize: '0.75em'}}>1</sup> My background is in art, specifically in conceptually focused practices that manifest into worlds which either show or actively alter societal structures like Michael Asher.<sup style={{fontSize: '0.75em'}}>2</sup> The way I build, design, and code pulls from Christopher Alexander's The Timeless Way of Building; he indicates that a well-designed space, like a garden, is organic, can grow, and seems to exist naturally, without feeling designed, though this is actually the result of meticulous planning and research over time, whatever the modality is.<sup style={{fontSize: '0.75em'}}>3</sup>
              </div>
              <p className="text-black mt-6" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '22px',
                textIndent: '2em'
              }}>
                I am American and Swiss, originally from California, though I grew up in the Midwest and was shaped by that hard-working Protestant culture. I currently live in a small town at the crest of a mountain in central Italy, where I enjoy smoking choice tobacco and staying up really, really late.
              </p>
            </div>

            <div>
              <div className="border-t-[6px] border-black mb-6"></div>
              <div className="mb-8" style={{height: '20px'}}></div>
              <div className="text-black" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '22px'
              }}>
                <div style={{marginBottom: '1em'}}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.{' '}
                  <a
                    href="https://urbanpolicy.net/wp-content/uploads/2013/02/Howell_2001_Poetics-of-Security_NoPix.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors underline"
                  >
                    Howell, Ocean. "The Poetics of Security: Skateboarding, Urban Design, and the New Public Space." <i>Urban Policy</i>, 2001.
                  </a>
                </div>
                <div style={{marginBottom: '1em'}}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.{' '}
                  <a
                    href="https://www.topiel.info/files/asher.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors underline"
                  >
                    Asher, Michael. <i>Writings 1973–1983 on Works 1969–1979</i>. Edited by Benjamin H.D. Buchloh. Halifax: Press of the Nova Scotia College of Art and Design, 1983.
                  </a>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.{' '}
                  <a
                    href="https://library.uniteddiversity.coop/Ecological_Building/The_Timeless_Way_of_Building_Complete.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-600 transition-colors underline"
                  >
                    Alexander, Christopher. <i>The Timeless Way of Building</i>. New York: Oxford University Press, 1979.
                  </a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}