import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

type ProjectCardProps = {
  title: string;
  onClick: () => void;
  status: "In Progress";
  description?: string;
  icon?: 'code' | 'lightning' | 'bot' | 'star' | 'game';
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  onClick, 
  status, 
  icon = 'code'
}) => {
  // Datos para el gráfico de ingresos con un color amarillo/dorado para Butler AI o azul para los demás
  const borderColor = title === "Butler AI" ? 'rgba(255, 196, 87, 1)' : '#6366f1';
  const backgroundColor = title === "Butler AI" ? 'rgba(255, 196, 87, 0.2)' : 'rgba(99, 102, 241, 0.1)';
  
  // Verificar si es Dengeki Showdown (sin gráfico)
  const isDengekiShowdown = title === "Dengeki Showdown";

  // Obtener la descripción correcta según el título del proyecto
  const getDescription = () => {
    switch(title) {
      case "Butler AI":
        return "Smart agents for smarter hospitality.";
      case "PitBot":
        return "AI pit crew for F1 data.";
      case "ScoutGPT":
        return "Your AI analyst for football performance.";
      case "Otakus":
        return "Rate. Debate. Rule anime.";
      case "Dengeki Showdown":
        return "Dash. Smash. Rule the skies.";
      default:
        return "Project in development";
    }
  };

  // Datos para el gráfico de ingresos
  const chartData = {
    labels: ['May', 'Jul', 'Sep', 'Nov', 'Jan', 'Mar'],
    datasets: [
      {
        data: [0, 10, 50, 30, 60, 90],
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        tension: 0.4, // Para una curva suave
        pointRadius: 0, // Sin puntos
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Opciones para ocultar completamente ejes y leyenda
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  // Seleccionar el ícono correcto
  const getIcon = () => {
    switch(icon) {
      case 'code':
        return (
          <div className="bg-gray-900 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'lightning':
        return (
          <div className="bg-yellow-500 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'bot':
        return (
          <div className="bg-blue-500 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'star':
        return (
          <div className="bg-purple-500 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'game':
        return (
          <div className="bg-red-500 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="6" width="20" height="12" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-900 p-1.5 rounded">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div 
      className="relative bg-white rounded-lg shadow p-5 cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      {/* Badge - solo para proyectos que no son Dengeki Showdown */}
      {!isDengekiShowdown && (
        <div className="absolute top-3 right-3 inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-[#eef0fc]">
          {/* Símbolo de Stripe (S en círculo azul) */}
          <div className="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
            S
          </div>
          <span className="text-sm font-semibold text-[#4b4fef]">loading... $</span>
        </div>
      )}

      {/* Header con ícono y título */}
      <div className="flex items-center gap-3 mb-2">
        {getIcon()}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      
      {/* Badge "Starting next month" debajo del título - solo para Dengeki Showdown */}
      {isDengekiShowdown && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Starting next month
          </span>
        </div>
      )}
      
      {/* Descripción (slogan) */}
      <p className="text-gray-600 mb-4">{getDescription()}</p>
      
      {/* Gráfico de ingresos simplificado - solo para proyectos que no son Dengeki Showdown */}
      {!isDengekiShowdown && (
        <div className="h-28 w-full mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
