
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cuentas = () => {
  const { name } = useParams(); // Obtener el ID del banco desde la URL
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
        },
      };

      try {

        // Obtener las cuentas asociadas (simula la lógica aquí)
        const accountsResponse = await fetch(
          `https://sandbox.belvo.com/api/accounts/?institution=${name}`,
          options
        );
        const accountsData = await accountsResponse.json();
        setAccounts(accountsData.results || []);
      } catch (err) {
        setError("Error al cargar los detalles del banco");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, [name]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cuentas asociadas</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <strong>Cuenta:</strong> {account.name} <br />
            <strong>Saldo:</strong> {account.balance.current}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuentas;