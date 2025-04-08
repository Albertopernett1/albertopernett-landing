import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Inicializar EmailJS cuando el componente se monte
  useEffect(() => {
    // No es necesario inicializar en @emailjs/browser v3+
    // pero sí mantener la clave pública disponible
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      console.log("EmailJS está configurado con la clave pública:", publicKey.substring(0, 4) + '...');
    } else {
      console.error("No se encontró la clave pública de EmailJS");
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSending(true);
    
    // Prepare message based on selected language
    const message = language === "es" 
      ? "Hola, me interesaría contactarme contigo para negociar un proyecto. Por favor respóndeme este mensaje si te interesa hablar conmigo."
      : "Hi! I&apos;d like to connect with you to discuss a project. Please reply if you&apos;re interested in working together.";
    
    try {
      // Diagnóstico de error con EmailJS - Imprimir variables de entorno
      console.log("SERVICE:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log("TEMPLATE:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      console.log("KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      
      // Verificar que todas las variables están definidas
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
        throw new Error("SERVICE_ID no está definido");
      }
      if (!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        throw new Error("TEMPLATE_ID no está definido");
      }
      if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error("PUBLIC_KEY no está definido");
      }
      
      // Usar valores sin operador || para que falle explícitamente si hay un valor undefined
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
        {
          user_email: email,
          user_message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      console.log("Email enviado con éxito:", result);
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      console.error("Error detallado al enviar email:", error);
      if (error instanceof Error) {
        alert(`Error al enviar: ${error.message}. Por favor intenta nuevamente.`);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <form ref={formRef} onSubmit={handleSendMessage} className="flex flex-col gap-4">
        <div>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-md transition-colors ${
              language === "es" 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setLanguage("es")}
          >
            Español
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md transition-colors ${
              language === "en" 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>
        
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send message"}
        </button>
        
        {showSuccess && (
          <div className="mt-2 text-green-600 font-medium text-center">
            📬 Message sent! I&apos;ll get back to you within 7 hours. / ¡Responderé en máximo 7 horas!
          </div>
        )}
      </form>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-4 mt-6">
        <a 
          href="https://www.linkedin.com/in/alberto-pernett-04a547b2/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <span className="sr-only">LinkedIn</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a 
          href="https://www.instagram.com/albertopernett1?igshid=cHcwcGRrYTVqYzJ5&utm_source=qr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
        >
          <span className="sr-only">Instagram</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
