const Header = ({title = 'Dashboard'}) => {
    return (
        <div className="fixed top-0 left-20 right-0 flex row item-center border bottom h-70 pl-2 pr-2">
            <h1 className="m-0 text size-20">{title}</h1>
        </div>
    )
}

export default Header;