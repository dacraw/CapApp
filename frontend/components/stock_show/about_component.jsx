import React from "react";

export default ({ about }) => {
  if (!about) return null;
  return (
    <section className="about">
      <h1>About</h1>
      <p>{about.description}</p>
      <table className="general">
        <tbody>
          <tr>
            <th>Market Cap</th>
            <th>Employees</th>
            <th>State</th>
            <th>Website</th>
          </tr>
          <tr>
            <td>{about.market_cap}</td>
            <td>{about.total_employees}</td>
            <td>{about.address.state}</td>
            <td>
              <a target="_blank" href={about.homepage_url}>
                {about.name}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
