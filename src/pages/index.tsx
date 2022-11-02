import UserProvider from "@contexts/UserContext";
import Header from "@components/Header";
import JobsContainer from "@components/JobsContainer";

const Home = () => {
  return (
    <main className="dark">
      {/* Header  */}
      <UserProvider>
        <Header />
      </UserProvider>

      {/* JobsContainer */}
      <JobsContainer /> 
    </main>
  );
};

export default Home;
