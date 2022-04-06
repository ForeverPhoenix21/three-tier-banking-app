function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    return true;
  }

  function checkPass() {
    var psw = document.getElementById("password");
    if (psw.value.length < 8) {
      setStatus("Password Must Include 8 Characters");
      setTimeout(() => setStatus(""), 5000);
      return;
    } else {
      return true;
    }
  }

  //Determine if to set the button disabled or not
  if (!name & !email & !password) {
    //Check if button should be enabled
    if (disabled) {
      console.log(disabled);
      console.log(`button disabled ${disabled}`);
    } else {
      setDisabled(true);
      console.log(`button disabled ${disabled}`);
    }
  } else {
    if (disabled) {
      setDisabled(false);
      console.log(`button disabled ${disabled}`);
    } else {
      console.log(`button disabled ${disabled}`);
    }
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "Please Enter Name")) return;
    if (!validate(email, "Please Enter Valid Email")) return;
    if (!validate(password, "Password Must Include 8 Characters")) return;
    if (!checkPass(password)) return;
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      txtcolor="dark"
      bgcolor="light"
      header="Create Account"
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
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email Address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            {disabled ? (
              <>
                <button
                  type="submit"
                  disabled="disabled"
                  className="btn btn-primary"
                  onClick={handleCreate}
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleCreate}
                >
                  Create Account
                </button>
              </>
            )}
          </>
        ) : (
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
            <h6>
              Account Created!{" "}
              <a href="#Login" class="btnDeposit">
                Please Login
              </a>{" "}
            </h6>{" "}
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={clearForm}
            >
              Add Another Account
            </button>
          </>
        )
      }
    />
  );
}
