const ErrorMessage = ({message}) => {
    return (
        <div className="bg-red transparent w-100 mt-2 p-1 rounded text small pl-2 pr-2">
            {message}
        </div>
    )
}

export default ErrorMessage;