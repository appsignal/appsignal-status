import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faExclamation, faInfo } from "@fortawesome/free-solid-svg-icons"

const iconMapping = {
  "success": {
    icon: faCheck,
    style: "bg-green-500 text-white"
  },
  "warning": {
    icon: faExclamation,
    style: "bg-orange-500 text-white"
  },
  "error": {
    icon: faExclamation,
    style: "bg-red-500 text-white"
  },
  "default": {
    icon: faInfo,
    style: "bg-gray-200 text-gray-700"
  }
}

const StatusUpdate = ({ type, title, description, time }) => {
  const renderIcon = () => {
    const style = iconMapping[type].style
    const icon = iconMapping[type].icon

    return (
      <span className={`flex items-center justify-center h-4 w-4 rounded-full ${style}`}>
        <FontAwesomeIcon icon={icon} style={{ fontSize: "8px" }} fixedWidth />
      </span>
    )
  }

  return (
    <div className="flex bg-white shadow-sm rounded py-5 px-6">
      <div className="mr-4 my-0.5">
        { renderIcon() }
      </div>
      <div className="">
        <h3 className="c_h-heading mb-1">{title}</h3>
        { description && <p className="text-gray-700">{description}</p>}
        <p className="text-gray-600 text-ms mt-2">{time}</p>
      </div>
    </div>
  )
}

export default StatusUpdate
