import React from "react";
import { Link } from "react-router";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main className="splash">
        <section className="splash-main-promo-component">
          <div>
            <h1>Investing for everyone!</h1>
            <p>
              CapApp gives you the advantage by making investing simple and
              effective.
            </p>
            <Link className="signup-button" to="/signup">
              Sign Up
            </Link>
          </div>
          <img src={window.laptop}></img>
        </section>
        <section className="splash-secondary-promo-component">
          <h1>Retire safely </h1>
          <p>
            Aliquam mauris tellus, luctus sed nisi et, tempus molestie eros.
            Mauris in lacus sed diam blandit pulvinar sit amet vitae libero. Sed
            tempus dolor non viverra hendrerit.
          </p>
          <Link to="commissions-disclosure">Commissions Disclosure</Link>
        </section>
        <section className="splash-fractional-shares-component">
          <div>
            <h1>Fractional Shares</h1>
            <h2>Invest with as little as $1</h2>
            <div className="three-col">
              <div>
                <h3>Invest any amount</h3>
                <p>
                  Choose how much you want to invest, and lorem ipsum dolar sit
                  amet.
                </p>
              </div>
              <div>
                <h3>Build a balanced portfiolio</h3>
                <p>Vestibulum ac enim eu turpis euismod mattis et n</p>
              </div>
              <div>
                <h3>Trade in Real Time</h3>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Proin dapibus dignissim nibh,
                  ac aliquam dui.
                </p>
              </div>
            </div>
            {/* form to enter email to signup for newletter */}
            <form>
              <input type="text" placeholder="name@email.com" />
              <button type="submit">Get Early Access</button>
            </form>
            <Link to="fractional-shares-disclosure">
              Fractional Shares Disclosure
            </Link>
          </div>
          <img src={window.stockOne} />
        </section>
        <section className="splash-features-component">
          <ul>
            <li>^</li>
            <li>Learn</li>
            <li>Manage</li>
            <li>Customize</li>
            <li>v</li>
          </ul>
          <img src={window.cellPhone} />
          <div>
            <h1>This is a header for the selected thing on the left.</h1>
            <p>This is stuff about the selected thing on the left.</p>
          </div>
        </section>
        <section className="splash-products-component">
          <div>
            <h1>Our Products</h1>
            <div className="image">
              <img src={window.television} />
            </div>
            <ul className="splash-products-list">
              <li>Stocks & Funds</li>
              <li>Options</li>
              <li>Gold</li>
              <li>Cash Management</li>
              <li>Crypto</li>
            </ul>
            <div className="splash-products-selected-information">
              <h2>This is a headline for the selected product category.</h2>
              <p>This is information about the selected product category.</p>
              <Link to="">Learn More</Link>
              <div className="double-col">
                <Link to="">Product Disclosures</Link>
                <p>Info about who this product is offered through.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="splash-footer-component">
          <div className="four-col">
            <ul>
              <li>
                <Link>Stocks & Funds</Link>
              </li>
              <li>
                <Link>Options</Link>
              </li>
              <li>
                <Link>Gold</Link>
              </li>
              <li>
                <Link>Cash Management</Link>
              </li>
              <li>
                <Link>Crypto</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link>Learn</Link>
              </li>
              <li>
                <Link>Support</Link>
              </li>
              <li>
                <Link>Snacks</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Careers</Link>
              </li>
              <li>
                <Link>Company News</Link>
              </li>
              <li className="footer-social-media">
                <Link>Linkedin</Link>
                <Link>Facebook</Link>
                <Link>Insta</Link>
                <Link>Twitter</Link>
              </li>
            </ul>
            <div className="capapp-bits">
              <h1>CapApp BITS</h1>
              <p>This 5-minute newsletter will change your game.</p>
              <form>
                <input type="text" placeholder="name@email.com" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <ul className="footer-legal-list">
            <li>
              <Link to="">
                Check the background of this company using FINRA Broker Check
              </Link>
            </li>
            <li>
              <Link to="">CapApp Terms & Conditions</Link>
            </li>
            <li>
              <Link to="">Disclosure Library</Link>
            </li>
            <li>
              <Link to="">Privacy</Link>
            </li>
          </ul>
          <ul>
            <li>Language Dropdown:</li>
          </ul>
          <div className="footer-corporate-disclosure">
            <p>(c) 2020 CAP APP. All rights not reserved.</p>
            <p>
              {" "}
              Vestibulum ac enim eu turpis euismod mattis et non nunc. Maecenas
              porta ante vitae lectus egestas malesuada. Nulla quis enim et est
              auctor eleifend.{" "}
            </p>
            <p>
              {" "}
              Mauris in lacus sed diam blandit pulvinar sit amet vitae libero.
              Sed tempus dolor non viverra hendrerit.{" "}
            </p>
            <p>
              {" "}
              Donec porttitor feugiat mollis. Curabitur lacinia ex vitae velit
              posuere vulputate. Cras in dignissim tortor.
            </p>
            <Link to="/disclosures">View Important Disclosures</Link>
          </div>
        </section>
      </main>
    );
  }
}
export default Index;
