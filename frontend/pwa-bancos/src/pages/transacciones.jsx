import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Transacciones = () => {
  const { id, link } = useParams();
  const [transacciones, setTransacciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodasLasTransacciones = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
      },
    };

    let url = `https://sandbox.belvo.com/api/transactions/?link=${link}&account=${id}`;
    let todasTransacciones = [];

    try {
      while (url) {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Error al obtener las transacciones");
        const data = await response.json();
        todasTransacciones = [...todasTransacciones, ...data.results];
        url = data.next; // Continuar con la siguiente página
      }

      // Ordenar las transacciones por fecha (descendente)
      todasTransacciones.sort((a, b) => new Date(b.value_date) - new Date(a.value_date));
      setTransacciones(todasTransacciones);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodasLasTransacciones();
  }, [id, link]);

  // Calcular ingresos y egresos
  const ingresos = transacciones.filter((t) => t.type === "INFLOW").reduce((total, t) => total + t.amount, 0).toFixed(2);

  const egresos = transacciones.filter((t) => t.type === "OUTFLOW").reduce((total, t) => total + t.amount, 0).toFixed(2);

  const kpi = (ingresos - egresos).toFixed(2);

  // Paginación local
  const transaccionesPorPagina = 10;
  const totalPaginas = Math.ceil(transacciones.length / transaccionesPorPagina);

  const transaccionesActuales = transacciones.slice(
    (paginaActual - 1) * transaccionesPorPagina,
    paginaActual * transaccionesPorPagina
  );

  const cambiarPagina = (pagina) => {
    if (pagina > 0 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <a href="/">Bancos</a>
      <div >
        <h3>KPI: ${kpi} </h3>
        <p><strong>Ingresos:</strong> {ingresos.toLocaleString()} </p>
        <p><strong>Egresos:</strong> {egresos.toLocaleString()} </p>
      </div>

      {/* Transacciones */}
      <h2>Transacciones</h2>
      <ul className="flex flex-col gap-2">
        {transaccionesActuales.map((t) => (
          <li key={t.id} className="rounded border-2 border-black">
            <strong>Descripción:</strong> {t.description} <br />
            <strong>Monto:</strong> {t.amount} {t.currency} <br />
            <strong>Tipo:</strong> {t.type} <br />
            <strong>Estado:</strong> {t.status} <br />
            {t.merchant && (
              <>
                <strong>Comercio:</strong> {t.merchant.name} <br />
              </>
            )}
            <strong>Fecha de valor:</strong> {t.value_date} <br />
          </li>
        ))}
      </ul>

      {/* Navegación de paginación */}
      <div>
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Transacciones;
