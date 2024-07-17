import Header from '../Components/Header'
import LogInButton from '../Components/LogInButton';
import { useAuth } from '../context/AuthContext';

function LandingPage() {
  const headerTitle = "Header title";
  const { token } = useAuth();

  return (
    <div>
      <Header headerTitle={headerTitle} />
      {token ? (
        <p>Current Token: {token}</p>
      ) : (
        <p>No Token found</p>
      )}
      <LogInButton />
    </div>
  );
};

export default LandingPage;

// NOTES

{/* <div>
      <h1>Some Component</h1>
      <p>Global String: {globalString}</p>
      <p>Global Array: {globalArray.join(', ')}</p>
      <button onClick={() => setGlobalString('new string')}>Change String</button>
      <button onClick={addItemToArray}>Add Item to Array</button>
    </div> */}
