import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Facebook, X } from 'lucide-react';

export default function Login() {
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí iría la lógica de autenticación real (validar usuario/pass con backend)
    // Por ahora, simulamos éxito y redirigimos:
    console.log("Iniciando sesión...");
    
    navigate('/dashboard'); // 4. Redirigir al Dashboard
  };

  return (

    // CAMBIO 1: min-h-screen asegura que cubra todo sin cálculos raros
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      
      {/* Botón de Escape */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-50 p-2 bg-white/50 backdrop-blur-sm hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-all"
        title="Volver al inicio"
      >
        <X className="h-6 w-6" />
      </Link>

      {/*LADO IZQUIERDO: IMAGEN ANIMADA*/}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }} // Empieza invisible y un 10% más grande
        animate={{ opacity: 1, scale: 1 }}   // Termina visible y tamaño normal
        transition={{ duration: 0.8, ease: "easeOut" }} // Duración suave de 0.8s
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop" 
          alt="Login Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-12">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }} // El texto aparece un poco después
             className="text-white max-w-md"
          >
            <h2 className="text-4xl font-bold mb-4">Bienvenido de nuevo.</h2>
            <p className="text-lg text-gray-200">Continúa diseñando tu estilo único.</p>
          </motion.div>
        </div>
      </motion.div>
      {/*FIN DEL LADO IZQUIERDO ANIMADO*/}

      {/* LADO DERECHO: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Iniciar Sesión</h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-indigo-500 transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" placeholder="tu@email.com" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white" />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" placeholder="Contraseña" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors bg-gray-50 focus:bg-white" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recordarme</label>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-indigo-500/30">
              Ingresar
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">O continúa con</span></div>
            </div>

            {/* BOTONES SOCIALES MEJORADOS */}
            <div className="grid grid-cols-2 gap-3">
              {/* Botón Google con Logo SVG Original */}
              <button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-medium text-gray-700">Google</span>
              </button>

              {/* Botón Facebook con color en Hover */}
              <button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all gap-2 group">
                <Facebook className="h-5 w-5 text-gray-700 group-hover:text-[#1877F2] transition-colors" />
                <span className="font-medium text-gray-700 group-hover:text-[#1877F2] transition-colors">Facebook</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}