

export const CastCards = ({name, img, rol}) => {

    return (
        <div className="flex gap-[10px] min-w-[200px] items-center" >
            <img className="w-[50px] h-[50px] rounded-full object-cover" src={`https://${img}`} alt="Profile Image" />
            <div className="text-xs">
                <p><strong> { name } </strong></p>
                <p className="text-semiWhite">{rol}</p>
            </div>
        </div>
    )

}