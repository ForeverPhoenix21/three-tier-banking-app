function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [currentuser, setCurrentuser] = React.useState("");
  const [emailinput, setEmailinput] = React.useState("");
  const [passwordinput, setPasswordinput] = React.useState("");
  const ctx = React.useContext(UserContext);

  //Check if any user is currently logged in
  if (show) {
    for (const { name, email, loggedin } of ctx.users) {
      console.log(`Current User: ${name}, Logged in: ${loggedin}`);
      if (loggedin) {
        setShow(false);
        setEmail(email);
        setName(name);
        console.log(`${name} is logged in`);
        return;
      }
    }
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: Missing " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  //Login Fuction
  function attemptLogin() {
    console.log(email, password);

    //Check if the fields are empty
    if (!validate(emailinput, "email")) return;
    if (!validate(passwordinput, "password")) return;
    let tracker = false;

    //Check if the username or passwords match anyone is the database
    for (const { email, password, loggedin } of ctx.users) {
      console.log(
        `Checking ${emailinput} ${passwordinput} against ${email} ${password}`
      );
      if (emailinput == email && passwordinput == password) {
        console.log(`${emailinput} ${passwordinput} is correct`);
        for (var i = 0, length = ctx.users.length; i < length; i++) {
          if (ctx.users[i].email == email) {
            console.log(`Checking ${email}`);
            ctx.users[i].loggedin = true;
            tracker = true;
          }
        }
      }
    }

    if (tracker) {
      setShow(false);
      setCurrentuser(emailinput);
    } else {
      setStatus("Error: Email or Password incorrect");
      setTimeout(() => setStatus(""), 8000);
    }
  }

  // Logout of all accounts
  function logout() {
    for (var i = 0, length = ctx.users.length; i < length; i++) {
      ctx.users[i].loggedin = false;
    }
    setShow(true);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            <div className="text-left">
              <img
                src="bank.png"
                className="img-fluid left"
                alt="Responsive image"
                width="22%"
              />
              <br />
              <br />
            </div>
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={emailinput}
              onChange={(e) => setEmailinput(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={passwordinput}
              onChange={(e) => setPasswordinput(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={attemptLogin}
            >
              Login
            </button>
            <br />
            <br />
            Forgot your email or password?{" "}
            <a
              href="#/alldata/"
              data-toggle="tooltip"
              title="Check all your data"
            >
              Click Here!
            </a>
            <br />
            <br />
            Don't have an account?
            <br />{" "}
            <a
              href="#/createaccount/"
              className="btnDeposit"
              data-toggle="tooltip"
              title="Create a new account to start using this banking site"
            >
              Click here to create a new account.
            </a>
          </>
        ) : (
          <>
            <h5>
              {" "}
              {currentuser} <br />
              You are now logged in to your account!
            </h5>{" "}
            <br />
            <br />
            <h6>
              Make a{" "}
              <a href="#deposit" class="btnDeposit">
                Deposit.
              </a>
            </h6>{" "}
            <br />
            <br />
            <h6>
              Make a{" "}
              <a href="#withdraw" class="btnDeposit">
                Withdraw.
              </a>
            </h6>{" "}
            <br />
            <br />
            <h6>
              See all your{" "}
              <a href="#alldata" class="btnDeposit">
                Data.
              </a>
            </h6>{" "}
            <br />
            <br />
            <button type="submit" className="btnDeposit" onClick={logout}>
              Logout
            </button>
          </>
        )
      }
    />
  );
}
