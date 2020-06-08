import React from 'react'

export default ({ about }) => {
    if (!about) return null;
    return (    
        <section className="about">
            <h1>About</h1>
            <p>{about.description}</p>
            <table className="general">
                <tbody>
                    <tr>
                        <th>CEO</th>
                        <th>Employees</th>
                        <th>State</th>
                        <th>Website</th>
                    </tr>
                    <tr>
                        <td>{about.CEO}</td>
                        <td>{about.employees}</td>
                        <td>{about.state}</td>
                        <td>{about.website}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
};