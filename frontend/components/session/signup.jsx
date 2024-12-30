import React from "react";
import { Link } from "react-router";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    // username here instead of email since it's the name of the col in db
    // email will be used otherwise in this page
    this.state = {
      username: "",
      password: "",
      fname: "",
      lname: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // clear errors if there are any and the user changes routes
  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleEmpty() {
    const $sessionForm = $(".session-form");
    const $emptyInputs = $('input[value=""]');
    // add onchange handler to inputs to remove empty class when user types
    $emptyInputs.change((e) => e.currentTarget.classList.remove("empty"));
    // add empty to all empty inputs
    $sessionForm.find($emptyInputs).addClass("empty");
    // cursor into first empty text input
    $sessionForm.find($emptyInputs).first().focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    if ($('input[value=""]')) this.handleEmpty();
    this.props.submit(this.state);
  }

  render() {
    let errors;

    if (this.props.errors && this.props.errors[0].length > 0) {
      errors = this.props.errors.map((error, i) => <li key={i}>{error}</li>);
    }
    return (
      <div className="signup-container">
        <div className="signup-form">
          <section className="demo-user">
            <button onClick={this.props.demoUser}>
              Click Here To Demo<i className="fas fa-comment-dollar"></i>
            </button>
          </section>
          <form className="session-form" onSubmit={this.handleSubmit}>
            <img className="signup-logo" src={window.logo} />
            <h1>Get Into The Game</h1>
            <h2>CapApp lets you easily invest for your future.</h2>
            <div className="double-column">
              <input
                id="fname"
                placeholder="First name"
                className="form-user-names"
                onChange={this.handleInput("fname")}
                type="text"
                value={this.state.fname}
              />
              <input
                id="lname"
                placeholder="Last name"
                className="form-user-names"
                onChange={this.handleInput("lname")}
                type="text"
                value={this.state.lname}
              />
            </div>
            <div className="rows">
              <div className="input-block">
                <input
                  placeholder="Email"
                  id="email"
                  onChange={this.handleInput("username")}
                  type="email"
                  value={this.state.username}
                />
                <div className="session-error-box signup">
                  <div className="arrow-up-outer"></div>
                  <div className="arrow-up-inner"></div>
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>Please fill out this field.</span>
                </div>
              </div>
              <input
                placeholder="Password (min. 6 characters)"
                id="password"
                onChange={this.handleInput("password")}
                type="password"
                value={this.state.password}
              />
            </div>
            <div className="double-column continue">
              <section>
                <button type="submit">Continue</button>
              </section>
              <section>
                <p>
                  Already started?
                  <Link to="/login" className="forgot">
                    {" "}
                    Login to complete your application.
                  </Link>
                </p>
              </section>
            </div>
            <ul className="signup-invalid-credentials">{errors}</ul>
          </form>
          <div className="disclosure">
            <p>
              Nulla vulputate, neque non scelerisque blandit, leo erat tincidunt
              massa, at volutpat ligula libero eget neque. Duis aliquet aliquam
              elit, at venenatis ligula. Suspendisse potenti. Nullam malesuada
              sagittis turpis eget aliquam. Pellentesque metus lacus, egestas
              sit amet blandit sed, laoreet in lacus. Suspendisse potenti.
            </p>

            <p>
              Sed mattis eleifend libero ac iaculis. Sed non mi fringilla,
              aliquet lorem non, condimentum neque. Etiam id urna nec ipsum
              finibus tempor. Donec venenatis tincidunt sem, sed facilisis nisi
              maximus id. Mauris eget pulvinar erat. Pellentesque vitae lorem
              vitae magna aliquam viverra.{" "}
            </p>

            <p>
              Donec dictum eros a lacus rhoncus pulvinar. Aliquam erat volutpat.
              Morbi iaculis ex luctus massa euismod placer{" "}
            </p>
          </div>
        </div>
        <div className="signup-aside">
          <main>
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>
              Vivamus tristique aliquam risus convallis malesuada. Aenean
              fermentum interdum nulla, sit amet lacinia est placerat sit amet.
            </p>
            <h3>Maecenas sem lectus</h3>
            <p>
              Pellentesque elit nunc, viverra sed metus sed, viverra commodo
              justo <a href="http://www.sipc.org">www.sipc.org</a>.
            </p>
            <h3>Praesent pharetra leo et tortor blandit viverra</h3>
            <p>
              Praesent maximus quam a sem malesuada, et ullamcorper purus
              porttitor.{" "}
            </p>
          </main>
          <div className="disclosure">
            <p>
              Nulla vulputate, neque non scelerisque blandit, leo erat tincidunt
              massa, at volutpat ligula libero eget neque. Duis aliquet aliquam
              elit, at venenatis ligula. Suspendisse potenti. Nullam malesuada
              sagittis turpis eget aliquam. Pellentesque metus lacus, egestas
              sit amet blandit sed, laoreet in lacus. Suspendisse potenti.
            </p>

            <p>
              Sed mattis eleifend libero ac iaculis. Sed non mi fringilla,
              aliquet lorem non, condimentum neque. Etiam id urna nec ipsum
              finibus tempor. Donec venenatis tincidunt sem, sed facilisis nisi
              maximus id. Mauris eget pulvinar erat. Pellentesque vitae lorem
              vitae magna aliquam viverra.{" "}
            </p>

            <p>
              Donec dictum eros a lacus rhoncus pulvinar. Aliquam erat volutpat.
              Morbi iaculis ex luctus massa euismod placer{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
