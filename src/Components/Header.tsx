import '../CSS/Header.css';

interface ChildProps {
  headerTitle: string;
}

function Header({ headerTitle }: ChildProps) {

  // Función para manejar el clic en los botones (puedes personalizarla)
  const handleButtonClick = (buttonName: string) => {
    // Aquí puedes agregar la lógica específica para cada botón
    console.log(`Botón "${buttonName}" fue presionado`);
  };

  return (
    <div className="app">
      <header className="header">
        {/* Botón a la izquierda */}
        <button onClick={() => handleButtonClick('Izquierdo')}>Izquierdo</button>
        {/* Título */}
        <h1>{headerTitle}</h1>
        {/* Botones a la derecha */}
        <div className="right-buttons">
          <button onClick={() => handleButtonClick('Derecho 1')}>Derecho 1</button>
          <button onClick={() => handleButtonClick('Derecho 2')}>Derecho 2</button>
        </div>
      </header>
    </div>
  );
}

export default Header;
