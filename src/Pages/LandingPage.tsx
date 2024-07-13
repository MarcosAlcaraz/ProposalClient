import Header from '../Components/Header'
import LogInButton from '../Components/LogInButton';

function LandingPage() {
  const headerTitle = "Header title";

  return (

    <div>
      <Header headerTitle={headerTitle} />
      <LogInButton />
    </div>
  );
};

export default LandingPage;
