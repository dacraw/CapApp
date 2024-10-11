import React from "react";

export default ({ about }) => {
  if (!about) return null;
  if (about.status === "ERROR") {
    return (
      <section className="about">
        <p>
          The 5 requests per minute limit for company information has been
          exceeded, please wait a bit before checking back.
        </p>
      </section>
    );
  }

  return (
    <section className="about">
      <h1>About</h1>
      <p>{about.results.description}</p>
      <table className="general">
        <tbody>
          <tr>
            <th>Market Cap</th>
            <th>Employees</th>
            <th>State</th>
            <th>Website</th>
          </tr>
          <tr>
            <td>{about.results.market_cap}</td>
            <td>{about.results.total_employees}</td>
            <td>{about.results.address.state}</td>
            <td>
              <a target="_blank" href={about.results.homepage_url}>
                {about.results.name}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
