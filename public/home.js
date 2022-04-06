function Home() {
  // UserContext contains the user information
  return (
    <div>
      <h3>Home Component</h3>
      <p>Welcome to the site - happy to see you</p>

      {/* User Context being rendered to the home page */}
      <Card
        txtcolor="black"
        header="BadBank Landing Page"
        title="Welcome to the bank"
        text="You can use this bank"
        body={
          <img src="bank.png" className="img-fluid" alt="Responsive image" />
        }
      />
    </div>
  );
}
