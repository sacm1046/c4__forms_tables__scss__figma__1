const Table = ({ headers = [], children }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        headers.length > 0 &&
                        headers.map(header => <th
                            key={header}
                            className={`table__head__${header.split(',')[0]}`}
                        >
                            {header.split(',')[0]}
                        </th>)
                    }
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

export default Table
