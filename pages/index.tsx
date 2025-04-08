import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Modal from '@/components/Modal'
import Services from '@/components/Services'
import ContactForm from '@/components/ContactForm'
import { Inter } from 'next/font/google'

// Setup Inter font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleProjectClick = () => {
    setModalMessage("Still not ready. Please... Calm down 😅");
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Alberto Pernett | Personal Website</title>
        <meta name="description" content="Alberto Pernett's personal website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`min-h-screen bg-[#eaeaea] py-10 px-4 sm:px-6 ${inter.className}`}>
        <div className="max-w-5xl mx-auto">
          {/* Profile Section - Similar to Marc Lou's design */}
          <div className="flex flex-col md:flex-row items-start mb-12">
            <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0 md:sticky md:top-10">
              <div className="mb-6 inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto md:mx-0 flex items-center justify-center">
                  <Image 
                    src="/AlbertoPernett.jpg" 
                    alt="Alberto Pernett" 
                    width={120} 
                    height={120} 
                    className="rounded-full shadow object-cover"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Alberto Pernett</h1>
              <p className="text-gray-600 mb-2">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Colombia
                </span>
              </p>
              <p className="text-blue-600 font-medium mb-4">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Freelancer
                </span>
              </p>
              <p className="text-gray-700 text-lg mb-6">
                &ldquo;I got tired of waiting for opportunities, so I built them myself. A follower of Christ.&rdquo;
              </p>
              <p className="text-gray-600 mb-6">
                Interested in working together or automating your startup with AI? Drop me a message and I&apos;ll get back to you 👇
              </p>

              {/* Contact Form */}
              <ContactForm />
            </div>

            {/* Projects Section - Using the new ProjectCard component */}
            <div className="md:w-2/3 md:pl-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 md:mt-0">Projects 🚀</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProjectCard 
                  title="Butler AI" 
                  status="In Progress" 
                  onClick={handleProjectClick}
                  icon="code"
                />
                <ProjectCard 
                  title="PitBot" 
                  status="In Progress" 
                  onClick={handleProjectClick}
                  icon="lightning"
                />
                <ProjectCard 
                  title="ScoutGPT" 
                  status="In Progress" 
                  onClick={handleProjectClick}
                  icon="bot"
                />
                <ProjectCard 
                  title="Otakus" 
                  status="In Progress" 
                  onClick={handleProjectClick}
                  icon="star"
                />
                <ProjectCard 
                  title="Dengeki Showdown" 
                  status="In Progress" 
                  onClick={handleProjectClick}
                  icon="game"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <Services />

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm mt-12">
            <p>&copy; {new Date().getFullYear()} Alberto Pernett. All rights reserved.</p>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={modalMessage}
      />
    </>
  )
}
