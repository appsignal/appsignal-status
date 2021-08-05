const UptimeMonitor = ({ uptimeMonitor }) => {
  return <tr>
    <td className="c-table__td">
      <div className="flex">
        <h1 className="font-bold">{uptimeMonitor.title}</h1>
        <p className="ml-auto truncate text-gray-700">{uptimeMonitor.url}</p>
      </div>
    </td>
  </tr>
}

export default UptimeMonitor
